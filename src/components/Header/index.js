import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import "./header.css"

function Header(){
    const { isAuthenticated, user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Fecha o dropdown quando clica fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handlePainelClick = () => {
        setDropdownOpen(false);
        navigate('/painel');
    };

    // Verifica se o usuário tem permissão para adicionar itens
    const canAddItems = user?.perfil && ['Administrador', 'Professor', 'Guarda'].includes(user.perfil);

    return(
        <header>
            <Link className="logo" to='/'>Recupera Item</Link>
            <div className="nav">
                <Link to='/achados'>Achados</Link>
                <Link to='/perdidos'>Perdidos</Link>

                {isAuthenticated ? (
                    <>
                        {canAddItems && (
                            <Link to='/adicionar-item'>Adicionar Item</Link>
                        )}
                        <div className="user-menu" ref={dropdownRef}>
                            <button 
                                className="user-button" 
                                onClick={toggleDropdown}
                                aria-expanded={dropdownOpen}
                            >
                                <span className="user-role">({user?.perfil})</span>
                                <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
                            </button>
                            
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <button 
                                        className="dropdown-item"
                                        onClick={handlePainelClick}
                                    >
                                        🏠 Painel
                                    </button>
                                    
                                    <div className="dropdown-divider"></div>
                                    
                                    <button 
                                        className="dropdown-item logout"
                                        onClick={handleLogout}
                                    >
                                        🚪 Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/cadastro'>Cadastro</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header;