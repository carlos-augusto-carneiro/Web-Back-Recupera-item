import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { adicionarItem } from '../../service/itemService';
import './adicionar-item.css';

const AdicionarItem = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nome: '',
        descricao: ''
    });
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    // Verifica se o usuário tem permissão
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        
        const canAdd = user?.perfil && ['Administrador', 'Professor', 'Guarda'].includes(user.perfil);
        if (!canAdd) {
            alert('Você não tem permissão para adicionar itens');
            navigate('/painel');
        }
    }, [isAuthenticated, user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validar tipo de arquivo
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(selectedFile.type)) {
                alert('Por favor, selecione apenas arquivos de imagem (JPEG, PNG, GIF)');
                return;
            }
            
            // Validar tamanho (5MB máximo)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (selectedFile.size > maxSize) {
                alert('O arquivo deve ter no máximo 5MB');
                return;
            }

            setFile(selectedFile);
            
            // Criar preview da imagem
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const removeFile = () => {
        setFile(null);
        setPreviewUrl(null);
        // Limpar o input file
        const fileInput = document.getElementById('imagem');
        if (fileInput) fileInput.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            alert('Por favor, selecione uma imagem do item');
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await adicionarItem(formData, file);
            
            alert('Item adicionado com sucesso!');
            
            // Limpar formulário
            setFormData({
                nome: '',
                descricao: ''
            });
            setFile(null);
            setPreviewUrl(null);
            
            // Voltar para o painel
            navigate('/painel');
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            alert('Erro ao adicionar item: ' + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="adicionar-item-container">
            <div className="adicionar-item-content">
                <h1>Adicionar Item Encontrado</h1>
                <p className="subtitle">Registre um item que foi encontrado para ajudar seu dono a recuperá-lo</p>
                
                <form onSubmit={handleSubmit} className="adicionar-item-form">
                    <div className="form-group">
                        <label htmlFor="nome">Nome do Item *</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Ex: Celular Samsung, Carteira de couro, Chaves..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descricao">Descrição *</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            placeholder="Descreva o item detalhadamente: cor, tamanho, características especiais, local onde foi encontrado, etc..."
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imagem">Imagem do Item *</label>
                        <input
                            type="file"
                            id="imagem"
                            name="imagem"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                        <p className="file-help">
                            Formatos aceitos: JPEG, PNG, GIF. Tamanho máximo: 5MB
                        </p>
                    </div>

                    {previewUrl && (
                        <div className="image-preview">
                            <label>Preview da Imagem:</label>
                            <div className="preview-container">
                                <img src={previewUrl} alt="Preview" className="preview-image" />
                                <button 
                                    type="button" 
                                    className="btn-remove-image"
                                    onClick={removeFile}
                                >
                                    ✕ Remover
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn-cancel"
                            onClick={() => navigate('/painel')}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={loading}
                        >
                            {loading ? 'Adicionando...' : 'Adicionar Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdicionarItem;