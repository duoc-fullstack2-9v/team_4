import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { fetchProducts, deleteProduct } from "../services/productsApi"; // Eliminamos la función de crear producto
import { AuthContext } from '../context/AuthContext';
import styles from "../styles/Index.module.css"; // Aseguramos de importar el CSS correctamente

function AdminProductos() {
  const { isLoggedIn } = useContext(AuthContext);  // Verificamos si el usuario está logueado
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para la navegación

  // Cargar los productos desde el backend
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        const data = await fetchProducts(); // Obtener productos desde el backend
        console.log('Respuesta de la API:', data); // Agregar un log para verificar la respuesta

        const productosArray = Array.isArray(data) ? data : (data && Array.isArray(data.productos)) ? data.productos : [];

        if (productosArray.length > 0 || Array.isArray(data)) {
          setProductos(productosArray);
        } else {
          setError("Los datos de productos no están en el formato correcto o no hay productos.");
          setProductos([]); // Asegurarse de que productos sea un arreglo vacío
        }

      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos");
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, [isLoggedIn, navigate]);

  // Eliminar un producto
  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (!confirmar) return;

    try {
      await deleteProduct(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el producto");
    }
  };

  // Función para redirigir a la página de editar producto
  const handleEditarProducto = (id) => {
    navigate(`/editarProducto/${id}`);  // Redirige a la página de editar producto
  };

  // Función para redirigir a la página de agregar producto
  const handleAgregarProducto = () => {
    navigate("/agregarProducto");  // Redirige a la página de agregar producto
  };

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <h1 className={styles.h1}>Administración de Productos</h1>

        {cargando && <p>Cargando productos...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!cargando && !error && (
          <>
            <table className={styles['tabla-admin']}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No hay productos registrados.</td>
                  </tr>
                ) : (
                  productos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.nombre}</td>
                      <td>{p.precio}</td>
                      <td>{p.stock}</td>
                      <td>
                        <button className={styles.button} onClick={() => handleEditarProducto(p.id)}>
                          Editar
                        </button>
                        <button className={styles.button} onClick={() => handleEliminar(p.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Botón para agregar un nuevo producto */}
            <button onClick={handleAgregarProducto} className={styles.btn}>Agregar Nuevo Producto</button>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default AdminProductos;
