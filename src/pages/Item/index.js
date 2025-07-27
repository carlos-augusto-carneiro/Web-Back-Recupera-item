import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import { buscarItemPorId, atualizarItem, marcarItemComoDevolvido } from '../../service/itemService';
import "./item.css";

function Item(){
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: ''
    });
    const [salvando, setSalvando] = useState(false);

    // Função para converter URL do Google Drive para acesso direto
    const getDirectGoogleDriveUrl = (url) => {
        if (!url || !url.includes('drive.google.com')) {
            return null; 
        }
        
        const fileIdMatch = url.split('/d/')[1];
        if (!fileIdMatch) {
            return null;
        }
        
        const fileId = fileIdMatch.split('/')[0];
        if (!fileId) {
            return null;
        }
        
        return `https://lh3.googleusercontent.com/d/${fileId}`;
    };

    // Verifica se o usuário tem permissão para editar
    const podeEditar = () => {
        return isAuthenticated && user && user.perfil && 
               ['Administrador', 'Professor', 'Guarda'].includes(user.perfil);
    };

    // Carrega os dados do item
    const carregarItem = async () => {
        setLoading(true);
        try {
            const dados = await buscarItemPorId(id);
            setItem(dados);
            setFormData({
                nome: dados.nome || '',
                descricao: dados.descricao || ''
            });
        } catch (error) {
            console.error('Erro ao carregar item:', error);
            alert('Erro ao carregar item. Talvez ele não exista ou você não tenha permissão.');
            navigate('/perdidos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            carregarItem();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSalvar = async () => {
        if (!formData.nome.trim() || !formData.descricao.trim()) {
            alert('Nome e descrição são obrigatórios');
            return;
        }

        setSalvando(true);
        try {
            const itemAtualizado = await atualizarItem(id, {
                nome: formData.nome.trim(),
                descricao: formData.descricao.trim()
            });
            
            setItem(itemAtualizado);
            setEditando(false);
            alert('Item atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
            alert('Erro ao atualizar item: ' + (error.response && error.response.data ? error.response.data : error.message));
        } finally {
            setSalvando(false);
        }
    };

    const handleMarcarComoDevolvido = async () => {
        if (!window.confirm('Tem certeza que deseja marcar este item como devolvido?')) {
            return;
        }

        try {
            const itemAtualizado = await marcarItemComoDevolvido(id);
            setItem(itemAtualizado);
            alert('Item marcado como devolvido com sucesso!');
        } catch (error) {
            console.error('Erro ao marcar item como devolvido:', error);
            alert('Erro ao marcar item como devolvido: ' + (error.response && error.response.data ? error.response.data : error.message));
        }
    };

    const handleCancelarEdicao = () => {
        setFormData({
            nome: item.nome || '',
            descricao: item.descricao || ''
        });
        setEditando(false);
    };

    const handleImageError = (e) => {
        console.log('Erro ao carregar imagem:', e.target.src);
        e.target.style.display = 'none';
        const nextElement = e.target.nextElementSibling;
        if (nextElement && nextElement.style) {
            nextElement.style.display = 'flex';
        }
    };

    if (loading) {
        return (
            <div className="container-item">
                <div className="loading">Carregando item...</div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="container-item">
                <div className="erro">Item não encontrado</div>
                <Link to="/perdidos" className="btn-voltar">Voltar para Lista</Link>
            </div>
        );
    }

    const imageUrl = getDirectGoogleDriveUrl(item.caminhoImagem);

    return(
        <div className="container-item">
            <div className="item-header">
                <Link to="/perdidos" className="btn-voltar">← Voltar</Link>
                <div className="item-status">
                    <span className={`status-badge ${item.devolvido ? 'devolvido' : 'nao-devolvido'}`}>
                        {item.devolvido ? '✅ Devolvido' : '📋 Não Devolvido'}
                    </span>
                </div>
            </div>

            <div className="item-content">
                <div className="item-imagem-section">
                    <div className="item-imagem-container">
                        {imageUrl ? (
                            <img 
                                src={imageUrl} 
                                alt={item.nome}
                                className="item-imagem"
                                onError={handleImageError}
                            />
                        ) : null}
                        <div className="imagem-placeholder" style={{display: imageUrl ? 'none' : 'flex'}}>
                            <span>📷</span>
                            <span>Sem imagem disponível</span>
                        </div>
                    </div>
                </div>

                <div className="item-info-section">
                    {editando ? (
                        <div className="item-form">
                            <div className="form-group">
                                <label htmlFor="nome">Nome do Item:</label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="descricao">Descrição:</label>
                                <textarea
                                    id="descricao"
                                    name="descricao"
                                    value={formData.descricao}
                                    onChange={handleChange}
                                    rows="6"
                                    className="form-textarea"
                                />
                            </div>

                            <div className="form-actions">
                                <button 
                                    onClick={handleCancelarEdicao}
                                    className="btn-cancelar"
                                    disabled={salvando}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleSalvar}
                                    className="btn-salvar"
                                    disabled={salvando}
                                >
                                    {salvando ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="item-details">
                            <h1 className="item-titulo">{item.nome}</h1>
                            
                            <div className="item-meta">
                                <p className="item-data">
                                    <strong>Adicionado em:</strong> {new Date(item.dataCriacao).toLocaleDateString('pt-BR')}
                                </p>
                                {item.usuario && (
                                    <p className="item-usuario">
                                        <strong>Cadastrado por:</strong> {item.usuario.nome}
                                        {item.usuario.perfil && (
                                            <span className="usuario-perfil"> ({item.usuario.perfil})</span>
                                        )}
                                    </p>
                                )}
                            </div>

                            <div className="item-descricao">
                                <h3>Descrição:</h3>
                                <p>{item.descricao}</p>
                            </div>

                            {podeEditar() && (
                                <div className="item-actions">
                                    <button 
                                        onClick={() => setEditando(true)}
                                        className="btn-editar"
                                    >
                                        ✏️ Editar Item
                                    </button>
                                    {!item.devolvido && (
                                        <button 
                                            onClick={handleMarcarComoDevolvido}
                                            className="btn-devolver"
                                        >
                                            ✅ Marcar como Devolvido
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Item;