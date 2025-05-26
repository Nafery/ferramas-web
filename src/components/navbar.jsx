import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/authContext';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-700 text-white p-4 shadow flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        FERRAMAS
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/carrito" className="relative">
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className="text-sm hidden sm:inline">Hola, {user.nombre}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100 text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
