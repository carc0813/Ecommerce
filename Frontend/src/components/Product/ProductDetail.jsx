import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, addToCart } from "../../redux/actions";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Stack,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    product = {},
    loading,
    error,
  } = useSelector((state) => state.products);
  const baseUrl = "http://localhost:3001/images/";

  const imageUrl = product?.images?.[0]
    ? `${baseUrl}${product.images[0]}`
    : "https://via.placeholder.com/600";

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("Blanco");

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      image: imageUrl,
    }));
  };

  return (
    <Container sx={{ minHeight: "100vh", py: 5 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" color="secondary" onClick={handleGoBack}>
          Volver a la tienda
        </Button>
      </Stack>
      {loading ? (
        <Typography variant="h5">Cargando...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : !product || Object.keys(product).length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Producto no encontrado.
        </Typography>
      ) : (
        <Card
          sx={{
            maxWidth: 900,
            mx: "auto",
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="400"
                image={imageUrl}
                alt={product?.title || "Producto sin título"}
                sx={{ borderRadius: 2, objectFit: "cover", width: "100%" }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {product.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {product.description}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "green", mt: 2 }}
                >
                  ${product.price}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: product.inStock > 0 ? "green" : "red" }}
                >
                  {product.inStock > 0
                    ? `Stock disponible: ${product.inStock}`
                    : "Sin stock"}
                </Typography>

                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <FormLabel component="legend">Talla</FormLabel>
                  <RadioGroup
                    row
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {product.sizes?.map((size) => (
                      <FormControlLabel key={size} value={size} control={<Radio />} label={size} />
                    ))}
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <FormLabel component="legend">Color</FormLabel>
                  <RadioGroup
                    row
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    {product.colors?.map((color) => (
                      <FormControlLabel key={color} value={color} control={<Radio />} label={color} />
                    ))}
                  </RadioGroup>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  disabled={!selectedSize || !selectedColor || product.inStock === 0}
                  onClick={handleAddToCart}
                >
                  Agregar al carrito
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      )}
    </Container>
  );
};

export default ProductDetail;
