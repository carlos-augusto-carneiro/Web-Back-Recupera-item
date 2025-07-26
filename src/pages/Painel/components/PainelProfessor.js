import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PainelProfessor = ({ user }) => {
    const [meusItens, setMeusItens] = useState([]);
    const [itensSala, setItensSala] = useState([]);
    const [estatisticas, setEstatisticas] = useState({
        itensPostados: 0,
        itensRecuperados: 0,
        alunosAjudados: 0,
        itensSala: 0
    });

    useEffect(() => {
        // Aqui você carregará os dados reais do backend
        // Por enquanto, dados simulados
        setEstatisticas({
            itensPostados: 2,
            itensRecuperados: 1,
            alunosAjudados: 5,
            itensSala: 3
        });
    }, []);

    return (
        <div className="painel-professor">
            <div className="painel-stats">
                <div className="stat-card">
                    <h3>Meus Itens</h3>
                    <span className="stat-number">{estatisticas.itensPostados}</span>
                </div>
                <div className="stat-card">
                    <h3>Recuperados</h3>
                    <span className="stat-number">{estatisticas.itensRecuperados}</span>
                </div>
                <div className="stat-card">
                    <h3>Alunos Ajudados</h3>
                    <span className="stat-number">{estatisticas.alunosAjudados}</span>
                </div>
                <div className="stat-card">
                    <h3>Itens na Sala</h3>
                    <span className="stat-number">{estatisticas.itensSala}</span>
                </div>
            </div>

            <div className="painel-actions">
                <h2>Ações do Professor</h2>
                <div className="action-buttons">
                    <Link to="/perdidos" className="btn-action btn-primary">
                        Reportar Item Perdido
                    </Link>
                    <Link to="/achados" className="btn-action btn-secondary">
                        Ver Itens Achados
                    </Link>
                    <button className="btn-action btn-info">
                        Itens da Minha Sala
                    </button>
                    <button className="btn-action btn-warning">
                        Ajudar Aluno
                    </button>
                </div>
            </div>

            <div className="itens-sala">
                <h2>Itens Perdidos na Minha Sala</h2>
                <div className="itens-lista">
                    {itensSala.length === 0 ? (
                        <div className="sem-itens">
                            <p>Nenhum item perdido registrado na sua sala.</p>
                            <p>Se encontrar algum item, você pode ajudar registrando-o!</p>
                        </div>
                    ) : (
                        itensSala.map(item => (
                            <div key={item.id} className="item-card sala">
                                <h4>{item.nome}</h4>
                                <p>Encontrado em: {item.data}</p>
                                <p>Descrição: {item.descricao}</p>
                                <button className="btn-ajudar">Entregar ao Dono</button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="info-desenvolvimento">
                <h3>👨‍🏫 Painel do Professor</h3>
                <p>Gerencie seus itens e ajude alunos a recuperar objetos perdidos.</p>
                <p>Funcionalidades educacionais em desenvolvimento...</p>
            </div>
        </div>
    );
};

export default PainelProfessor;