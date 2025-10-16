import styles from "../styles/Index.module.css"


function Article(props) {

    return (
        <article className={styles.unidad}>
        <img src={props.productos.imagen} width="40%" height="50%" alt={props.productos.alt}/>
        <h2>{props.productos.nombre}</h2>
        <p>{props.productos.descripcion}</p>
        <p>{props.productos.precio}</p>
            
        </article>)

}

export default Article;