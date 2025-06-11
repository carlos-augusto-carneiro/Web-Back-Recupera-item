import { Link } from "react-router-dom";
import './footer.css'

function Footer(){
    return(
        <footer>
            <Link to='/contato'>Contato</Link>
            <Link to='/sobre'>Sobre</Link>
        </footer>
    )
}

export default Footer;