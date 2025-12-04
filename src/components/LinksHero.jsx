import { NavLink, useNavigate } from 'react-router-dom';
import styles from "../styles/Index.module.css"
import { AuthContext } from '../context/AuthContext';
import React, { useContext } from 'react';

function LinksHero() {

  const { isLoggedIn, logout } = useContext(AuthContext);  // Accedemos a isLoggedIn y logout del contexto
  const navigate = useNavigate();

  // Función que maneja el cierre de sesión
  const handleLogout = () => {
    logout();  // Llamamos a la función logout del contexto para cerrar sesión
    navigate('/login');  // Redirigimos al login después de cerrar sesión
  };


  return (
    <ul className={styles.hero_links}>
      <div className={styles.leftLinks}>
        {isLoggedIn && (
          <li>
            <NavLink to="#" onClick={handleLogout}>Cerrar sesión</NavLink> {/* Enlace para cerrar sesión */}
          </li>
        )}
      </div>
      <div className={styles.rightLinks}>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/adminUsuarios">Administrar usuarios</NavLink>
            </li>
            <li>
              <NavLink to="/adminProductos">Administrar productos</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Inicio de Sesión</NavLink>
            </li>
            <li>
              <NavLink to="/registro">Registro</NavLink>
            </li>
          </>
        )}
      </div>
    </ul>
  );
}



export default LinksHero;