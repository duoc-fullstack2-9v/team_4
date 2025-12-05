
import { useState } from 'react'; // Importamos hooks de React
import styles from '../styles/Registro.module.css'; // Estilos de la página de agregar producto
import { useNavigate } from 'react-router-dom'; // Para redirigir a otra página
import { createProduct } from '../services/productsApi'; // Función para enviar datos al backend

export default function AgregarProducto() {
    const navigate = useNavigate(); // Hook para redirigir

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [imagen, setImagen] = useState('');

    // Estado para los mensajes de validación
    const [msg, setMsg] = useState({
        nombre: '', descripcion: '', precio: '', stock: '', imagen: ''
    });

    // Función para establecer mensajes de error
    const setError = (key, text) => setMsg(m => ({ ...m, [key]: text ? '❌ ' + text : '' }));
    const setOK = (key, text = '') => setMsg(m => ({ ...m, [key]: text ? '✅ ' + text : '' }));

    // Función que maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario

        let ok = true; // Variable para verificar si todo está correcto

        // Validación de los campos
        if (!nombre.trim()) {
            setError('nombre', 'El nombre es obligatorio');
            ok = false;
        } else setOK('nombre');

        if (!descripcion.trim()) {
            setError('descripcion', 'La descripción es obligatoria');
            ok = false;
        } else setOK('descripcion');

        if (!precio || isNaN(precio) || parseFloat(precio) <= 0) {
            setError('precio', 'El precio debe ser un número válido mayor que 0');
            ok = false;
        } else setOK('precio');

        if (!stock || isNaN(stock) || parseInt(stock) <= 0) {
            setError('stock', 'El stock debe ser un número válido mayor que 0');
            ok = false;
        } else setOK('stock');

        if (!imagen.trim()) {
            setError('imagen', 'La URL de la imagen es obligatoria');
            ok = false;
        } else setOK('imagen');

        // Si algún campo no es válido, no se continúa con el registro
        if (!ok) return;

        // Crear el producto
        const nuevoProducto = { nombre, descripcion, precio, stock, imagen };

        try {
            await createProduct(nuevoProducto); // Enviamos el producto al backend
            alert('Producto creado correctamente.');
            navigate('/adminProductos'); // Redirigimos a la página de administración de productos
        } catch (err) {
            console.error('Error al crear producto:', err);
            alert('Hubo un error al crear el producto.');
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.contenedor_login}>
                <div className={styles.caja}>
                    <h1 className="subtitulo">Agregar Producto</h1>

                    <form id="form-agregar-producto" noValidate onSubmit={handleSubmit}>
                        <label htmlFor="nombre">Nombre</label>
                        <input id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ingrese el nombre del producto" required />
                        <small className={styles.msg}>{msg.nombre}</small>

                        <label htmlFor="descripcion">Descripción</label>
                        <textarea id="descripcion" value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Ingrese una descripción del producto" required />
                        <small className={styles.msg}>{msg.descripcion}</small>

                        <label htmlFor="precio">Precio</label>
                        <input id="precio" type="number" value={precio} onChange={e => setPrecio(e.target.value)} placeholder="Ingrese el precio del producto" required />
                        <small className={styles.msg}>{msg.precio}</small>

                        <label htmlFor="stock">Stock</label>
                        <input id="stock" type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="Ingrese el stock disponible" required />
                        <small className={styles.msg}>{msg.stock}</small>

                        <label htmlFor="imagen">URL de la Imagen</label>
                        <input id="imagen" value={imagen} onChange={e => setImagen(e.target.value)} placeholder="Ingrese la URL de la imagen del producto" required />
                        <small className={styles.msg}>{msg.imagen}</small>

                        <button type="submit" className={styles.btn}>Crear Producto</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
