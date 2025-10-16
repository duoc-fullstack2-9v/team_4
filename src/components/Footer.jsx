import styles from "../styles/Index.module.css"

function Footer() {
    return <footer>
        <div className= {styles.footer}>
            <div className="side_name">
                <p>Tienda de Reposteria 'Pasteleria Mil Sabores'</p>
                <a>Tortas Cuadradas</a>
                <a>Tortas Circulares</a>
                <a>Postres Individuales</a>
                <a>Productos Sin Azucar</a>
                <a>Pasteleria Tradicional</a>
                <a>Producto Sin Gluten</a>
                <a>Productos Veganos</a>
                <a>Tortas Especiales</a>
                <p>Contactenos a este numero +56 952367087</p>
            </div>
        </div>
    </footer>
}

export default Footer;