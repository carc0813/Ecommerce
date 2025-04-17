import React, { useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent } from '../../redux/actions';

const PaymentForm = ({ orderId, amount, currency = "usd" }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { clientSecret, loading } = useSelector((state) => state.payment);

  useEffect(() => {
    if (orderId && amount && !clientSecret) {
      dispatch(createPaymentIntent(orderId, amount, currency));
    }
  }, [orderId, amount, clientSecret, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (!clientSecret) {
      console.error("No se recibió clientSecret aún.");
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error(result.error.message);
      alert("Pago fallido: " + result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      alert("Pago exitoso ✅");
      // Aquí puedes redirigir o actualizar el estado
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {clientSecret ? "Confirmar Pago" : "Cargando..."}
      </button>
    </form>
  );
};

export default PaymentForm;

