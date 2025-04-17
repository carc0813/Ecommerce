import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert,
  Paper
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { processPurchase, clearCart, createPaymentIntent } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { clientSecret } = useSelector((state) => state.payment);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderId, setOrderId] = useState(null);

  // 🔄 Crear la orden y el Payment Intent automáticamente al montar
  useEffect(() => {
    const createOrderAndPaymentIntent = async () => {
      try {
        // 1. Calcular total desde el carrito
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const amount = Math.round(total * 100); // en centavos

        // 2. Crear la orden en el backend
        const orderRes = await axios.post("http://localhost:3001/orders", {
          userId: parseInt(userId),
          cartItems,
          totalAmount: amount,
        });

        const newOrderId = orderRes.data.orderId;
        setOrderId(newOrderId);

        // 3. Crear Payment Intent
        dispatch(createPaymentIntent(newOrderId, amount, "usd"));
      } catch (error) {
        console.error("Error creando orden o payment intent:", error);
        setErrorMsg("No se pudo preparar el pago. Intenta más tarde.");
      }
    };

    if (cartItems.length > 0 && userId) {
      createOrderAndPaymentIntent();
    }
  }, [cartItems, dispatch, userId]);

  // 💳 Confirmar pago
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!stripe || !elements) return;

    if (!clientSecret) {
      setErrorMsg("No se ha generado el clientSecret aún. Por favor espera.");
      return;
    }

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setErrorMsg(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        try {
          await dispatch(
            processPurchase({
              cartItems,
              paymentMethod: "stripe",
              userId: parseInt(userId),
              orderId,
            })
          );
          dispatch(clearCart());
          navigate("/payment-success");
        } catch (err) {
          setErrorMsg("Error al procesar la compra.");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{ maxWidth: 500, margin: "auto", padding: 4, mt: 6 }}
    >
      <Typography variant="h5" gutterBottom>
        Información de Pago
      </Typography>

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            padding: 2,
            mb: 3,
          }}
        >
          <CardElement options={{ hidePostalCode: true }} />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!stripe || loading}
          fullWidth
          size="large"
        >
          {loading ? <CircularProgress size={24} /> : "Pagar"}
        </Button>
      </form>
    </Paper>
  );
};

export default CheckoutForm;
