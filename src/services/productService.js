import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductsByCategory = async (categoria_id) => {
    try {
        const response = await axios.get(`${API_URL}/products/category/${categoria_id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        return [];
    }
}