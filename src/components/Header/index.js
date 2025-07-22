import "./header.css"
import { Link } from "react-router-dom";

function Header(){
    return(
        <header>
            <Link className="logo" to='/'>Meu site</Link>
            <div className="nav">
                <Link to='/achados'>Achados</Link>
                <Link to='/perdidos'>Perdidos</Link>
                <Link to='/login'>Login</Link>
                <Link to='/cadastro'>Cadastro</Link>
            </div>
        </header>
    )
}

export default Header;