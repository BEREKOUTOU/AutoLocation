import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    // Logic for handling successful payment
    navigate('/confirmation');
  };

  return (
    <div className="checkout-container">
      <h1 className="text-3xl font-bold mb-4">Checkout Page</h1>
      <p className="mb-2">Review your order and proceed to payment.</p>
      <button onClick={handlePaymentSuccess} className="bg-blue-500 text-white px-4 py-2 rounded">
        Complete Payment
      </button>
    </div>
  );
};

export default CheckoutPage;
