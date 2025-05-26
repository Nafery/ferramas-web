import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/cartContext';
import WebpayButton from '../../components/webpayButton';
import { convertirCLP } from '../../services/currencyService';

const Carrito = () => {
  const [conversion, setConversion] = useState(null);
  const { cart, dispatch } = useCart();

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId } });
  };

  // Cálculo del total con protección
  const total = cart.reduce((acc, product) => {
    if (product.precio && product.quantity) {
      return acc + product.precio * product.quantity;
    }
    return acc;
  }, 0);

  useEffect(() => {
    if (total > 0) {
      convertirCLP(total)
        .then((res) => setConversion(res))
        .catch((err) => console.error("Error al convertir moneda:", err));
    } else {
      setConversion(null);
    }
  }, [total]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Tu Carrito</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cart.map((product, index) => (
            <div key={index} className="border rounded-lg shadow p-4 bg-white">
              <div className="w-full h-32 flex items-center justify-center bg-gray-100 mb-2 rounded">
                <img
                  src={product.imagen_url}
                  alt={product.nombre}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">{product.nombre}</h3>
              <p className="text-sm text-gray-600">Cantidad: {product.quantity}</p>
              <p className="text-sm text-gray-500">Modelo: {product.modelo}</p>
              <p className="text-sm text-gray-500">Marca: {product.marca}</p>
              <p className="font-bold text-blue-600">
                ${product.precio?.toLocaleString?.() || '—'}
              </p>
              <button
                onClick={() => removeFromCart(product.id)}
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && total > 0 && (
        <div className="mt-6 text-right">
          <h3 className="text-xl font-bold text-gray-800">
            Total: ${total.toLocaleString()} CLP
          </h3>

          {conversion && (
            <div className="text-sm text-gray-600 mb-2">
              <p>≈ {conversion.usd.toLocaleString()} USD</p>
              <p>≈ {conversion.eur.toLocaleString()} EUR</p>
            </div>
          )}

          <WebpayButton amount={total} cart={cart} />
        </div>
      )}
    </div>
  );
};

export default Carrito;

