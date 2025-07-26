import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import PainelAdmin from './components/PainelAdmin';
import PainelAluno from './components/PainelAluno';
import PainelGuarda from './components/PainelGuarda';
import PainelProfessor from './components/PainelProfessor';
import './painel.css';

const Painel = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        setLoading(false);
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="painel-container">
                <div className="loading">Carregando painel...</div>
            </div>
        );
    }

    const renderPainelByRole = () => {
        const userPerfil = user?.perfil;
        
        switch (userPerfil) {
            case 'Administrador':
                return <PainelAdmin user={user} />;
            case 'Guarda':
                return <PainelGuarda user={user} />;
            case 'Professor':
                return <PainelProfessor user={user} />;
            case 'Aluno':
                return <PainelAluno user={user} />;
            default:
                return (
                    <div className="painel-erro">
                        <h2>Acesso Negado</h2>
                        <p>Seu tipo de usuário ({userPerfil || 'Não definido'}) não tem permissão para acessar o painel.</p>
                        <button onClick={() => navigate('/perdidos')}>
                            Voltar à página inicial
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="painel-container">
            
            <main className="painel-content">
                {renderPainelByRole()}
            </main>
        </div>
    );
};

export default Painel;