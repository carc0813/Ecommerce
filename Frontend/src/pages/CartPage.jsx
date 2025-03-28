import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, processPurchase } from "../redux/actions";
import { Button, List, ListItem, ListItemText, Typography } from "@mui/material";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <div>
      <Typography variant="h4">Carrito de Compras</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText primary={`${item.title} x${item.quantity}`} secondary={`$${(item.price * item.quantity).toFixed(2)}`} />
            <Button variant="contained" color="secondary" onClick={() => dispatch(removeFromCart(item.id))}>
              Eliminar
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${totalAmount.toFixed(2)}</Typography>
      <Button variant="contained" color="primary" onClick={() => dispatch(processPurchase())}>
        Comprar
      </Button>
    </div>
  );
};

export default CartPage;
