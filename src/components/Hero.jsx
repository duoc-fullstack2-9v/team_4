
import styles from "../styles/Index.module.css"
import HeroContent from './HeroContent';
import LinksHero from './LinksHero';

function Hero(props) {
    
    return <div className={styles.hero}>
        <LinksHero isLoggedIn={props.isLoggedIn}/>
        <HeroContent/>
    </div>
}


export default Hero;