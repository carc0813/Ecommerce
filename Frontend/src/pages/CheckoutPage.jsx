import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/payment/CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createPaymentIntent } from "../redux/actions";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("pk_test_..."); // tu clave pública

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const clientSecret = useSelector((state) => state.payment.clientSecret);
  const location = useLocation();
  const { orderId, totalAmount } = location.state || {};

  console.log("🧾 Order ID:", orderId);
  console.log("💰 Total:", totalAmount);

  useEffect(() => {
    if (orderId && totalAmount) {
      dispatch(createPaymentIntent(orderId, totalAmount * 100, "usd"));
    }
  }, [dispatch, orderId, totalAmount]);

  useEffect(() => {
    console.log("📦 clientSecret desde Redux:", clientSecret);
  }, [clientSecret]);

  return (
    <div>
      <h2>Finalizar Compra</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;

