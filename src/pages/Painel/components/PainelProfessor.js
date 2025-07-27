import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { listarTodosItens, excluirItem } from '../../../service/itemService';
import PerfilUsuario from '../../../components/PerfilUsuario';
import './PainelProfessor.css';

const PainelProfessor = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroStatus, setFiltroStatus] = useState('todos');
    const [busca, setBusca] = useState('');
    const [showPerfil, setShowPerfil] = useState(false);
    const [userData, setUserData] = useState(user);

    // Verifica autenticação e permissão
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        
        if (!user || user.perfil !== 'Professor') {
            alert('Você não tem permissão para acessar esta página');
            navigate('/painel');
        }
    }, [isAuthenticated, user, navigate]);

    // Atualizar userData quando user mudar
    useEffect(() => {
        setUserData(user);
    }, [user]);

    // Carrega a lista de itens
    const carregarItens = async () => {
        setLoading(true);
        try {
            const dados = await listarTodosItens();
            setItens(dados);
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
            alert('Erro ao carregar lista de itens');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarItens();
    }, []);

    // Filtrar itens baseado no status e busca
    const itensFiltrados = itens.filter(item => {
        const matchStatus = filtroStatus === 'todos' || 
                           (filtroStatus === 'devolvidos' && item.devolvido) ||
                           (filtroStatus === 'nao-devolvidos' && !item.devolvido);
        
        const matchBusca = !busca || 
                          item.nome.toLowerCase().includes(busca.toLowerCase()) ||
                          item.descricao.toLowerCase().includes(busca.toLowerCase());
        
        return matchStatus && matchBusca;
    });

    const handleExcluirItem = async (itemId, nomeItem) => {
        if (!window.confirm(`Tem certeza que deseja excluir o item "${nomeItem}"?`)) {
            return;
        }

        try {
            await excluirItem(itemId);
            alert('Item excluído com sucesso!');
            // Recarregar a lista
            carregarItens();
        } catch (error) {
            console.error('Erro ao excluir item:', error);
            alert('Erro ao excluir item: ' + (error.response && error.response.data ? error.response.data : error.message));
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="painel-container">
                <div className="loading">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="painel-container">
            <header className="painel-header">
                <h1>Painel do Professor</h1>
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
            </header>

            <div className="painel-content">
                <div className="actions-section">
                    <Link to="/adicionar-item" className="btn-primary">
                        + Adicionar Item Encontrado
                    </Link>
                    <Link to="/perdidos" className="btn-secondary">
                        Ver Itens Perdidos
                    </Link>
                </div>

                <div className="itens-section">
                    <div className="section-header">
                        <h2>Gerenciar Itens</h2>
                        
                        <div className="filtros-container">
                            <div className="filtro-status">
                                <select 
                                    value={filtroStatus} 
                                    onChange={(e) => setFiltroStatus(e.target.value)}
                                    className="select-filtro"
                                >
                                    <option value="todos">Todos os Status</option>
                                    <option value="nao-devolvidos">Não Devolvidos</option>
                                    <option value="devolvidos">Devolvidos</option>
                                </select>
                            </div>
                            
                            <div className="busca-container">
                                <input
                                    type="text"
                                    placeholder="Buscar itens..."
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    className="input-busca"
                                />
                            </div>
                        </div>
                    </div>

                    {itensFiltrados.length > 0 ? (
                        <div className="tabela-container">
                            <table className="tabela-itens">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                        <th>Cadastrado por</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itensFiltrados.map(item => (
                                        <tr key={item.id}>
                                            <td className="nome-item">{item.nome}</td>
                                            <td className="descricao-item">
                                                {item.descricao.length > 50 
                                                    ? item.descricao.substring(0, 50) + '...' 
                                                    : item.descricao
                                                }
                                            </td>
                                            <td>
                                                <span className={`status-badge ${item.devolvido ? 'devolvido' : 'nao-devolvido'}`}>
                                                    {item.devolvido ? 'Devolvido' : 'Não Devolvido'}
                                                </span>
                                            </td>
                                            <td>{new Date(item.dataCriacao).toLocaleDateString('pt-BR')}</td>
                                            <td>{item.usuario ? item.usuario.nome : 'N/A'}</td>
                                            <td className="acoes-cell">
                                                <Link 
                                                    to={`/perdidos/item/${item.id}`}
                                                    className="btn-visualizar"
                                                    title="Visualizar item"
                                                >
                                                    👁️
                                                </Link>
                                                <button 
                                                    onClick={() => handleExcluirItem(item.id, item.nome)}
                                                    className="btn-excluir"
                                                    title="Excluir item"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="sem-itens">
                            {busca ? 
                                `Nenhum item encontrado para "${busca}"` : 
                                'Nenhum item encontrado'
                            }
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de perfil */}
            {showPerfil && (
                <PerfilUsuario
                    user={userData}
                    onClose={() => setShowPerfil(false)}
                    onUpdate={setUserData}
                />
            )}
        </div>
    );
};

export default PainelProfessor;