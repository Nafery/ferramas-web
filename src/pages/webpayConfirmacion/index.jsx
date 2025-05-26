import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/cartContext';

const WebpayConfirmacion = () => {
  const [searchParams] = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [fecha, setFecha] = useState('');
  const [totalCompra, setTotalCompra] = useState(0);

  const { dispatch } = useCart(); // 🛒 Obtener acceso al carrito

  const amount = searchParams.get('amount');
  const orden = searchParams.get('orden');
  const status = searchParams.get('status');

  useEffect(() => {
    const data = localStorage.getItem('productos_pagados');
    if (data) {
      const productosComprados = JSON.parse(data);
      setProductos(productosComprados);

      const totalCalculado = productosComprados.reduce(
        (acc, prod) => acc + prod.precio * prod.quantity,
        0
      );
      setTotalCompra(totalCalculado);

      // 🧹 Limpiar productos del localStorage
      localStorage.removeItem('productos_pagados');
    }

    const ahora = new Date();
    setFecha(ahora.toLocaleString());

    // 🛒 Vaciar el carrito en el contexto
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  if (!amount || !orden || !status) {
    return <p>Error al confirmar el pago: parámetros incompletos.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">¡Pago exitoso!</h2>

      <div className="text-gray-800 mb-4">
        <p><strong>Estado del pago:</strong> {status}</p>
        <p><strong>Monto pagado:</strong> ${parseInt(amount).toLocaleString()} CLP</p>
        <p><strong>Número de orden:</strong> {orden}</p>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Método de pago:</strong> Webpay Plus</p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Productos comprados:</h3>
      {productos.length > 0 ? (
        <>
          <ul className="divide-y border rounded">
            {productos.map((prod, index) => (
              <li key={index} className="py-2 px-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{prod.nombre}</p>
                  <p className="text-sm text-gray-500">Cantidad: {prod.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    ${Number(prod.precio * prod.quantity).toLocaleString()} CLP
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right mt-4 text-lg font-bold text-gray-800">
            Total de la compra: ${totalCompra.toLocaleString()} CLP
          </div>
        </>
      ) : (
        <p className="text-gray-500">No se encontraron productos en la orden.</p>
      )}
    </div>
  );
};

export default WebpayConfirmacion;
