import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUsuario } from '../../service/usuarioService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './login.css';

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
                // Chama a função de login do contexto, passando o token e a expiração
                login(response.acessString, response.expiresIn);
                alert('Login bem-sucedido!');
                navigate('/perdidos');
            } else {
                alert('Token não recebido.');
            }
        } catch (error) {
            alert('Erro ao fazer login.');
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
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default Login;
