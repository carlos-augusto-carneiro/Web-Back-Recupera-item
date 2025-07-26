import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RecuperarSenha } from '../../service/usuarioService'; 

const EsqueciSenha = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await RecuperarSenha(email);
            alert('Instruções para recuperação de senha enviadas para o seu e-mail.');
            
            setEmail('');
        } catch (error) {
            alert('Erro ao recuperar senha. Verifique o console.');
        }
    };

    return (
        <div className="cadastro-container">
            <h1>Esqueci minha senha</h1>
            <p>Digite seu e-mail para receber instruções de recuperação de senha.</p>
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
                <button type="submit">Recuperar Senha</button>
            </form>
            <p>
                Lembrou da senha? <Link to="/login">Faça login</Link>
            </p>
        </div>
    );
}

export default EsqueciSenha;