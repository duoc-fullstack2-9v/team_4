
import Hero from "./Hero"
import ListaProductos from "./ListaProductos"

function Main(props) {
    return (<main>
        {props.showHero && <Hero/>}
        {props.productos.map((item, index) =>(
            <ListaProductos key = {index} productos = {item}></ListaProductos>
        ))}

    </main>);



}

export default Main;