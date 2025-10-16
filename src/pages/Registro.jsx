import { useMemo, useState } from 'react'
import styles from '../styles/Registro.module.css'
import { Link, useNavigate } from 'react-router-dom'

const LS_KEY = 'pms_users'

function useUsers() {
    return useMemo(() => {
        try { return JSON.parse(localStorage.getItem(LS_KEY)) || [] }
        catch { return [] }
    }, [])
}

export default function Register() {
    const users = useUsers()
    const navigate = useNavigate()

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [edad, setEdad] = useState('')
    const [codigo, setCodigo] = useState('')
    const [pass, setPass] = useState('')
    const [confirm, setConfirm] = useState('')

    const [msg, setMsg] = useState({
        nombre: '', email: '', edad: '', codigo: '', pass: '', confirm: ''
    })

    const allowDomains = ['duocuc.cl', 'profesor.duocuc.cl', 'gmail.com']

    const setError = (key, text) => setMsg(m => ({ ...m, [key]: text ? '❌ ' + text : '' }))
    const setOK = (key, text = '') => setMsg(m => ({ ...m, [key]: text ? '✅ ' + text : '' }))

    const handleSubmit = (e) => {
        e.preventDefault()
        let ok = true

        if (!nombre.trim()) { setError('nombre', 'El nombre es obligatorio'); ok = false } else setOK('nombre')

        const mail = (email || '').trim().toLowerCase()
        if (!mail) { setError('email', 'El correo es obligatorio'); ok = false }
        else {
            const domain = (mail.split('@')[1] || '')
            if (!allowDomains.includes(domain)) { setError('email', 'Dominio no permitido'); ok = false }
            else setOK('email')
        }

        if (edad) {
            if (parseInt(edad, 10) >= 50) {
                setOK('edad', 'Beneficio: 50% de descuento por ser mayor de 50 🎉')
            } else setOK('edad')
        } else setOK('edad')

        if ((codigo || '').trim().toUpperCase() === 'FELICES50') {
            setOK('codigo', 'Beneficio: 10% descuento de por vida 🎉')
        } else setOK('codigo')

        if (pass.length < 8 || pass.length > 20) { setError('pass', 'Contraseña 8 a 20 caracteres'); ok = false }
        else setOK('pass')

        if (confirm !== pass) { setError('confirm', 'Las contraseñas no coinciden'); ok = false }
        else setOK('confirm')

        if (!ok) return

        if (users.some(u => u.email === mail)) {
            setError('email', 'Ese correo ya está registrado')
            return
        }

        const newUsers = [...users, { nombre: nombre.trim(), email: mail, pass }]
        localStorage.setItem(LS_KEY, JSON.stringify(newUsers))
        alert('Cuenta creada correctamente.')
        navigate('/login', { replace: true })
    }

    return (
        <div className={styles.main}>
            <div className={styles.contenedor_login}>
                <div className={styles.caja}>
                    <h1 className="subtitulo">Crear cuenta</h1>

                    <form id="form-register" noValidate onSubmit={handleSubmit}>
                        <label htmlFor="r_nombre">Nombre</label>
                        <input id="r_nombre" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ingrese su nombre" required />
                        <small className={styles.msg}>{msg.nombre}</small>

                        <label htmlFor="r_email">Correo electrónico</label>
                        <input type="email" id="r_email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ingrese su correo electrónico" required />
                        <small className={styles.msg}>{msg.email}</small>

                        <label htmlFor="r_edad">Edad</label>
                        <input type="number" id="r_edad" value={edad} onChange={e => setEdad(e.target.value)} min="0" max="120" placeholder="Ingrese su edad" />
                        <small className={styles.msg}>{msg.edad}</small>

                        <label htmlFor="r_codigo">Código promocional</label>
                        <input id="r_codigo" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Ingrese el código promocional(opcional)" />
                        <small className={styles.msg}>{msg.codigo}</small>

                        <label htmlFor="r_pass">Contraseña</label>
                        <input type="password" id="r_pass" value={pass} onChange={e => setPass(e.target.value)} placeholder="Ingrese su contraseña entre 8 a 20 caracteres" minLength={8} maxLength={20} required />
                        <small className={styles.msg}>{msg.pass}</small>

                        <label htmlFor="r_confirm">Confirmar contraseña</label>
                        <input type="password" id="r_confirm" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repita su contraseña entre 8 a 20 caracteres" minLength={8} maxLength={20} required />
                        <small className={styles.msg}>{msg.confirm}</small>

                        <button type="submit" className={styles.btn}>Regístrate</button>
                    </form>

                    <p className={styles.ayuda} style={{ marginTop: 8 }}>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                </div>
            </div>
        </div >
    )
}
