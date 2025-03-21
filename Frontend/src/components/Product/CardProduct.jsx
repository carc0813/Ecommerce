import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
const CardProduct = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 300, height: 400, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      {/* Imagen del Producto */}
      <CardMedia
        component="img"
        height="180"
        image={product.images?.[0] || "https://via.placeholder.com/200"}
        alt={product.title}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ flexGrow: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Título */}
        <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
          {product.title || "Sin título"}
        </Typography>

        {/* Descripción con Scroll */}
        <Typography
          variant="body2"
          sx={{
            maxHeight: "60px",
            overflowY: "auto",
            textAlign: "justify",
            paddingRight: "5px",
          }}
        >
          {product.description || "Sin descripción"}
        </Typography>

        {/* Precio */}
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: "auto" }}>
          ${product.price?.toFixed(2) || "0.00"}
        </Typography>
      </CardContent>

      {/* Botón */}
      <CardActions sx={{ justifyContent: "center" }}>
        <Button size="small" color="primary" variant="contained">
          Agregar al Carrito
        </Button>
   <Button component={Link} to={`/product/${product.id}`} variant="contained">
  Ver Detalle
</Button>
      </CardActions>
    </Card>
  );
};

export default CardProduct;


