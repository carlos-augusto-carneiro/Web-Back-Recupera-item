import { Link } from "react-router-dom";

function Erro(){
    return(
        <div>
            <h1>404</h1>
            <div>
                <h2>Página não encontrada</h2>
                <Link to='/'>Veja nossa Home</Link>
            </div>
        </div>
    )
}

export default Erro;