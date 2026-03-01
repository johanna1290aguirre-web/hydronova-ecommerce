import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error('Error en getProducts:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en getProductById:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error en registerUser:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error en loginUser:', error);
    throw error;
  }
};
export const addToCartBackend = async (usuario_id, producto_id, cantidad) => {
  try {
    const response = await axios.post(`${API_URL}/carrito/agregar`, {
      usuario_id,
      producto_id,
      cantidad
    });
    return response.data;
  } catch (error) {
    console.error('Error en addToCartBackend:', error);
    throw error;
  }
};

export const getCartFromBackend = async (usuario_id) => {
  try {
    const response = await axios.get(`${API_URL}/carrito/usuario/${usuario_id}`);
    return response.data;
  } catch (error) {
    console.error('Error en getCartFromBackend:', error);
    throw error;
  }
};

export const removeFromCartBackend = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/carrito/eliminar/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en removeFromCartBackend:', error);
    throw error;
  }
};