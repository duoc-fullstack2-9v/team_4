
import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

const PRODUCTS_URL = `${API_BASE_URL}/api/products`;

export async function fetchProducts() {
  try {
    const response = await axios.get(PRODUCTS_URL);
    return response.data; // Axios devuelve la data directamente
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw new Error("Error al obtener productos");
  }
}

export async function deleteProduct(id) {
  try {
    const response = await axios.delete(`${PRODUCTS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto", error);
    throw new Error("Error al eliminar producto");
  }
}

//crear producto
export async function createProduct(product) {
  try {
    const response = await axios.post(PRODUCTS_URL, product, {
      headers: { "Content-Type": "application/json" }, // Indicamos que el contenido es JSON
    });
    return response.data; // Axios devuelve la data del producto creado
  } catch (error) {
    console.error("Error al crear producto", error);
    throw new Error("Error al crear producto");
  }
}

