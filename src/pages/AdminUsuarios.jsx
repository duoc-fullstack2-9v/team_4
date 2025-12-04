import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { fetchUsers, deleteUser } from "../services/usersApi";
import { AuthContext } from '../context/AuthContext';

function AdminUsuarios() {
  const { isLoggedIn } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para la navegación



  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        setCargando(true);
        const data = await fetchUsers();
        setUsuarios(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los usuarios");
      } finally {
        setCargando(false);
      }
    };

    cargarUsuarios();
  }, [isLoggedIn, navigate]);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?"
    );
    if (!confirmar) return;

    try {
      await deleteUser(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el usuario");
    }
  };


  return (
    <>
      <Nav />
      <main className="contenedor-admin">
        <h1>Administración de Usuarios</h1>

        {cargando && <p>Cargando usuarios...</p>}
        {error && <p className="error">{error}</p>}

        {!cargando && !error && (
          <table className="tabla-admin">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan={4}>No hay usuarios registrados.</td>
                </tr>
              ) : (
                usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
                    <td>
                      <button onClick={() => handleEliminar(u.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </main>
      <Footer />
    </>
  );
}

export default AdminUsuarios;