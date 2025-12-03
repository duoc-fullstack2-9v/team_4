import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { fetchProducts, deleteProduct, createProduct } from "../services/productsApi";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para la navegación


  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        const data = await fetchProducts();
        setProductos(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos");
      } finally {
        setCargando(false);
      }
    };

    // Solo cargar productos si el usuario está autenticado
    if (JSON.parse(localStorage.getItem("currentUser"))) {
      cargarProductos();
    }
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar este producto?"
    );
    if (!confirmar) return;

    try {
      await deleteProduct(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el producto");
    }
  };

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
  });

  const handleChangeNuevo = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleCrearProducto = async (e) => {
    e.preventDefault();
    try {
      const creado = await createProduct({
        ...nuevoProducto,
        precio: Number(nuevoProducto.precio),
        stock: Number(nuevoProducto.stock),
      });
      setProductos((prev) => [...prev, creado]);
      setNuevoProducto({ nombre: "", precio: "", stock: "" });
    } catch (err) {
      console.error(err);
      alert("Error al crear producto");
    }
  };
  
  // Renderiza el contenido solo si el usuario es válido
  if (!JSON.parse(localStorage.getItem("currentUser"))) {
    return null; // O un spinner de carga mientras redirige
  }

  return (
    <>
      <Nav />
      <main className="contenedor-admin">
        <h1>Administración de Productos</h1>

        {cargando && <p>Cargando productos...</p>}
        {error && <p className="error">{error}</p>}

        {!cargando && !error && (
          <table className="tabla-admin">
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
                      <button onClick={() => handleEliminar(p.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
        <form className="form-admin" onSubmit={handleCrearProducto}>
          <h2>Nuevo producto</h2>
          <div>
            <label>Nombre</label>
            <input
              name="nombre"
              value={nuevoProducto.nombre}
              onChange={handleChangeNuevo}
              required
            />
          </div>
          <div>
            <label>Precio</label>
            <input
              name="precio"
              type="number"
              step="0.01"
              value={nuevoProducto.precio}
              onChange={handleChangeNuevo}
              required
            />
          </div>
          <div>
            <label>Stock</label>
            <input
              name="stock"
              type="number"
              value={nuevoProducto.stock}
              onChange={handleChangeNuevo}
              required
            />
          </div>
          <button type="submit">Crear producto</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default AdminProductos;