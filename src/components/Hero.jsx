import { Link, NavLink } from 'react-router-dom';
import pasteleria from "../assets/ded249ac27d6056cd3d951830b0cbdf1.jpg"
import styles from "../styles/Index.module.css"

function Hero() {
    
    return <div className={styles.hero}>
        <ul className={styles.hero_links}>
            <li><a href="/login">Inicio de Sesion</a></li>
            <li><a href="/registro">Registro</a> |</li>
        </ul>
        <div className="hero_content">
            <div className={styles.contenedor_cuadrado}>
                <div className={styles.cuadrado_principal}>
                    <div className={styles.primera_mitad}>
                        <h1>Pasteleria Mil Sabores</h1>
                        <p style={{ margin: "10px" }}>Somos una pasteleria que ofrece experiencias dulces y memorables a traves de nuestros productos de reposteria de la mas alta calidad para todo tipo de ocasiones minetras fomentamos nuestras raices historicas y creatividad</p>
                        <NavLink to="/productos" className={styles.btn}>Ver Productos</NavLink>
                    </div>
                    <img src={pasteleria} width="40%" height="100%" alt="Pasteleria" />
                </div>
            </div>
        </div>
    </div>
}


export default Hero;