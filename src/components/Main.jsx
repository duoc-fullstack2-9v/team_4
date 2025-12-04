
import Hero from "./Hero"
import ListaProductos from "./ListaProductos"

function Main(props) {

    // Dividir los productos en grupos de 4
    const productosAgrupados = [];
    for (let i = 0; i < props.productos.length; i += 4) {
        productosAgrupados.push(props.productos.slice(i, i + 4));
    }

    return (<main>
        {props.showHero && <Hero isLoggedIn={props.isLoggedIn} />}
        <ListaProductos productos={props.productos}></ListaProductos>

    </main>);



}

export default Main;