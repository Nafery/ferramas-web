import axios from 'axios';

const API_URL = 'http://localhost:5001/currency/convert';

export const convertirCLP = async (amount) => {
  try {
    const response = await axios.post(API_URL, { amount });
    return response.data; // { clp: ..., usd: ..., eur: ... }
  } catch (error) {
    console.error("Error al convertir moneda:", error);
    throw error;
  }
};
