import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../firebaseConnection";
import { getDoc, doc } from "firebase/firestore";


function Home() {

    useEffect(()=>{
        async function buscarItens() {
            console.log("puxando bd")
        }
        buscarItens();
    }, [])

    return (
        <div className="container-home">
            <h2 className="titulo-container">Lista de achados e perdidos</h2>
            <ul className="lista-itens">
                <li className="item">
                    <h2 className="titulo-item">Titulo</h2>
                    <img className="img-item" src="https://img.ltwebstatic.com/images3_spmp/2024/01/19/af/1705668348233005894be89036997dcbe6d65ce58f_thumbnail_144x.webp" alt="aq"/>
                    <Link className="link-item" to={`item/132`}>Acessar</Link>
                </li>

                 <li className="item">
                    <h2 className="titulo-item">Titulo</h2>
                    <img className="img-item"  src="https://static.netshoes.com.br/produtos/mochila-adidas-classica-logo-linear-2275l/06/FBA-3306-006/FBA-3306-006_zoom1.jpg?ts=1744302989&ims=326x" alt="aq"/>
                    <Link className="link-item" to={`item/132`}>Acessar</Link>
                </li>
                 <li className="item">
                    <h2 className="titulo-item">Titulo</h2>
                    <img className="img-item" src="https://img.ltwebstatic.com/images3_spmp/2024/01/19/af/1705668348233005894be89036997dcbe6d65ce58f_thumbnail_144x.webp" alt="aq"/>
                    <Link className="link-item" to={`item/132`}>Acessar</Link>
                </li>

                 <li className="item">
                    <h2 className="titulo-item">Titulo</h2>
                    <img className="img-item"  src="https://static.netshoes.com.br/produtos/mochila-adidas-classica-logo-linear-2275l/06/FBA-3306-006/FBA-3306-006_zoom1.jpg?ts=1744302989&ims=326x" alt="aq"/>
                    <Link className="link-item" to={`item/132`}>Acessar</Link>
                </li>
            </ul>
        </div>
    );
}

export default Home;
