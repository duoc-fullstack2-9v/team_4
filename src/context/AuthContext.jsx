
import React, { createContext, useState, useEffect } from 'react';

// 1. Crear el contexto de autenticación
export const AuthContext = createContext();

// 2. Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Añadimos estado para el usuario

  useEffect(() => {
    // Comprobar si hay un usuario guardado en localStorage al cargar la app
    const storedUser = localStorage.getItem('pms_logged_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true); // Si el token existe, el usuario está autenticado
    }
  }, []);

  // Función para manejar el inicio de sesión
  const login = (userData) => {
    localStorage.setItem('pms_logged_user', JSON.stringify(userData));  // Guardamos el usuario en localStorage
    setUser(userData); // Guardamos el usuario en el estado
    setIsLoggedIn(true);  // Marcamos al usuario como autenticado
  };

  // Función para manejar el cierre de sesión
  const logout = () => {
    localStorage.removeItem('pms_logged_user');  // Eliminamos el usuario de localStorage
    setUser(null); // Limpiamos el usuario del estado
    setIsLoggedIn(false);  // Marcamos al usuario como no autenticado
  };

  // 3. Proveer el estado y las funciones a los componentes hijos
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
