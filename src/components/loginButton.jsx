import React from 'react';
import { useNavigate } from 'react-router-dom';

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
