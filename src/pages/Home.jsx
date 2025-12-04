// Importamos los componentes que se utilizan en la página principal
import { useState, useEffect } from "react";
import Nav from "../components/Nav"; // Barra de navegación superior
import Main from "../components/Main"; // Componente principal donde se muestran los productos
import Footer from "../components/Footer"; // Pie de página
import { fetchProducts } from "../services/productsApi";

// Importamos las imágenes de los productos
import torta2Chocolate from "../assets/torta cuadrada chocolate.jpg";
import torta2Frutas from "../assets/torta cuadrada de frutas.jpg";
import tortaOVainilla from "../assets/torta circular de vainilla.jpg";
import mousseChoco from "../assets/Triple Chocolate Mousse Cake – A Chocolate Lover’s Dream Come True!.jpg";
import tortaManjarO from "../assets/torta circular de manjar.jpg";
import tiramisuClasico from "../assets/Tiramisu Classique _ Recette Originale.jpg";
import tortaSinAzucarnaranja from "../assets/Orange Cake with Zesty Cream Cheese Frosting.jpg";
import cheesecakeSinAzucar from "../assets/Cheesecake Factory Cheesecake.jpg";

// Componente principal de la página de inicio
function Home({ isLoggedIn }) {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                setCargando(true);
                const data = await fetchProducts(); // Obtener productos desde el backend
                setProductos(data); // Guardar los productos en el estado
                setError(null);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar los productos.");
            } finally {
                setCargando(false);
            }
        };

        cargarProductos(); // Llamamos a la función para cargar los productos al cargar el componente
    }, []);

    const productosFiltrados = productos.slice(0, 8); // Obtener solo los primeros 8 productos


    // Renderizamos los componentes de la página: 
    // - Nav: barra de navegación
    // - Main: componente donde se pasan los productos como prop
    // - Footer: pie de página
    return (
        <>
            <Nav /> {/* Barra de navegación */}
            {cargando && <p>Cargando productos...</p>}
            {error && <p className="error">{error}</p>}
            {!cargando && !error && (
                <Main showHero={true} productos={productosFiltrados} isLoggedIn={isLoggedIn} />
            )}
            <Footer /> {/* Pie de página */}
        </>
    );
}

export default Home;
