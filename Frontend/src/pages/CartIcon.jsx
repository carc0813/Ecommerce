import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  );
  const navigate = useNavigate();

  return (
    <Tooltip title="Ver carrito">
      <IconButton color="inherit" onClick={() => navigate("/cart")}>
        {cartCount > 0 ? (
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        ) : (
          <ShoppingCartIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default CartIcon;



