import { useState, useContext } from 'react';
import styles from '../styles/Login.module.css'; // Importamos los estilos de la página de login
import { Link, useNavigate } from 'react-router-dom'; // Importamos Link para navegación y useNavigate para redirigir
import { useUsers } from '../components/utils'
import { AuthContext } from '../context/AuthContext';
// Definimos las claves para el almacenamiento en localStorage
const LS_LOGGED_KEY = 'pms_logged_user';  // Clave para almacenar al usuario logueado


// Componente principal del Login
export default function Login({ onLogin }) {
  const users = useUsers(); // Obtenemos los usuarios desde el hook useUsers
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [showPass, setShowPass] = useState(false); // Estado para controlar la visibilidad de la contraseña
  const navigate = useNavigate(); // Función para navegar entre rutas
  const { login } = useContext(AuthContext);

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario
    const mail = (email || '').trim().toLowerCase(); // Limpiamos y convertimos el correo a minúsculas

    // Verificamos que los campos de correo y contraseña no estén vacíos
    if (!mail || !password) {
      alert('Completa correo y contraseña.');
      return;
    }

    // Buscamos al usuario en la lista de usuarios
    const user = users.find(u => u.email?.toLowerCase() === mail);

    // Si el correo no está registrado, mostramos un mensaje de error
    if (!user) {
      alert('Ese correo no está registrado.');
      return;
    }

    // Si la contraseña no es correcta, mostramos un mensaje de error
    if (user.pass !== password) {
      alert('Contraseña incorrecta.');
      return;
    }

    // Si las credenciales son correctas, guardamos al usuario en el AuthContext y localStorage
    const userToLogin = { email: user.email, nombre: user.nombre };
    login(userToLogin);  // Usamos el contexto para establecer al usuario como logueado
    localStorage.setItem(LS_LOGGED_KEY, JSON.stringify(userToLogin));

    navigate('/home', { replace: true }); // Redirigimos al home
  }



  return (
    <div className={styles.main}>
      <div className={styles.contenedor_login}>
        <div className={styles.logo} /> {/* Logo del login */}
        <h1 className={styles.titulo}>Iniciar Sesión</h1> {/* Título principal de la página */}

        <div className={styles.caja}>
          {/* Formulario de inicio de sesión */}
          <form id="login-form" onSubmit={handleSubmit}>
            {/* Campo para el correo electrónico */}
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado de email
              required
            />

            {/* Campo para la contraseña */}
            <label htmlFor="password">Contraseña</label>
            <div className={styles.input_pass}>
              <input
                type={showPass ? 'text' : 'password'} // Si showPass es true, mostramos la contraseña en texto
                id="password"
                placeholder="Ingrese su contraseña"
                minLength={8} // Requiere un mínimo de 8 caracteres
                maxLength={20} // Requiere un máximo de 20 caracteres
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de password
                required
              />
              {/* Icono para alternar la visibilidad de la contraseña */}
              <i
                id="togglePass"
                className={`fa-solid ${showPass ? 'fa-eye' : 'fa-eye-slash'}`} // Cambia el ícono de ojo dependiendo de la visibilidad
                onClick={() => setShowPass(s => !s)} // Al hacer click alternamos el estado de showPass
                aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'} // Atributo accesible para lectores de pantalla
                title={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'} // Título del ícono
                role="button" // Indicamos que el ícono es un botón
                tabIndex={0} // Permite que el ícono sea accesible por teclado
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setShowPass(s => !s)} // Alterna la visibilidad con Enter o Space
              />
            </div>

            {/* Botón para enviar el formulario */}
            <button type="submit" className={styles.btn}>Ingresar</button>
          </form>

          {/* Link a la página de registro */}
          <p className={styles.ayuda}>
            ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
