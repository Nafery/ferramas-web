const API_URL = 'http://localhost:5001/categories'; 

export const getAllCategories = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener categorías');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getAllCategories:', error);
    return [];
  }
};
