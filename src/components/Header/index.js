import "./header.css"
import { Link } from "react-router-dom";

function Header(){
    return(
        <header>
            <Link className="logo" to='/'>Meu site</Link>
            <div className="nav">
                <Link to='/achei-algo'>Achei algo</Link>
                <Link to='/perdi-algo'>Perdi algo</Link>
                <Link to='/contato'>Contato</Link>
                <Link to='/sobre'>Sobre</Link>
            </div>
        </header>
    )
}

export default Header;