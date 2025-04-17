// CartPage.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  processPurchase,
  updateCartQuantity,
  clearCart,
} from "../redux/actions";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Box,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleQuantityChange = (item, amount) => {
    const newQuantity = item.quantity + amount;
    if (newQuantity < 1) {
      toast.error("La cantidad no puede ser menor a 1");
      return;
    }
    if (newQuantity > item.inStock) {
      toast.error("No hay suficiente stock disponible");
      return;
    }
    dispatch(updateCartQuantity(item.id, newQuantity));
  };

  // Función para procesar la compra y redirigir
const handlePurchase = async () => {
  try {
    const userId = 1; // ⚠️ Aquí pon el ID del usuario logueado (puedes usar useSelector si ya lo tienes)
    
    const orderData = await dispatch(
      processPurchase({ cartItems, paymentMethod: "stripe", userId })
    ).unwrap();

    navigate(`/checkout/${orderData.id}`, {
      state: { orderId: orderData.id, totalAmount: orderData.totalAmount },
    });
    
  } catch (error) {
    console.error("Error al procesar la compra:", error);
    toast.error("Hubo un error al procesar la compra.");
  }
};


  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 3, marginTop: 5, textAlign: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          Carrito de Compras
        </Typography>
        <List>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ListItem
                key={item.id}
                divider
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={item.title}
                  secondary={`Cantidad: ${item.quantity} | Precio unitario: $${
                    item.price
                  } | Subtotal: $${(item.price * item.quantity).toFixed(2)}`}
                />

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    onClick={() => handleQuantityChange(item, -1)}
                    color="primary"
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    value={item.quantity}
                    size="small"
                    sx={{ width: 50, textAlign: "center" }}
                    inputProps={{ readOnly: true }}
                  />
                  <IconButton
                    onClick={() => handleQuantityChange(item, 1)}
                    color="primary"
                  >
                    <Add />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Eliminar
                </Button>
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              Tu carrito está vacío.
            </Typography>
          )}
        </List>
        {cartItems.length > 0 && (
          <>
            <Typography variant="h6" sx={{ marginY: 2 }}>
              Total: ${totalAmount.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePurchase}
            >
              Comprar
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={() => dispatch(clearCart())}
            >
              Vaciar Carrito
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CartPage;
