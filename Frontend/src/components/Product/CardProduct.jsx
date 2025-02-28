import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";

const CardProduct = ({ product }) => {
  return (
    <Card>
      {/* Muestra la imagen si existe, de lo contrario, usa una de respaldo */}
      <CardMedia
        component="img"
        height="200"
        images={product.images ? `/images/${product.images}` : "https://via.placeholder.com/200"}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h5">{product.title || "Sin título"}</Typography>
        <Typography variant="body2">{product.description || "Sin descripción"}</Typography>
        <Typography variant="h6">${product.price !== undefined ? product.price : "0.00"}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">Agregar al Carrito</Button>
      </CardActions>
    </Card>
  );
};

export default CardProduct;