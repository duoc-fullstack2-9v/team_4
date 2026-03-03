import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from "../styles/Index.module.css";
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../services/apiConfig';


function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ nombre: '', email: '' });


  useEffect(() => {
    if (!id) return;

    axios.get(`${API_BASE_URL}/api/users/${id}`)
      .then(response => setUsuario(response.data))
      .catch(error => {
        console.error("Error al cargar el usuario:", error);
        alert("No se pudo cargar el usuario para editar.");
        navigate('/adminUsuarios');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${API_BASE_URL}/api/users/${id}`, usuario)
      .then(response => {
        alert('Usuario actualizado correctamente');
        navigate('/adminUsuarios');
      })
      .catch(error => console.error('Error actualizando el usuario:', error));
  };


  const handleCancel = () => {
    navigate('/adminUsuarios');
  };

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h2>Editar Usuario</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Email:
              <input
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>

            <button type="submit" className={styles.btn}>Actualizar</button>
            <button type="button" onClick={handleCancel} className={styles.btnCerrar}>Cancelar</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default EditarUsuario;
