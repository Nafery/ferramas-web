import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../../services/productService';
import { useCart } from '../../context/cartContext';
import { convertirCLP } from '../../services/currencyService';

const Categoria = () => {
  const { id } = useParams(); 
  const [products, setProducts] = useState([]);
  const [conversions, setConversions] = useState({});
  const categoryName = products.length > 0 ? products[0].categoria : '';
  const { dispatch } = useCart();

  // Efecto para obtener productos por categoría
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductsByCategory(id);
      setProducts(data);

      // Convertir precio de cada producto
      const conversionPromises = data.map((product) =>
        convertirCLP(product.precio).then((res) => ({ id: product.id, ...res }))
      );

      const resolved = await Promise.all(conversionPromises);
      const conversionMap = {};
      resolved.forEach((item) => {
        conversionMap[item.id] = {
          usd: item.usd,
          eur: item.eur,
        };
      });
      setConversions(conversionMap);
    };

    fetchData();
  }, [id]);

  // Función para agregar un producto al carrito
  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    console.log("Producto agregado:", product);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">{categoryName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border rounded-lg shadow p-4 bg-white">
              <div className="w-full h-48 flex items-center justify-center bg-gray-100 mb-2 rounded">
                <img
                  src={product.imagen_url}
                  alt={product.nombre}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">{product.nombre}</h3>
              <p className="text-sm text-gray-600">{product.descripcion}</p>
              <p className="text-sm text-gray-500">Modelo: {product.modelo}</p>
              <p className="text-sm text-gray-500">Marca: {product.marca}</p>
              <p className="font-bold text-blue-600">${product.precio.toLocaleString()} CLP</p>

              {conversions[product.id] && (
                <div className="text-sm text-gray-600">
                  <p>≈ {conversions[product.id].usd.toLocaleString()} USD</p>
                  <p>≈ {conversions[product.id].eur.toLocaleString()} EUR</p>
                </div>
              )}

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
              >
                Agregar al carrito
              </button>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default Categoria;
