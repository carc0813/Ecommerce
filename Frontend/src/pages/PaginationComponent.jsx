import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions";
import CardProduct from "../components/Product/CardProduct";


const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { currentPage, productsPerPage } = useSelector((state) => state.pagination);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Calcula los productos de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="product-grid">
        {currentProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


