import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from "../styles/Index.module.css";
import Nav from '../components/Nav'; // Importar Nav y Footer para una página completa
import Footer from '../components/Footer';

function EditarProducto() {
  const { id } = useParams(); // Obtener el ID de la URL
  const navigate = useNavigate(); // Hook para la navegación
  const [producto, setProducto] = useState({ nombre: '', precio: '', stock: '' });

  useEffect(() => {
    // Si no hay ID, no hacer nada o redirigir
    if (!id) return;

    // Cargar el producto por ID
    axios.get(`/api/products/${id}`)
      .then(response => setProducto(response.data))
      .catch(error => {
        console.error("Error al cargar el producto:", error);
        alert("No se pudo cargar el producto para editar.");
        navigate('/adminProductos'); // Si hay error, volver a la lista
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  
  // Verificar que el ID y los datos del producto estén correctos
  console.log('ID del producto:', id);
  console.log('Datos del producto a actualizar:', producto);

  axios.put(`/api/products/${id}`, producto)
    .then(response => {
      console.log('Producto actualizado:', response.data);
      alert('Producto actualizado correctamente');
      navigate('/adminProductos');
    })
    .catch(error => {
      console.error('Error actualizando el producto:', error);
      alert('Hubo un error al actualizar el producto');
    });
};

  const handleCancel = () => {
    navigate('/adminProductos'); // El botón de cancelar también vuelve
  };

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h2 className={styles.h1}>Editar Producto</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Precio:
              <input
                type="number"
                name="precio"
                value={producto.precio}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Stock:
              <input
                type="number"
                name="stock"
                value={producto.stock}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>

            <button type="submit" className={styles.btn}>Actualizar</button>
            <button type="button" className={styles.btn} onClick={handleCancel}>Cancelar</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default EditarProducto;
