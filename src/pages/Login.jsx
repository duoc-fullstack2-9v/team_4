import { useState, useMemo } from 'react'
import styles from '../styles/Login.module.css'
import { Link, useNavigate } from 'react-router-dom'

const LS_USERS_KEY = 'pms_users'
const LS_LOGGED_KEY = 'pms_logged_user'

function useUsers() {
  return useMemo(() => {
    try { return JSON.parse(localStorage.getItem(LS_USERS_KEY)) || [] }
    catch { return [] }
  }, [])
}

export default function Login() {
  const users = useUsers()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const mail = (email || '').trim().toLowerCase()
    if (!mail || !password) { alert('Completa correo y contraseña.'); return }

    const user = users.find(u => u.email?.toLowerCase() === mail)
    if (!user) { alert('Ese correo no está registrado.'); return }
    if (user.pass !== password) { alert('Contraseña incorrecta.'); return }

    localStorage.setItem(LS_LOGGED_KEY, JSON.stringify({ email: user.email, nombre: user.nombre }))
    navigate('/home', { replace: true })
  }

  return (
    <div className={styles.main}>
      <div className={styles.contenedor_login}>
        <div className={styles.logo} />
        <h1 className={styles.titulo}>Iniciar Sesión</h1>

        <div className={styles.caja}>
          <form id="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Contraseña</label>
            <div className={styles.input_pass}>
              <input
                type={showPass ? 'text' : 'password'}
                id="password"
                placeholder="Ingrese su contraseña"
                minLength={8}
                maxLength={20}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                id="togglePass"
                className={`fa-solid ${showPass ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={() => setShowPass(s => !s)}
                aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                title={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setShowPass(s => !s)}
              />
            </div>

            <button type="submit" className={styles.btn}>Ingresar</button>
          </form>

          <p className={styles.ayuda}>
            ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  )
}