import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Main from "../components/Main"
import torta2Chocolate from "../assets/torta cuadrada chocolate.jpg"
import torta2Frutas from "../assets/torta cuadrada de frutas.jpg"
import tortaOVainilla from "../assets/torta circular de vainilla.jpg"
import mousseChoco from "../assets/Triple Chocolate Mousse Cake – A Chocolate Lover’s Dream Come True!.jpg"
import tortaManjarO from "../assets/torta circular de manjar.jpg"
import tiramisuClasico from "../assets/Tiramisu Classique _ Recette Originale.jpg"
import tortaSinAzucarnaranja from "../assets/Orange Cake with Zesty Cream Cheese Frosting.jpg"
import cheesecakeSinAzucar from "../assets/Cheesecake Factory Cheesecake.jpg"
import empanadaManzana from "../assets/Empanadas de Manzana.jpg"
import tortaSantiago from "../assets/13889883-5a9d-4cb8-82ec-94290e043b49.jpg"
import brownieSinGluten from "../assets/8f33506f-a806-4097-b03e-85b904914aaf.jpg"
import panSinGluten from "../assets/fb32f73a-d0c2-44f2-8320-063eb573f7b7.jpg"
import chocoVegan from "../assets/6 Ingredient Vegan Flourless Chocolate Cake Recipe (EASY!).jpg"
import galletasAvena from "../assets/Galletas de Avena con 3 ingredientes - Loli….jpg"
import especialCumple from "../assets/356e6f80-7f65-4841-b8a3-bd4a43e74015.jpg"
import especialBoda from "../assets/d3ce09b3-8155-4534-a4ad-26f02ab6de2e.jpg"
function Productos() {

    const productos1 = [
        { nombre: "Torta Cuadrada de Chocolate", alt: "Torta Cuadrada de Chocolate", descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.", precio: "$45.000 CLP", imagen: torta2Chocolate },
        { nombre: "Torta Cuadrada de Frutas", alt: "Torta Cuadrada de Frutas", descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.", precio: "$50.000 CLP", imagen: torta2Frutas },
        { nombre: "Torta Circular de Vainilla", alt: "Torta Circular de Vainilla", descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.", precio: "$40.000 CLP", imagen: tortaOVainilla },
        { nombre: "Torta Circular de Manjar", alt: "Torta Circular de Manjar", descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.", precio: "$42.000 CLP", imagen: tortaManjarO }
    ]

    const productos2 = [
        { nombre: "Mousse de Chocolate", alt: "Mousse de Chocolate", descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.", precio: "$5.500 CLP", imagen: mousseChoco },
        { nombre: "Tiramisú Clásico", alt: "Tiramisú Clásico", descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.", precio: "$50.000 CLP", imagen: tiramisuClasico },
        { nombre: "Torta Sin Azúcar de Naranja", alt: "Torta Sin Azúcar de Naranja", descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.", precio: "$48.000 CLP", imagen: tortaSinAzucarnaranja },
        { nombre: "Cheesecake Sin Azúcar", alt: "Cheesecake Sin Azúcar", descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.", precio: "$47.000 CLP", imagen: cheesecakeSinAzucar }
    ]

        const productos3 = [
        { nombre: "Empanada de Manzana", alt: "Empanada de Manzana", descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.", precio: "$3.000 CLP", imagen: empanadaManzana },
        { nombre: "Tarta de Santiago", alt: "Tarta de Santiago", descripcion: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.", precio: "$6.000 CLP", imagen: tortaSantiago },
        { nombre: "Brownie Sin Gluten", alt: "Brownie Sin Gluten", descripcion: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.", precio: "$4.000 CLP", imagen: brownieSinGluten },
        { nombre: "Pan Sin Gluten", alt: "Pan Sin Gluten", descripcion: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.", precio: "$3.500 CLP", imagen: panSinGluten }
    ]

    const productos4 = [
        { nombre: "Torta Vegana de Chocolate", alt: "Torta Vegana de Chocolate", descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.", precio: "$50.000 CLP", imagen: chocoVegan },
        { nombre: "Galletas Veganas de Avena", alt: "Galletas Veganas de Avena", descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.", precio: "$4.500 CLP", imagen: galletasAvena },
        { nombre: "Torta Especial de Cumpleaños", alt: "Torta Especial de Cumpleaños", descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.", precio: "$55.000 CLP", imagen: especialCumple },
        { nombre: "Torta Especial de Boda", alt: "Torta Especial de Boda", descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.", precio: "$60.000 CLP", imagen: especialBoda }
    ]

    const productos = [
        productos1,
        productos2,
        productos3,
        productos4
    ]

    return <>
        <Nav></Nav>
        <Main productos = {productos}></Main>
        <Footer></Footer>
    </>
}

export default Productos;