import { Container, Box, Typography, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, setPage } from "../redux/actions";
import CardProduct from "../components/Product/CardProduct";
import Footer from "../components/Layout/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { products = [], loading, error } = useSelector((state) => state.products);
  const { currentPage, productsPerPage } = useSelector((state) => state.pagination);

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

  // Calcular los productos de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (event, page) => {
    dispatch(setPage(page));
  };

  return (
    <Container sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Bienvenido
        </Typography>

        <Box mt={3}>
          <Typography variant="h3" gutterBottom>
            Productos
          </Typography>

          {loading ? (
            <Typography variant="h6" align="center">
              Cargando productos...
            </Typography>
          ) : error ? (
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : products.length > 0 ? (
            <>
              <Grid container spacing={3} justifyContent="center">
                {currentProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <CardProduct product={product} />
                  </Grid>
                ))}
              </Grid>

              {/* Paginación */}
              {totalPages > 1 && (
                <Box mt={4} display="flex" justifyContent="center">
                  <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
                </Box>
              )}
            </>
          ) : (
            <Typography variant="h6" align="center">
              No hay productos disponibles
            </Typography>
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


