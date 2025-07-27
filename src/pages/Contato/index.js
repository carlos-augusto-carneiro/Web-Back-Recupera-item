import React, { useState } from "react";
import "./contato.css";

function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validação do nome
    if (nome.trim().length < 3) {
      alert("O nome deve conter pelo menos 3 caracteres.");
      return;
    }

    // Validação do e-mail
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    // Validação da mensagem
    if (mensagem.trim().length < 10) {
      alert("A mensagem deve conter pelo menos 10 caracteres.");
      return;
    }

    // Simulação de envio
    alert("Mensagem enviada com sucesso!");

    // Reset dos campos
    setNome("");
    setEmail("");
    setMensagem("");
  };

  return (
    <div className="container-contato">
      <h1>Fale Conosco</h1>
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
          <label>Mensagem:</label>
          <textarea
            rows="5"
            maxLength="500"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
}

export default Contato;
