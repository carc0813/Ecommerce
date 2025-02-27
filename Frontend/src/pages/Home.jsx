import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getproducts } from "../redux/actions";
import { Grid, Typography } from "@mui/material";
import CardProduct from "../components/Product/CardProduct"; // ✅ Importamos el nuevo componente

const Home = () => {
  const dispatch = useDispatch();

  const { products = [], loading, error } = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  const sortedProducts = [...products].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div style={{ margin: "20px", minHeight: "100vh" }}>
      <Typography variant="h3" gutterBottom>Productos</Typography>

      {loading ? (
        <Typography variant="h6">Cargando productos...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : sortedProducts.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {sortedProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product.id || index}>
              <CardProduct product={product} /> {/* ✅ Usamos el nuevo componente */}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No hay productos disponibles</Typography>
      )}
    </div>
  );
};

export default Home;