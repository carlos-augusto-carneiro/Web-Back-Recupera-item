
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Item(){
    const { id } = useParams()
    return(
        <div className="container-Item">
            <h1>item com id {id} aq</h1>
        </div>
    )
}

export default Item;