// src/services/productsApi.js
import { API_BASE_URL } from "./apiConfig";

const PRODUCTS_URL = `${API_BASE_URL}/api/products`;

export async function fetchProducts() {
  const res = await fetch(PRODUCTS_URL);
  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${PRODUCTS_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar producto");
  }
}

// Opcional: crear producto
export async function createProduct(product) {
  const res = await fetch(PRODUCTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("Error al crear producto");
  }
  return res.json();
}
