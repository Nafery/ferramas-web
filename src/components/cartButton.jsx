import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import { ShoppingCart } from 'lucide-react';

// Componente de Botón de carrito
const CartButton = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <button
      onClick={() => navigate('/carrito')}
      className="relative flex items-center justify-center text-blue-700 hover:text-blue-900"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;
