import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('Aluno');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = {
      nome,
      email,
      senha,
      perfil,
    };

    try {
      const response = await fetch('/createdUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        // Redirecionar para a página de login ou outra página
      } else {
        alert('Erro ao cadastrar usuário.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na requisição.');
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
        <div className="form-group">
          <label>Perfil:</label>
          <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
            <option value="Aluno">Aluno</option>
            <option value="Professor">Professor</option>
            <option value="Guarda">Guarda</option>
            <option value="Administrador">Administrador</option>
          </select>
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
