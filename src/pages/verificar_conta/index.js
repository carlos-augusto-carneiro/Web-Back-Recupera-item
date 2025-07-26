import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { confirmarEmailComToken } from '../../service/usuarioService';

const ConfirmarEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('aguardando'); // aguardando, verificando, sucesso, erro
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
            setStatus('aguardando');
        } else {
            setStatus('erro');
        }
    }, [searchParams]);

    const confirmarToken = async () => {
        if (!token) {
            setStatus('erro');
            return;
        }

        setStatus('verificando');
        
        try {
            console.log('Confirmando token:', token);
            await confirmarEmailComToken(token);
            setStatus('sucesso');
            
            // Redireciona para login após 3 segundos
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('Erro ao confirmar email:', error);
            setStatus('erro');
        }
    };

    return (
        <div className="cadastro-container">
            {status === 'aguardando' && (
                <div>
                    <h1>Confirmar E-mail</h1>
                    <p>Clique no botão abaixo para confirmar seu e-mail:</p>
                    <button onClick={confirmarToken}>
                        Confirmar Email
                    </button>
                </div>
            )}

            {status === 'verificando' && (
                <div>
                    <h1>Verificando...</h1>
                    <p>Confirmando seu e-mail, aguarde...</p>
                </div>
            )}
            
            {status === 'sucesso' && (
                <div>
                    <h1>E-mail Confirmado!</h1>
                    <p>Seu e-mail foi confirmado com sucesso!</p>
                    <p>Você será redirecionado para o login em alguns segundos...</p>
                </div>
            )}
            
            {status === 'erro' && (
                <div>
                    <h1>Erro na Confirmação</h1>
                    <p>Não foi possível confirmar seu e-mail. Token inválido ou expirado.</p>
                    <button onClick={() => navigate('/login')}>
                        Voltar ao Login
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConfirmarEmail;