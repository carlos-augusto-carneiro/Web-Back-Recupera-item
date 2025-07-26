import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { AtualizarSenha } from '../../service/usuarioService';

const RedefinirSenha = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [token, setToken] = useState(null);
    const [status, setStatus] = useState('aguardando'); // aguardando, carregando, sucesso, erro

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
            setStatus('aguardando');
        } else {
            setStatus('erro');
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar se as senhas coincidem
        if (novaSenha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        // Validar se a senha tem pelo menos 6 caracteres
        if (novaSenha.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres!');
            return;
        }

        if (!token) {
            alert('Token inválido!');
            return;
        }

        setStatus('carregando');

        try {
            await AtualizarSenha(token, novaSenha);
            setStatus('sucesso');
            alert('Senha redefinida com sucesso!');
            
            // Redireciona para login após 2 segundos
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            setStatus('erro');
            alert('Erro ao redefinir senha. Token pode estar expirado.');
        }
    };

    if (status === 'erro' && !token) {
        return (
            <div className="cadastro-container">
                <h1>Erro</h1>
                <p>Link inválido ou token não encontrado.</p>
                <Link to="/esqueci-senha">Solicitar nova recuperação</Link>
            </div>
        );
    }

    return (
        <div className="cadastro-container">
            <h1>Redefinir Senha</h1>
            <p>Digite sua nova senha abaixo:</p>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nova Senha:</label>
                    <input
                        type="password"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        required
                        minLength={6}
                        disabled={status === 'carregando'}
                    />
                </div>
                
                <div className="form-group">
                    <label>Confirmar Nova Senha:</label>
                    <input
                        type="password"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        required
                        minLength={6}
                        disabled={status === 'carregando'}
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={status === 'carregando'}
                >
                    {status === 'carregando' ? 'Redefinindo...' : 'Redefinir Senha'}
                </button>
            </form>
            
            <p>
                Lembrou da senha? <Link to="/login">Faça login</Link>
            </p>
        </div>
    );
};

export default RedefinirSenha;