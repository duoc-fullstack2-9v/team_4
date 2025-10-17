import Nav from "../components/Nav";
import Main from "../components/Main";
import Footer from "../components/Footer";
import torta2Chocolate from "../assets/torta cuadrada chocolate.jpg"
import torta2Frutas from "../assets/torta cuadrada de frutas.jpg"
import tortaOVainilla from "../assets/torta circular de vainilla.jpg"
import mousseChoco from "../assets/Triple Chocolate Mousse Cake – A Chocolate Lover’s Dream Come True!.jpg"
import tortaManjarO from "../assets/torta circular de manjar.jpg"
import tiramisuClasico from "../assets/Tiramisu Classique _ Recette Originale.jpg"
import tortaSinAzucarnaranja from "../assets/Orange Cake with Zesty Cream Cheese Frosting.jpg"
import cheesecakeSinAzucar from "../assets/Cheesecake Factory Cheesecake.jpg"


function Home(){

    const productos1 = [
        {nombre: "Torta Cuadrada de Chocolate", alt : "Torta Cuadrada de Chocolate", descripcion : "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.", precio : "$45.000 CLP", imagen : torta2Chocolate},
        {nombre: "Torta Cuadrada de Frutas", alt : "Torta Cuadrada de Frutas", descripcion : "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.", precio : "$50.000 CLP", imagen : torta2Frutas},
        {nombre: "Torta Circular de Vainilla", alt : "Torta Circular de Vainilla", descripcion : "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.", precio : "$40.000 CLP", imagen : tortaOVainilla},
        {nombre: "Torta Circular de Manjar", alt : "Torta Circular de Manjar", descripcion : "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.", precio : "$42.000 CLP", imagen : tortaManjarO}
    ]

    const productos2 = [
        {nombre: "Mousse de Chocolate", alt : "Mousse de Chocolate", descripcion : "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.", precio : "$5.500 CLP", imagen : mousseChoco},
        {nombre: "Tiramisú Clásico", alt : "Tiramisú Clásico", descripcion : "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.", precio : "$50.000 CLP", imagen : tiramisuClasico},
        {nombre: "Torta Sin Azúcar de Naranja", alt : "Torta Sin Azúcar de Naranja", descripcion : "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.", precio : "$48.000 CLP", imagen : tortaSinAzucarnaranja},
        {nombre: "Cheesecake Sin Azúcar", alt : "Cheesecake Sin Azúcar", descripcion : "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.", precio : "$47.000 CLP", imagen : cheesecakeSinAzucar}
    ]

    const productos = [
        productos1,
        productos2
    ]

    return <>
        <Nav></Nav>
        <Main showHero = {true}  productos = {productos}></Main>
        <Footer></Footer>
        </>

}

export default Home;