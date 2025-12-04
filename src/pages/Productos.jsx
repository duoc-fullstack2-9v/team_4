// Importamos los componentes que se muestran en la página
import { useState, useEffect } from "react";
import Footer from "../components/Footer"; // Pie de página
import Nav from "../components/Nav"; // Barra de navegación superior
import Main from "../components/Main"; // Componente principal que mostrará los productos
import { fetchProducts } from "../services/productsApi";

// Importamos todas las imágenes de los productos
import torta2Chocolate from "../assets/torta cuadrada chocolate.jpg";
import torta2Frutas from "../assets/torta cuadrada de frutas.jpg";
import tortaOVainilla from "../assets/torta circular de vainilla.jpg";
import mousseChoco from "../assets/Triple Chocolate Mousse Cake – A Chocolate Lover’s Dream Come True!.jpg";
import tortaManjarO from "../assets/torta circular de manjar.jpg";
import tiramisuClasico from "../assets/Tiramisu Classique _ Recette Originale.jpg";
import tortaSinAzucarnaranja from "../assets/Orange Cake with Zesty Cream Cheese Frosting.jpg";
import cheesecakeSinAzucar from "../assets/Cheesecake Factory Cheesecake.jpg";
import empanadaManzana from "../assets/Empanadas de Manzana.jpg";
import tortaSantiago from "../assets/13889883-5a9d-4cb8-82ec-94290e043b49.jpg";
import brownieSinGluten from "../assets/8f33506f-a806-4097-b03e-85b904914aaf.jpg";
import panSinGluten from "../assets/fb32f73a-d0c2-44f2-8320-063eb573f7b7.jpg";
import chocoVegan from "../assets/6 Ingredient Vegan Flourless Chocolate Cake Recipe (EASY!).jpg";
import galletasAvena from "../assets/Galletas de Avena con 3 ingredientes - Loli….jpg";
import especialCumple from "../assets/356e6f80-7f65-4841-b8a3-bd4a43e74015.jpg";
import especialBoda from "../assets/d3ce09b3-8155-4534-a4ad-26f02ab6de2e.jpg";

// Componente principal de la página de productos
function Productos() {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                setCargando(true);
                const data = await fetchProducts(); // Obtenemos los productos desde la API con axios
                setProductos(data); // Guardamos los productos en el estado
                setError(null);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar los productos.");
            } finally {
                setCargando(false);
            }
        };

        cargarProductos(); // Cargamos los productos cuando el componente se monta
    }, []);

    // Estructura principal que se renderiza: Nav + Main + Footer
    // Main recibe como prop el arreglo completo de productos
    return (
        <>
            <Nav /> {/* Barra de navegación superior */}
            {cargando && <p>Cargando productos...</p>}
            {error && <p className="error">{error}</p>}
            {!cargando && !error && <Main productos={productos} />}
            <Footer /> {/* Pie de página */}
        </>
    );
}

// Exportamos el componente para poder usarlo en App.jsx u otras rutas
export default Productos;
