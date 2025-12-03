import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../styles/Auth.module.css'; // Cambiado a los estilos compartidos
import { loginUser } from '../services/usersApi'; // Importamos la función de login


// --- Iconos SVG ---
const EyeIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7a4631" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);
const EyeOffIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7a4631" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para visibilidad
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpiamos errores previos

    try {
      const usuarioEncontrado = await loginUser(email, password); // Llamada a la API

      if (!usuarioEncontrado) {
        setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        return;
      }

      // Determina el rol del usuario de forma robusta
      const backendRole = (usuarioEncontrado.rol || usuarioEncontrado.role || "USER").toUpperCase();
      const userRole = (backendRole === 'ADMIN' || backendRole === 'ROLE_ADMIN') ? 'ADMIN' : 'USER';

      // Creamos el objeto de usuario para guardar en localStorage
      const currentUser = {
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,
        rol: userRole
      };

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      navigate("/"); // Redirigimos al home
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al intentar iniciar sesión. Inténtalo más tarde.");
    }
  };

  return (
    <>
      <Nav />
      <main className={styles['auth-page']}>
        <div className={styles['auth-card']}>
          <h1>Iniciar Sesión</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com" // Placeholder actualizado para consistencia
                required
              />
            </div>
            <label htmlFor="password">Contraseña</label>
            <div className={styles['password-field']}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña" // Placeholder actualizado para consistencia
                required
              />
              <button
                type="button"
                className={styles['toggle-password']}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar u ocultar contraseña"
              >
                {showPassword ? EyeOffIcon : EyeIcon}
              </button>
            </div>
            
            {error && <p className={styles.error}>{error}</p>}
            
            <button type="submit" className={styles['auth-button']}>
              INGRESAR
            </button>
          </form>
          <p className={styles['auth-switch-text']}>
            ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;
