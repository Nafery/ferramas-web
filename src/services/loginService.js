import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    return response.data; // Aquí podrías obtener el usuario o token según tu backend
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Credenciales incorrectas');
    }
    console.error('Error en loginUser:', error);
    throw new Error('Error al iniciar sesión');
  }
};
