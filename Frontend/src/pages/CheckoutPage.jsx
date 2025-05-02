import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/payment/CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createPaymentIntent } from "../redux/actions";
import { useLocation } from "react-router-dom";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); // 👈 Usa tu PUBLIC KEY aquí

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const clientSecret = useSelector((state) => state.payment.clientSecret);
  const location = useLocation();
  const { orderId, totalAmount } = location.state || {};

  console.log("🧾 Order ID:", orderId);
  console.log("💰 Total:", totalAmount);

  useEffect(() => {
    if (orderId && totalAmount) {
      dispatch(createPaymentIntent(orderId, totalAmount, "usd"));
    }
  }, [dispatch, orderId, totalAmount]);

  useEffect(() => {
    console.log("📦 clientSecret desde Redux:", clientSecret);
  }, [clientSecret]);

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Card sx={{ width: "100%", p: 2 }}>
          <CardContent>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              Finalizar Compra
            </Typography>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
