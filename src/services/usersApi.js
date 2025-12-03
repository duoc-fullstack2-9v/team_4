// src/services/usersApi.js
import { API_BASE_URL } from "./apiConfig";

const USERS_URL = `${API_BASE_URL}/api/users`;

export async function fetchUsers() {
  const res = await fetch(USERS_URL);
  if (!res.ok) {
    throw new Error("Error al obtener usuarios");
  }
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${USERS_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar usuario");
  }
}

// Opcional: crear usuario
export async function createUser(user) {
  const res = await fetch(USERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("Error al crear usuario");
  }
  return res.json();
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
