import React, { useState } from 'react';
import './PerfilUsuario.css';

const PerfilUsuario = ({ user, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        nome: user?.nome || '',
        email: user?.email || '',
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpar erro do campo quando usuário começar a digitar
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (formData.novaSenha) {
            if (!formData.senhaAtual) {
                newErrors.senhaAtual = 'Senha atual é obrigatória para alterar a senha';
            }
            if (formData.novaSenha.length < 6) {
                newErrors.novaSenha = 'Nova senha deve ter pelo menos 6 caracteres';
            }
            if (formData.novaSenha !== formData.confirmarSenha) {
                newErrors.confirmarSenha = 'Senhas não conferem';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            // Aqui você fará a chamada para o backend
            // const response = await updateUser(formData);
            
            // Simulação de atualização
            const updatedUser = {
                ...user,
                nome: formData.nome,
                email: formData.email
            };

            // Simular delay da API
            await new Promise(resolve => setTimeout(resolve, 1000));

            alert('Perfil atualizado com sucesso!');
            
            if (onUpdate) {
                onUpdate(updatedUser);
            }
            
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            alert('Erro ao atualizar perfil. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="perfil-overlay">
            <div className="perfil-modal">
                <div className="perfil-header">
                    <h2>Editar Perfil</h2>
                    <button 
                        className="btn-close" 
                        onClick={onClose}
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="perfil-form">
                    <div className="form-group">
                        <label htmlFor="nome">Nome Completo</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className={errors.nome ? 'error' : ''}
                        />
                        {errors.nome && <span className="error-message">{errors.nome}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>Perfil</label>
                        <input
                            type="text"
                            value={user.perfil || 'Não definido'}
                            disabled
                            className="input-disabled"
                        />
                        <small>O perfil não pode ser alterado pelo usuário</small>
                    </div>

                    <div className="senha-section">
                        <h3>Alterar Senha (Opcional)</h3>
                        
                        <div className="form-group">
                            <label htmlFor="senhaAtual">Senha Atual</label>
                            <input
                                type="password"
                                id="senhaAtual"
                                name="senhaAtual"
                                value={formData.senhaAtual}
                                onChange={handleChange}
                                className={errors.senhaAtual ? 'error' : ''}
                            />
                            {errors.senhaAtual && <span className="error-message">{errors.senhaAtual}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="novaSenha">Nova Senha</label>
                            <input
                                type="password"
                                id="novaSenha"
                                name="novaSenha"
                                value={formData.novaSenha}
                                onChange={handleChange}
                                className={errors.novaSenha ? 'error' : ''}
                            />
                            {errors.novaSenha && <span className="error-message">{errors.novaSenha}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
                            <input
                                type="password"
                                id="confirmarSenha"
                                name="confirmarSenha"
                                value={formData.confirmarSenha}
                                onChange={handleChange}
                                className={errors.confirmarSenha ? 'error' : ''}
                            />
                            {errors.confirmarSenha && <span className="error-message">{errors.confirmarSenha}</span>}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn-cancel"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="btn-save"
                            disabled={loading}
                        >
                            {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PerfilUsuario;