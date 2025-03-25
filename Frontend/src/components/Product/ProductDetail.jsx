import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/actions";
import { useParams, useNavigate } from "react-router-dom"; // 🔹 Agregado useNavigate
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  Stack,
  Button,
} from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 🔹 Definir navigate
  const {
    product = {},
    loading,
    error,
  } = useSelector((state) => state.products);
  const baseUrl = "http://localhost:3001/images/";

  const imageUrl = product?.images?.[0]
    ? `${baseUrl}${product.images[0]}`
    : "https://via.placeholder.com/600";

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

 

  const handleGoBack = () => {
    navigate("/dashboard"); // 🔹 Ahora sí funciona correctamente
  };

  return (
    <Container sx={{ minHeight: "100vh", py: 5 }}>
      {/* Botones de navegación */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" color="secondary" onClick={handleGoBack}>
          Volver a la tienda
        </Button>
        {/* <Button variant="contained" color="error" onClick={handleLogout}>
          Cerrar sesión
        </Button> */}
      </Stack>
      {loading ? (
        <Typography variant="h5">Cargando...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : !product || Object.keys(product).length === 0 ? ( // 🔹 Validación
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
            {/* Imagen del producto dentro del Grid */}
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="400"
                image={imageUrl}
                alt={product?.title || "Producto sin título"}
                sx={{ borderRadius: 2, objectFit: "cover", width: "100%" }}
              />
            </Grid>

            {/* Detalles del producto */}
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {product.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {product.description}
                </Typography>

                {/* Precio */}
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "green", mt: 2 }}
                >
                  ${product.price}
                </Typography>

                {/* Stock */}
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: product.inStock > 0 ? "green" : "red" }}
                >
                  {product.inStock > 0
                    ? `Stock disponible: ${product.inStock}`
                    : "Sin stock"}
                </Typography>

                {/* Tallas disponibles */}
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  {product.sizes?.map((size) => (
                    <Chip key={size} label={size} variant="outlined" />
                  ))}
                </Stack>

                {/* Etiquetas */}
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  {product.tags?.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>

                {/* Botón de compra */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  disabled={product.inStock === 0}
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
