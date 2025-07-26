import React, { useState, useEffect } from 'react';

const PainelGuarda = ({ user }) => {
    const [itensPendentes, setItensPendentes] = useState([]);
    const [estatisticas, setEstatisticas] = useState({
        itensHoje: 0,
        itensPendentes: 0,
        itensEntregues: 0,
        itensRegistrados: 0
    });

    useEffect(() => {
        // Aqui você carregará os dados reais do backend
        // Por enquanto, dados simulados
        setEstatisticas({
            itensHoje: 5,
            itensPendentes: 8,
            itensEntregues: 25,
            itensRegistrados: 12
        });
    }, []);

    return (
        <div className="painel-guarda">
            <div className="painel-stats">
                <div className="stat-card">
                    <h3>Itens Hoje</h3>
                    <span className="stat-number">{estatisticas.itensHoje}</span>
                </div>
                <div className="stat-card">
                    <h3>Pendentes</h3>
                    <span className="stat-number">{estatisticas.itensPendentes}</span>
                </div>
                <div className="stat-card">
                    <h3>Entregues</h3>
                    <span className="stat-number">{estatisticas.itensEntregues}</span>
                </div>
                <div className="stat-card">
                    <h3>Registrados</h3>
                    <span className="stat-number">{estatisticas.itensRegistrados}</span>
                </div>
            </div>

            <div className="painel-actions">
                <h2>Ações do Guarda</h2>
                <div className="action-buttons">
                    <button className="btn-action btn-primary">
                        Registrar Item Encontrado
                    </button>
                    <button className="btn-action btn-secondary">
                        Confirmar Entrega
                    </button>
                    <button className="btn-action btn-warning">
                        Gerar Relatório Diário
                    </button>
                    <button className="btn-action btn-info">
                        Verificar Documentos
                    </button>
                </div>
            </div>

            <div className="itens-pendentes">
                <h2>Itens Pendentes de Entrega</h2>
                <div className="itens-lista">
                    {itensPendentes.length === 0 ? (
                        <div className="sem-itens">
                            <p>Nenhum item pendente de entrega no momento.</p>
                            <p>✅ Parabéns! Tudo em dia.</p>
                        </div>
                    ) : (
                        itensPendentes.map(item => (
                            <div key={item.id} className="item-card pendente">
                                <h4>{item.nome}</h4>
                                <p>Dono: {item.dono}</p>
                                <p>Data: {item.data}</p>
                                <p>Local: {item.local}</p>
                                <button className="btn-entregar">Confirmar Entrega</button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="info-desenvolvimento">
                <h3>🛡️ Painel do Guarda</h3>
                <p>Controle total sobre itens perdidos e achados da instituição.</p>
                <p>Funcionalidades específicas em desenvolvimento...</p>
            </div>
        </div>
    );
};

export default PainelGuarda;