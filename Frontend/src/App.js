import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import ProductDetail from "./components/Product/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccess from "./components/payment/PaymentSuccess"; // 👈 Importa el componente
import { Box } from "@mui/material";

function App() {
  return (
    <Router>
      <Navbar />
      <Box sx={{ paddingTop: "64px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout/:orderId" element={<CheckoutPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} /> {/* ✅ Nueva ruta */}
        
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
