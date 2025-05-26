import React from 'react';
import { createWebpayTransaction } from '../services/webpayService';

const WebpayButton = ({ amount, cart }) => {
  const handlePayment = async () => {
    try {
      // Guardar los productos del carrito en localStorage
      localStorage.setItem('productos_pagados', JSON.stringify(cart));

      // Continuar con el flujo de Webpay
      const { url, token } = await createWebpayTransaction(amount);
      window.location.href = `${url}?token_ws=${token}`;
    } catch (error) {
      alert('Hubo un error al iniciar el pago con Webpay');
      console.error(error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mt-4"
    >
      Pagar con Webpay
    </button>
  );
};

export default WebpayButton;
