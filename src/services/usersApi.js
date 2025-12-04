// src/services/usersApi.js
import axios from 'axios';
import { API_BASE_URL } from "./apiConfig";

const USERS_URL = `${API_BASE_URL}/api/users`;

export async function fetchUsers() {
  try {
    const response = await axios.get(USERS_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios", error);
    throw new Error("Error al obtener usuarios");
  }
}

export async function deleteUser(id) {
  try {
    await axios.delete(`${USERS_URL}/${id}`);
  } catch (error) {
    console.error("Error al eliminar usuario", error);
    throw new Error("Error al eliminar usuario");
  }
}

// Opcional: crear usuario
export async function createUser(user) {
  try {
    const response = await axios.post(USERS_URL, user, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario", error);
    throw new Error("Error al crear usuario");
  }
}

/**
 * Valida las credenciales de un usuario contra la lista de usuarios de la API.
 * **Nota de seguridad:** Este método no es seguro para producción. La validación
 * de contraseñas debe realizarse en el backend.
 * @param {string} email - El email del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<object|undefined>} El usuario si se encuentra, o undefined.
 */
export async function loginUser(email, password) {
  const users = await fetchUsers();
  return users.find(user => user.email === email && user.password === password);
}
