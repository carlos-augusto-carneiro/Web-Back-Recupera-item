import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Item from './pages/Item';
import Erro from './components/Erro';
import Perdi from './pages/Perdi'
import Achei from './pages/Achei'

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/sobre" element={<Sobre/>}/>
                <Route path="/contato" element={<Contato/>}/>
                <Route path="/item/:id" element={<Item/>}/>
                <Route path="/achei-algo" element={<Achei/>}/>
                <Route path="/perdi-algo" element={<Perdi/>}/>

                <Route path="*" element={<Erro/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;