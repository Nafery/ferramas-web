import axios from 'axios';

const API_URL = 'http://localhost:5001/webpay/init';

export const createWebpayTransaction = async (amount) => {
  try {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    const session_id = user ? `usuario_${user.id}` : 'usuario_anonimo';

    const response = await axios.post(API_URL, {
      amount,
      session_id,
      return_url: 'http://localhost:5173/webpay/confirmar'
    });

    return response.data; // { url, token }
  } catch (error) {
    console.error('Error al iniciar la transacción Webpay:', error);
    throw error;
  }
};
