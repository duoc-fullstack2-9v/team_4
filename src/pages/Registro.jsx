import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../styles/Auth.module.css'; // Usando los estilos compartidos
import { createUser, fetchUsers } from '../services/usersApi'; // Importamos la función de la API

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

export default function Registro() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [edad, setEdad] = useState('');
    const [codigo, setCodigo] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [msg, setMsg] = useState({
        nombre: '', email: '', edad: '', codigo: '', pass: '', confirm: ''
    });

    const allowDomains = ['duocuc.cl', 'profesor.duocuc.cl', 'gmail.com'];

    const setError = (key, text) => setMsg(m => ({ ...m, [key]: text ? text : '' }));
    const setOK = (key, text = '') => setMsg(m => ({ ...m, [key]: text ? text : '' }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        let ok = true;

        if (!nombre.trim()) { setError('nombre', 'El nombre es obligatorio'); ok = false; } else { setOK('nombre'); }

        const mail = (email || '').trim().toLowerCase();
        if (!mail) { setError('email', 'El correo es obligatorio'); ok = false; }
        else {
            const domain = (mail.split('@')[1] || '');
            if (!allowDomains.includes(domain)) { setError('email', 'Dominio no permitido'); ok = false; }
            else { setOK('email'); }
        }

        if (edad) {
            if (parseInt(edad, 10) >= 50) {
                setOK('edad', '🎉 Beneficio: 50% de descuento por ser mayor de 50');
            } else { setOK('edad'); }
        } else { setOK('edad'); }

        if ((codigo || '').trim().toUpperCase() === 'FELICES50') {
            setOK('codigo', '🎉 Beneficio: 10% descuento de por vida');
        } else { setOK('codigo'); }

        if (pass.length < 8 || pass.length > 20) { setError('pass', 'La contraseña debe tener entre 8 y 20 caracteres'); ok = false; }
        else { setOK('pass'); }

        if (confirm !== pass) { setError('confirm', 'Las contraseñas no coinciden'); ok = false; }
        else { setOK('confirm'); }

        if (!ok) return;

        try {
            // Verificamos si el email ya existe en la BD
            const existingUsers = await fetchUsers();
            if (existingUsers.some(u => u.email === mail)) {
                setError('email', 'Ese correo ya está registrado');
                return;
            }

            const newUser = {
                nombre: nombre.trim(),
                email: mail,
                edad: edad ? parseInt(edad, 10) : null,
                password: pass,
                rol: "USER"
            };

            await createUser(newUser);

            alert('Cuenta creada correctamente.');
            navigate('/login', { replace: true });
        } catch (error) {
            console.error("Error en el registro:", error);
            setError('confirm', error.message || 'No se pudo completar el registro. Inténtalo más tarde.');
        }
    };

    return (
        <>
            <Nav />
            <main className={styles['auth-page']}>
                <div className={styles['auth-card']}>
                    <h1>Crear cuenta</h1>
                    <form id="form-register" noValidate onSubmit={handleSubmit}>
                        
                        <div>
                            <label htmlFor="r_nombre">Nombre</label>
                            <input id="r_nombre" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre completo" required />
                            {msg.nombre && <small className={styles.error}>{msg.nombre}</small>}
                        </div>

                        <div>
                            <label htmlFor="r_email">Correo electrónico</label>
                            <input type="email" id="r_email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required />
                            {msg.email && <small className={styles.error}>{msg.email}</small>}
                        </div>

                        <div>
                            <label htmlFor="r_edad">Edad</label>
                            <input type="number" id="r_edad" value={edad} onChange={e => setEdad(e.target.value)} min="0" max="120" placeholder="Tu edad (opcional)" />
                            {msg.edad && <small className={styles.error}>{msg.edad}</small>}
                        </div>

                        <div>
                            <label htmlFor="r_codigo">Código promocional</label>
                            <input id="r_codigo" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Código (opcional)" />
                            {msg.codigo && <small className={styles.error}>{msg.codigo}</small>}
                        </div>

                        <label htmlFor="r_pass">Contraseña</label>
                        <div className={styles['password-field']}>
                            <input type={showPassword ? "text" : "password"} id="r_pass" value={pass} onChange={e => setPass(e.target.value)} placeholder="Crea una contraseña segura" minLength={8} maxLength={20} required />
                            <button
                                type="button"
                                className={styles['toggle-password']}
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Mostrar u ocultar contraseña"
                            >
                                {showPassword ? EyeOffIcon : EyeIcon}
                            </button>
                        </div>
                        {msg.pass && <small className={styles.error}>{msg.pass}</small>}

                        <label htmlFor="r_confirm">Confirmar contraseña</label>
                        <div className={styles['password-field']}>
                            <input type={showConfirmPassword ? "text" : "password"} id="r_confirm" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repite la contraseña" minLength={8} maxLength={20} required />
                            <button
                                type="button"
                                className={styles['toggle-password']}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label="Mostrar u ocultar contraseña"
                            >
                                {showConfirmPassword ? EyeOffIcon : EyeIcon}
                            </button>
                        </div>
                        {msg.confirm && <small className={styles.error}>{msg.confirm}</small>}

                        <button type="submit" className={styles['auth-button']}>REGÍSTRATE</button>
                    </form>
                    <p className={styles['auth-switch-text']}>
                        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}