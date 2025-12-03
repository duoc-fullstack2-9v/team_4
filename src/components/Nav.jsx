import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/icono_PMS-removebg-preview.png";
import carritoImg from "../assets/Carrito-removebg-preview.png";
import styles from "../styles/Index.module.css";

function Nav() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Hook para detectar cambios de ruta

  useEffect(() => {
    // Este efecto se ejecutará cada vez que la URL cambie
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);
  }, [location]); // Se vuelve a ejecutar cuando 'location' cambia

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/login'); // Redirige a Login para una mejor experiencia
  };

  return (
    <nav className={styles.navbar}>
      <img src={logo} width="80px" alt="Logo" />
      <h2>Pasteleria Mil Sabores</h2>
      <ul className={styles.nav_links}>
        <li><NavLink to="/home">Home</NavLink> |</li>
        <li><NavLink to="/productos">Productos</NavLink> |</li>

        {/* Mostrar enlaces de administración solo si el correo del usuario es admin@gmail.com */}
        {user && user.email === 'admin@gmail.com' && (
          <>
            <li><NavLink to="/admin/usuarios">Usuarios</NavLink> |</li>
            <li><NavLink to="/admin/productos">Productos</NavLink> |</li>
          </>
        )}

        <li><a>Nosotros</a> |</li>
        <li><a>Blogs</a> |</li>
        <li><a>Contacto</a></li>
      </ul>

      <div className={styles.nav_auth}>
        {user ? (
          <button onClick={handleLogout} className={styles.button_auth}>
            Cerrar sesión
          </button>
        ) : (
          <>
            <NavLink to="/login" className={styles.button_auth}>Iniciar sesión</NavLink>
            <NavLink to="/registro" className={styles.button_auth}>Registro</NavLink>
          </>
        )}
        <button className={styles.button}><img src={carritoImg} width="30px" alt="Carrito" /></button>
      </div>
    </nav>
  );
}

export default Nav;
