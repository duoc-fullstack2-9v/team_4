// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Comprobar si existe el token de autenticación en el localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // Si el token existe, el usuario está autenticado
    }
  }, []);

  // Función para manejar el inicio de sesión
  const login = (token) => {
    localStorage.setItem('authToken', token);  // Guardamos el token en localStorage
    setIsLoggedIn(true);  // Marcamos al usuario como autenticado
  };

  // Función para manejar el cierre de sesión
  const logout = () => {
    localStorage.removeItem('authToken');  // Eliminamos el token de localStorage
    setIsLoggedIn(false);  // Marcamos al usuario como no autenticado
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
