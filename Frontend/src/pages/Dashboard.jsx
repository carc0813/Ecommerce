import { Container, Box, Typography, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, setPage, searchProducts, filterProducts, sortProducts,getCategories} from "../redux/actions";
import CardProduct from "../components/Product/CardProduct";
import Footer from "../components/Layout/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { products = [], loading, error } = useSelector((state) => state.products);
  const { currentPage, productsPerPage } = useSelector((state) => state.pagination);
  const categories = useSelector((state) => state.categories.categories);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortOption, setSortOption] = useState("price");
  const [sortDirection, setSortDirection] = useState("asc");

  const [wasAuthenticated, setWasAuthenticated] = useState(auth.isAuthenticated);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  

  useEffect(() => {
    if (wasAuthenticated && !auth.isAuthenticated) {
      navigate("/login");
    }
    setWasAuthenticated(auth.isAuthenticated);
  }, [auth.isAuthenticated, navigate, wasAuthenticated]);

  // 🔎 Manejar búsqueda
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    dispatch(searchProducts(e.target.value));
  };

  // 🎯 Manejar filtrado
  const handleFilter = () => {
    dispatch(filterProducts(category, priceRange));
  };

  // 🔼🔽 Manejar ordenamiento
  const handleSort = (e) => {
    setSortOption(e.target.value);
    dispatch(sortProducts(e.target.value, sortDirection));
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    dispatch(sortProducts(sortOption, sortDirection === "asc" ? "desc" : "asc"));
  };

  // 📝 Calcular paginación
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

        {/* Barra de búsqueda y filtros */}
        <Box mt={3} display="flex" gap={2}>
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={handleSearch} />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="All">Todas</option>
  {Array.isArray(categories) && categories.length > 0 ? (
    categories.map((cat) => (
      <option key={cat.id} value={cat.name}>
        {cat.name}
      </option>
    ))
  ) : (
    <option disabled>Cargando categorías...</option>
  )}
</select>



          <button onClick={handleFilter}>Filtrar</button>

          <select value={sortOption} onChange={handleSort}>
            <option value="price">Precio</option>
            <option value="title">Nombre</option>
          </select>

          <button onClick={toggleSortDirection}>
            Orden: {sortDirection === "asc" ? "Ascendente" : "Descendente"}
          </button>
        </Box>

        {/* Sección de productos */}
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
          ) : currentProducts.length > 0 ? (
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



