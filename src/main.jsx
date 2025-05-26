import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tailwind.css';
import AppRoutes from './router/routes.jsx';
import { CartProvider } from './context/cartContext';
import { AuthProvider } from './context/authContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
