import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PerfilUsuario from '../../../components/PerfilUsuario';
import './PainelAluno.css';

const PainelAluno = ({ user }) => {
    const [meusItens, setMeusItens] = useState([]);
    const [estatisticas, setEstatisticas] = useState({
        itensPostados: 0,
        itensRecuperados: 0,
        itensPendentes: 0
    });
    const [showPerfil, setShowPerfil] = useState(false);
    const [userData, setUserData] = useState(user);

    useEffect(() => {
        // Aqui você carregará os dados reais do backend
        // Por enquanto, dados simulados
        setEstatisticas({
            itensPostados: 3,
            itensRecuperados: 1,
            itensPendentes: 2
        });
    }, []);

    const handleUpdateUser = (updatedUser) => {
        setUserData(updatedUser);
        // Aqui você pode atualizar o contexto global do usuário se necessário
    };

    const handleLogout = () => {
        if (window.confirm('Tem certeza que deseja sair?')) {
            // Aqui você implementaria a lógica de logout
            // Por exemplo: logout() do contexto de autenticação
            window.location.href = '/login';
        }
    };

    return (
        <div className="painel-aluno">
            {/* Header do painel */}
            <div className="painel-header">
                <h1>Painel do Aluno</h1>
                <div className="user-info">
                    <span>Bem-vindo, {user && user.nome}!</span>
                    <button 
                        onClick={() => setShowPerfil(true)}
                        className="btn-editar-perfil-header"
                        title="Editar Perfil"
                    >
                        ✏️
                    </button>
                    <button onClick={handleLogout} className="btn-logout">
                        Sair
                    </button>
                </div>
            </div>

            <div className="painel-content">
                {/* Seção de informações do usuário */}
                <div className="usuario-info">
                    <div className="usuario-avatar">
                        <div className="avatar-circle">
                            {userData?.nome ? userData.nome.charAt(0).toUpperCase() : 'U'}
                        </div>
                    </div>
                    <div className="usuario-detalhes">
                        <h2>Bem-vindo, {userData?.nome || 'Usuário'}!</h2>
                        <p className="usuario-email">{userData?.email || 'email@exemplo.com'}</p>
                        <span className="usuario-perfil">Perfil: {userData?.perfil || 'Aluno'}</span>
                    </div>
                    <button 
                        className="btn-editar-perfil"
                        onClick={() => setShowPerfil(true)}
                    >
                        ✏️ Editar Perfil
                    </button>
                </div>

                <div className="painel-stats">
                    <div className="stat-card">
                        <h3>Itens Postados</h3>
                        <span className="stat-number">{estatisticas.itensPostados}</span>
                    </div>
                    <div className="stat-card">
                        <h3>Itens Recuperados</h3>
                        <span className="stat-number">{estatisticas.itensRecuperados}</span>
                    </div>
                    <div className="stat-card">
                        <h3>Pendentes</h3>
                        <span className="stat-number">{estatisticas.itensPendentes}</span>
                    </div>
                </div>

                <div className="painel-actions">
                    <h2>Ações Rápidas</h2>
                    <div className="action-buttons">
                        <Link to="/perdidos" className="btn-action btn-primary">
                            Reportar Item Perdido
                        </Link>
                        <Link to="/achados" className="btn-action btn-secondary">
                            Ver Itens Achados
                        </Link>
                        <button className="btn-action btn-info">
                            Meus Itens
                        </button>
                    </div>
                </div>

                <div className="meus-itens">
                    <h2>Meus Itens Recentes</h2>
                    <div className="itens-lista">
                        {meusItens.length === 0 ? (
                            <div className="sem-itens">
                                <p>Você ainda não postou nenhum item.</p>
                                <Link to="/perdidos" className="btn-action btn-primary">
                                    Reportar Primeiro Item
                                </Link>
                            </div>
                        ) : (
                            meusItens.map(item => (
                                <div key={item.id} className="item-card">
                                    <h4>{item.nome}</h4>
                                    <p>Status: {item.status}</p>
                                    <p>Data: {item.data}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="info-desenvolvimento">
                    <h3>📚 Painel do Aluno</h3>
                    <p>Aqui você pode gerenciar seus itens perdidos e encontrados.</p>
                    <p>Funcionalidades em desenvolvimento...</p>
                </div>
            </div>

            {/* Modal de perfil */}
            {showPerfil && (
                <PerfilUsuario
                    user={userData}
                    onClose={() => setShowPerfil(false)}
                    onUpdate={handleUpdateUser}
                />
            )}
        </div>
    );
};

export default PainelAluno;