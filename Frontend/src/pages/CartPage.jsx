import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, processPurchase, updateCartQuantity, clearCart } from "../redux/actions";
import { Button, List, ListItem, ListItemText, Typography, Container, Box, Paper, IconButton, TextField } from "@mui/material";
import { toast } from "react-toastify"; 
import { Add, Remove } from "@mui/icons-material";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleQuantityChange = (item, amount) => {
    const newQuantity = item.quantity + amount;
    // Si la nueva cantidad es menor a 1, no se permite (o podrías eliminar el item)
    if (newQuantity < 1) {
      toast.error("La cantidad no puede ser menor a 1");
      return;
    }
    // Verifica que no se exceda el stock disponible
    if (newQuantity > item.inStock) {
      toast.error("No hay suficiente stock disponible");
      return;
    }
    // Si todo está en orden, actualiza la cantidad
    dispatch(updateCartQuantity(item.id, newQuantity));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Carrito de Compras
        </Typography>
        <List>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ListItem key={item.id} divider sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <ListItemText
                  primary={item.title}
                  secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => handleQuantityChange(item, -1)} color="primary">
                    <Remove />
                  </IconButton>
                  <TextField
                    value={item.quantity}
                    size="small"
                    sx={{ width: 50, textAlign: "center" }}
                    inputProps={{ readOnly: true }}
                  />
                  <IconButton onClick={() => handleQuantityChange(item, 1)} color="primary">
                    <Add />
                  </IconButton>
                </Box>
                <Button variant="contained" color="secondary" onClick={() => dispatch(removeFromCart(item.id))}>
                  Eliminar
                </Button>
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">Tu carrito está vacío.</Typography>
          )}
        </List>
        {cartItems.length > 0 && (
          <>
            <Typography variant="h6" sx={{ marginY: 2 }}>
              Total: ${totalAmount.toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary" fullWidth onClick={() => dispatch(processPurchase())}>
              Comprar
            </Button>
            <Button variant="contained" color="error" fullWidth sx={{ marginTop: 2 }} onClick={() => dispatch(clearCart())}>
              Vaciar Carrito
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CartPage;


