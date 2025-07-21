import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Item from './pages/Item';
import Erro from './components/Erro';
import Perdi from './pages/Perdi'
import Achei from './pages/Achei'
import Footer from './components/Footer';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/sobre" element={<Sobre/>}/>
                <Route path="/contato" element={<Contato/>}/>
                <Route path="/achados/item/:id" element={<Item />} />
                <Route path="/perdidos/item/:id" element={<Item />} />
                <Route path="/achados" element={<Achei/>}/>
                <Route path="/perdidos" element={<Perdi/>}/>

                <Route path="*" element={<Erro/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default RoutesApp;