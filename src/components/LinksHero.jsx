import { NavLink } from 'react-router-dom';
import styles from "../styles/Index.module.css"
import { AuthContext } from '../context/AuthContext';
import React, { useContext } from 'react';

function LinksHero(){

   const { isLoggedIn } = useContext(AuthContext);

    return (
    <ul className={styles.hero_links}>
      {isLoggedIn ? (
        <>
          <li>
            <NavLink to="/adminUsuarios">Administrar usuarios</NavLink>
          </li>
          <li>
            <NavLink to="/adminProductos">Administrar productos |</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Inicio de Sesion</NavLink>
          </li>
          <li>
            <NavLink to="/registro">Registro</NavLink>
          </li>
        </>
      )}
    </ul>
  );
}


export default LinksHero;