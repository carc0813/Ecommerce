import { Container, Box, Typography, Grid } from "@mui/material";
import React, { useEffect,useState  } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions";
import CardProduct from "../components/Product/CardProduct"; // ✅ Importamos el nuevo componente
import Footer from "../components/Layout/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { products = [], loading, error } = useSelector((state) => state.products);

  const [wasAuthenticated, setWasAuthenticated] = useState(auth.isAuthenticated);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (wasAuthenticated && !auth.isAuthenticated) {
      navigate("/login");
    }
    setWasAuthenticated(auth.isAuthenticated);
  }, [auth.isAuthenticated, navigate, wasAuthenticated]);

  return (
    <Container sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box>
        
        <Typography><h4>Bienvenido</h4></Typography>
           <Box mt={3}>
              <Typography variant="h3" gutterBottom>
              Productos
              </Typography>
          {loading ? (
            <Typography variant="h6">Cargando productos...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : products.length > 0 ? (
            <Grid container spacing={3} justifyContent="center">
              {products.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id || index}>
                  <CardProduct product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6">No hay productos disponibles</Typography>
          )}
        </Box>
      </Box>

      {/* Footer fuera del contenido */}
      <Box mt="auto">
        <Footer />
      </Box>
    </Container>
  );
};

export default Dashboard;

