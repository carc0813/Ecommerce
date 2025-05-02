// src/components/Payment/PaymentSuccess.jsx
import { Box, Typography, Button, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { order } = location.state || {}; // Recibimos la orden pasada desde el CheckoutForm

  if (!order) {
    return (
      <Typography variant="h6" color="error" align="center">
        No se ha encontrado la orden.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "auto" }}>
        <Typography variant="h5" gutterBottom>
          ¡Compra Exitosa!
        </Typography>

        <Typography variant="h6" gutterBottom>
          Detalles de tu compra
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography>
            <strong>Producto(s):</strong>
          </Typography>
          {order.products.map((product) => (
            <Typography key={product.id}>
              {product.name} x {product.quantity} ($
              {product.price * product.quantity})
            </Typography>
          ))}
        </Box>

        <Typography variant="h6">Total: ${order.totalAmount}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          El pago fue procesado correctamente. Te hemos enviado un resumen al
          correo electrónico.
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ mt: 3 }}
        >
          Volver a la tienda
        </Button>
      </Paper>
    </Box>
  );
};

export default PaymentSuccess;
