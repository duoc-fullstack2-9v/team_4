import { useState } from 'react'; // Importamos hooks de React para manejo de estado y memorizar valores
import styles from '../styles/Registro.module.css'; // Importamos los estilos de la página de registro
import { Link, useNavigate } from 'react-router-dom'; // Importamos Link para navegación y useNavigate para redirigir
import { useUsers } from '../components/utils'

const LS_KEY = 'pms_users';

// Componente principal para el registro de usuarios
export default function Register() {
    const users = useUsers(); // Obtenemos los usuarios actuales desde el localStorage
    const navigate = useNavigate(); // Hook para redirigir al usuario después de registrarse

    // Estado para almacenar los valores de los campos del formulario
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [edad, setEdad] = useState('');
    const [codigo, setCodigo] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');

    // Estado para manejar los mensajes de validación
    const [msg, setMsg] = useState({
        nombre: '', email: '', edad: '', codigo: '', pass: '', confirm: ''
    });

    // Dominios de correo permitidos
    const allowDomains = ['duocuc.cl', 'profesor.duocuc.cl', 'gmail.com'];

    // Funciones para establecer mensajes de error o éxito en los campos
    const setError = (key, text) => setMsg(m => ({ ...m, [key]: text ? '❌ ' + text : '' }));
    const setOK = (key, text = '') => setMsg(m => ({ ...m, [key]: text ? '✅ ' + text : '' }));

    // Función que maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario
        let ok = true; // Variable para verificar si todo está correcto

        // Validación del campo nombre
        if (!nombre.trim()) {
            setError('nombre', 'El nombre es obligatorio');
            ok = false;
        } else setOK('nombre');

        // Validación del campo email
        const mail = (email || '').trim().toLowerCase();
        if (!mail) {
            setError('email', 'El correo es obligatorio');
            ok = false;
        } else {
            const domain = (mail.split('@')[1] || '');
            if (!allowDomains.includes(domain)) {
                setError('email', 'Dominio no permitido');
                ok = false;
            } else setOK('email');
        }

        // Validación del campo edad
        if (edad) {
            if (parseInt(edad, 10) >= 50) {
                setOK('edad', 'Beneficio: 50% de descuento por ser mayor de 50 🎉');
            } else setOK('edad');
        } else setOK('edad');

        // Validación del código promocional
        if ((codigo || '').trim().toUpperCase() === 'FELICES50') {
            setOK('codigo', 'Beneficio: 10% descuento de por vida 🎉');
        } else setOK('codigo');

        // Validación del campo contraseña
        if (pass.length < 8 || pass.length > 20) {
            setError('pass', 'Contraseña 8 a 20 caracteres');
            ok = false;
        } else setOK('pass');

        // Validación de confirmación de contraseña
        if (confirm !== pass) {
            setError('confirm', 'Las contraseñas no coinciden');
            ok = false;
        } else setOK('confirm');

        // Si algún campo no es válido, no se continúa con el registro
        if (!ok) return;

        // Verificamos si el correo ya está registrado
        if (users.some(u => u.email === mail)) {
            setError('email', 'Ese correo ya está registrado');
            return;
        }

        // Agregamos el nuevo usuario al localStorage
        const newUsers = [...users, { nombre: nombre.trim(), email: mail, pass }];
        localStorage.setItem(LS_KEY, JSON.stringify(newUsers)); // Guardamos los usuarios actualizados
        alert('Cuenta creada correctamente.'); // Mostramos un mensaje de éxito
        navigate('/login', { replace: true }); // Redirigimos a la página de login
    }

    return (
        <div className={styles.main}>
            <div className={styles.contenedor_login}>
                <div className={styles.caja}>
                    <h1 className="subtitulo">Crear cuenta</h1> {/* Título de la página */}

                    {/* Formulario de registro */}
                    <form id="form-register" noValidate onSubmit={handleSubmit}>
                        {/* Campo para el nombre */}
                        <label htmlFor="r_nombre">Nombre</label>
                        <input id="r_nombre" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ingrese su nombre" required />
                        <small className={styles.msg}>{msg.nombre}</small> {/* Mensaje de validación para el nombre */}

                        {/* Campo para el correo electrónico */}
                        <label htmlFor="r_email">Correo electrónico</label>
                        <input type="email" id="r_email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ingrese su correo electrónico" required />
                        <small className={styles.msg}>{msg.email}</small> {/* Mensaje de validación para el correo */}

                        {/* Campo para la edad */}
                        <label htmlFor="r_edad">Edad</label>
                        <input type="number" id="r_edad" value={edad} onChange={e => setEdad(e.target.value)} min="0" max="120" placeholder="Ingrese su edad" />
                        <small className={styles.msg}>{msg.edad}</small> {/* Mensaje de validación para la edad */}

                        {/* Campo para el código promocional */}
                        <label htmlFor="r_codigo">Código promocional</label>
                        <input id="r_codigo" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Ingrese el código promocional(opcional)" />
                        <small className={styles.msg}>{msg.codigo}</small> {/* Mensaje de validación para el código */}

                        {/* Campo para la contraseña */}
                        <label htmlFor="r_pass">Contraseña</label>
                        <input type="password" id="r_pass" value={pass} onChange={e => setPass(e.target.value)} placeholder="Ingrese su contraseña entre 8 a 20 caracteres" minLength={8} maxLength={20} required />
                        <small className={styles.msg}>{msg.pass}</small> {/* Mensaje de validación para la contraseña */}

                        {/* Campo para confirmar la contraseña */}
                        <label htmlFor="r_confirm">Confirmar contraseña</label>
                        <input type="password" id="r_confirm" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repita su contraseña entre 8 a 20 caracteres" minLength={8} maxLength={20} required />
                        <small className={styles.msg}>{msg.confirm}</small> {/* Mensaje de validación para la confirmación de la contraseña */}

                        {/* Botón para enviar el formulario */}
                        <button type="submit" className={styles.btn}>Regístrate</button>
                    </form>

                    {/* Enlace para ir al login si ya tiene cuenta */}
                    <p className={styles.ayuda} style={{ marginTop: 8 }}>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                </div>
            </div>
        </div>
    );
}
