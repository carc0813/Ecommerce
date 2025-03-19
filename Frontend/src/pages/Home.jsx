import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, setPage } from "../redux/actions";
import { Container, Grid, Typography, Box, Pagination } from "@mui/material";
import CardProduct from "../components/Product/CardProduct";
import Footer from "../components/Layout/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((state) => state.products);
  const { currentPage, productsPerPage } = useSelector((state) => state.pagination);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
      <Typography variant="h3" align="center" gutterBottom>
        Productos
      </Typography>

      <Box flexGrow={1}>
        {loading ? (
          <Typography variant="h6" align="center">
            Cargando productos...
          </Typography>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : products.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {currentProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <CardProduct product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center">
            No hay productos disponibles
          </Typography>
        )}
      </Box>

      {/* Paginación */}
      {totalPages > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
        </Box>
      )}

      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default Home;


