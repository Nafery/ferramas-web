import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../services/categoryService';

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Efecto para obtener todas las categorías al cargar la página
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      console.log("Categorías cargadas:", data);
      setCategories(data);
    };
    
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Bienvenido a FERRAMAS</h1>
      <img src="/src/assets/logo ferramas.jpg" alt="logo" style={{width: "200px", height: "100px"}}/>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Tu distribuidora de confianza en ferretería y construcción.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/categoria/${cat.id}`)}
            className="bg-blue-600 text-white py-3 px-6 rounded-md shadow hover:bg-blue-700 transition"
          >
            {cat.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
