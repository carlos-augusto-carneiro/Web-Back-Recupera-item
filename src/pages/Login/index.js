import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUsuario } from '../../service/usuarioService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './login.css';

// Função para decodificar JWT
const decodeJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUsuario({ email, senha });

            if (response.acessString) {
                // Decodifica o token para extrair o perfil
                const decodedToken = decodeJWT(response.acessString);
                
                if (decodedToken) {
                    // Chama a função de login do contexto
                    login(response.acessString, response.expiresIn);
                    alert('Login bem-sucedido!');
                    
                    // Redireciona baseado no perfil do usuário
                    const perfil = decodedToken.perfil;
                    console.log('Perfil do usuário:', perfil); // Para debug
                    
                    switch (perfil) {
                        case 'Administrador':
                            navigate('/painel');
                            break;
                        case 'Guarda':
                            navigate('/painel');
                            break;
                        case 'Professor':
                            navigate('/painel');
                            break;
                        case 'Aluno':
                        default:
                            navigate('/perdidos');
                            break;
                    }
                } else {
                    alert('Erro ao processar dados do usuário.');
                }
            } else {
                alert('Token não recebido.');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem uma conta? <Link to="/cadastre-se">Cadastre-se</Link>
      </p>
      <p>
        Esqueceu a senha? <Link to="/esqueci-senha">Recupere sua senha</Link>
      </p>
    </div>
  );
};

export default Login;
