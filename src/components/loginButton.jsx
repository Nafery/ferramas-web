import React from 'react';
import { useNavigate } from 'react-router-dom';

// Componente de botón de inicio de sesión
const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/login')}
      className="text-blue-700 hover:text-blue-900 font-medium"
    >
      Iniciar Sesión
    </button>
  );
};

export default LoginButton;
