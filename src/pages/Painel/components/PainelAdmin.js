import React, { useState, useEffect } from 'react';
import PerfilUsuario from '../../../components/PerfilUsuario';

import { 
    listarUsuarios, 
    deletarUsuario, 
    promoverParaGuarda, 
    promoverParaProfessor, 
    promoverParaAluno, 
    promoverParaAdministrador 
} from '../../../service/adminService';
import './PainelAdmin.css';

const PainelAdmin = ({ user }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtro, setFiltro] = useState('');
    const [showPerfil, setShowPerfil] = useState(false);
    const [userData, setUserData] = useState(user);

    const [filtroTipo, setFiltroTipo] = useState('todos');
    const [estatisticas, setEstatisticas] = useState({
        totalUsuarios: 0,
        totalAlunos: 0,
        totalProfessores: 0,
        totalGuardas: 0,
        totalAdmins: 0
    });

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        setLoading(true);
        try {
            const dados = await listarUsuarios();
            setUsuarios(dados);
            calcularEstatisticas(dados);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            alert('Erro ao carregar usuários');
        } finally {
            setLoading(false);
        }
    };

    const calcularEstatisticas = (usuarios) => {
        const stats = {
            totalUsuarios: usuarios.length,
            totalAlunos: usuarios.filter(u => u.perfil?.toLowerCase() === 'aluno').length,
            totalProfessores: usuarios.filter(u => u.perfil?.toLowerCase() === 'professor').length,
            totalGuardas: usuarios.filter(u => u.perfil?.toLowerCase() === 'guarda').length,
            totalAdmins: usuarios.filter(u => u.perfil?.toLowerCase() === 'administrador').length
        };
        setEstatisticas(stats);
    };

    const handleLogout = () => {
        if (window.confirm('Tem certeza que deseja sair?')) {
            // Aqui você implementaria a lógica de logout
            // Por exemplo: logout() do contexto de autenticação
            window.location.href = '/login';
        }
    };

    const handleDeletarUsuario = async (email) => {
        console.log('Email recebido para deletar:', email); // Debug
        console.log('Tipo do email:', typeof email); // Debug
        
        if (!email) {
            alert('Email não informado!');
            return;
        }
        
        if (window.confirm(`Tem certeza que deseja deletar o usuário ${email}?`)) {
            try {
                console.log('Enviando para deletar:', email); // Debug
                await deletarUsuario(email);
                alert('Usuário deletado com sucesso!');
                carregarUsuarios(); // Recarrega a lista
            } catch (error) {
                console.error('Erro completo:', error); // Debug mais detalhado
                alert('Erro ao deletar usuário');
            }
        }
    };

    const handlePromoverUsuario = async (email, novoTipo) => {
        console.log('Email para promover:', email); // Debug
        console.log('Novo tipo:', novoTipo); // Debug
        
        if (!email) {
            alert('Email não informado!');
            return;
        }
        
        if (window.confirm(`Promover usuário ${email} para ${novoTipo}?`)) {
            try {
                console.log('Enviando para promover:', email, novoTipo); // Debug
                switch (novoTipo.toLowerCase()) {
                    case 'guarda':
                        await promoverParaGuarda(email);
                        break;
                    case 'professor':
                        await promoverParaProfessor(email);
                        break;
                    case 'aluno':
                        await promoverParaAluno(email);
                        break;
                    case 'administrador':
                        await promoverParaAdministrador(email);
                        break;
                    default:
                        throw new Error('Tipo inválido');
                }
                alert(`Usuário promovido para ${novoTipo} com sucesso!`);
                carregarUsuarios(); // Recarrega a lista
            } catch (error) {
                console.error('Erro completo:', error); // Debug mais detalhado
                alert(`Erro ao promover usuário para ${novoTipo}`);
            }
        }
    };

    const usuariosFiltrados = usuarios.filter(usuario => {
        const matchFiltro = usuario.nome?.toLowerCase().includes(filtro.toLowerCase()) ||
                           usuario.email?.toLowerCase().includes(filtro.toLowerCase());
        const matchTipo = filtroTipo === 'todos' || usuario.perfil?.toLowerCase() === filtroTipo;
        return matchFiltro && matchTipo;
    });

    return (
        <div className="painel-admin">
            {/* Header do painel */}
            <div className="painel-header">
                <h1>Painel Administrativo</h1>
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
                {/* Estatísticas */}
                <div className="painel-stats">
                    <div className="stat-card">
                        <h3>Total Usuários</h3>
                        <span className="stat-number">{estatisticas.totalUsuarios}</span>
                    </div>
                    <div className="stat-card">
                        <h3>Alunos</h3>
                        <span className="stat-number">{estatisticas.totalAlunos}</span>
                    </div>
                    <div className="stat-card">
                        <h3>Professores</h3>
                        <span className="stat-number">{estatisticas.totalProfessores}</span>
                    </div>
                    <div className="stat-card">
                        <h3>Guardas</h3>
                        <span className="stat-number">{estatisticas.totalGuardas}</span>
                    </div>
                    <div className="stat-card">
                        <h3>Admins</h3>
                        <span className="stat-number">{estatisticas.totalAdmins}</span>
                    </div>
                </div>

                {/* Filtros */}
                <div className="filtros-container">
                    <div className="filtro-busca">
                        <input
                            type="text"
                            placeholder="Buscar por nome ou email..."
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            className="input-filtro"
                        />
                    </div>
                    <div className="filtro-tipo">
                        <select 
                            value={filtroTipo} 
                            onChange={(e) => setFiltroTipo(e.target.value)}
                            className="select-filtro"
                        >
                            <option value="todos">Todos os tipos</option>
                            <option value="aluno">Alunos</option>
                            <option value="professor">Professores</option>
                            <option value="guarda">Guardas</option>
                            <option value="administrador">Administradores</option>
                        </select>
                    </div>
                    <button onClick={carregarUsuarios} className="btn-recarregar">
                        Recarregar
                    </button>
                </div>

                {/* Lista de Usuários */}
                <div className="usuarios-container">
                    <h2>Gerenciar Usuários ({usuariosFiltrados.length})</h2>
                    
                    {loading ? (
                        <div className="loading">Carregando usuários...</div>
                    ) : (
                        <div className="usuarios-tabela">
                            <div className="tabela-header">
                                <span>Nome</span>
                                <span>Email</span>
                                <span>Perfil</span>
                                <span>Ações</span>
                            </div>
                            
                            {usuariosFiltrados.map(usuario => (
                                <div key={usuario.id} className="tabela-row">
                                    <span className="usuario-nome">{usuario.nome}</span>
                                    <span className="usuario-email">{usuario.email}</span>
                                    <span className={`usuario-tipo tipo-${usuario.perfil?.toLowerCase()}`}>
                                        {usuario.perfil}
                                    </span>
                                    <div className="usuario-acoes">
                                        <select 
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    console.log('Select onChange - email:', usuario.email, 'valor:', e.target.value); // Debug
                                                    handlePromoverUsuario(usuario.email, e.target.value);
                                                    e.target.value = ''; // Reset select
                                                }
                                            }}
                                            className="select-promover"
                                            defaultValue=""
                                        >
                                            <option value="">Promover para...</option>
                                            <option value="Aluno">Aluno</option>
                                            <option value="Professor">Professor</option>
                                            <option value="Guarda">Guarda</option>
                                            <option value="Administrador">Administrador</option>
                                        </select>
                                        
                                        <button 
                                            onClick={() => {
                                                console.log('Button onClick - email:', usuario.email); // Debug
                                                handleDeletarUsuario(usuario.email);
                                            }}
                                            className="btn-deletar"
                                            disabled={usuario.email === user?.email} // Não pode deletar a si mesmo
                                            title={usuario.email === user?.email ? "Não é possível deletar sua própria conta" : "Deletar usuário"}
                                        >
                                            Deletar
                                        </button>
                                    </div>
                                </div>
                            ))}
                            
                            {usuariosFiltrados.length === 0 && !loading && (
                                <div className="sem-usuarios">
                                    Nenhum usuário encontrado com os filtros aplicados.
                                </div>
                            )}
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

export default PainelAdmin;