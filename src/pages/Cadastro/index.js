import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cadastrarUsuario } from '../../service/usuarioService'; 
import './cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = {
      nome,
      email,
      senha,
    };

    try {
        // AQUI, ele CHAMA a função que foi importada do serviço
        await cadastrarUsuario(usuario);
        alert('Usuário cadastrado com sucesso!');
        // Limpa o formulário
        setNome('');
        setEmail('');
        setSenha('');
    } catch (error) {
        alert('Erro ao cadastrar usuário. Verifique o console.');
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
};

export default Cadastro;
