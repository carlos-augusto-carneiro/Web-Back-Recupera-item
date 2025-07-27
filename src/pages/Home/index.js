import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSearch, faHandsHelping, faShieldAlt, faUsers, faCheckCircle, faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function Home() {
    const [stats, setStats] = useState({
        itensRecuperados: 247,
        usuariosAtivos: 1523,
        itensEncontrados: 89
    });

    useEffect(() => {
        // Animação dos números (simulação)
        const timer = setTimeout(() => {
            setStats({
                itensRecuperados: 247,
                usuariosAtivos: 1523,
                itensEncontrados: 89
            });
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container-home">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Recupere seus <span className="highlight">Itens Perdidos</span>
                    </h1>
                    <p className="hero-subtitle">
                        Sistema inteligente de recuperação de objetos perdidos e achados. 
                        Conectamos pessoas e facilitamos o reencontro com seus pertences.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/perdidos" className="btn-primary">
                            <FontAwesomeIcon icon={faSearch} />
                            Procurar Itens
                        </Link>
                    </div>
                </div>
                
                <div className="hero-visual">
                    <div className="floating-cards">
                        <div className="card-item card-1">
                            📱 Celular encontrado
                        </div>
                        <div className="card-item card-2">
                            🎒 Mochila azul
                        </div>
                        <div className="card-item card-3">
                            🔑 Chaves do carro
                        </div>
                    </div>
                </div>

                <div className="scroll-indicator">
                    <FontAwesomeIcon icon={faChevronDown} className="scroll-arrow" />
                </div>
            </section>

            {/* Statistics Section */}
            <section className="stats-section">
                <div className="container">
                    <h2 className="section-title">Nossos Números</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </div>
                            <div className="stat-number">{stats.itensRecuperados}</div>
                            <div className="stat-label">Itens Recuperados</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <FontAwesomeIcon icon={faUsers} />
                            </div>
                            <div className="stat-number">{stats.usuariosAtivos}</div>
                            <div className="stat-label">Usuários Ativos</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            <div className="stat-number">{stats.itensEncontrados}</div>
                            <div className="stat-label">Aguardando Dono</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="how-it-works">
                <div className="container">
                    <h2 className="section-title">Como Funciona</h2>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Reporte o Item</h3>
                            <p>Perdeu algo? Cadastre seu item perdido com descrição detalhada e foto.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Busque na Base</h3>
                            <p>Explore nossa base de itens encontrados usando filtros inteligentes.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Conecte-se</h3>
                            <p>Encontrou seu item? Entre em contato e organize a devolução.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">4</div>
                            <h3>Recupere</h3>
                            <p>Retire seu item com segurança através do nosso sistema verificado.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="features-content">
                        <div className="features-text">
                            <h2>Por que usar nosso sistema?</h2>
                            <div className="feature-list">
                                <div className="feature-item">
                                    <FontAwesomeIcon icon={faShieldAlt} className="feature-icon" />
                                    <div>
                                        <h4>Seguro e Confiável</h4>
                                        <p>Sistema verificado com controle de acesso e histórico completo.</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="feature-icon" />
                                    <div>
                                        <h4>Localização Precisa</h4>
                                        <p>Registre onde o item foi perdido ou encontrado para facilitar a busca.</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <FontAwesomeIcon icon={faUsers} className="feature-icon" />
                                    <div>
                                        <h4>Comunidade Ativa</h4>
                                        <p>Milhares de usuários ajudando uns aos outros a recuperar seus pertences.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="features-visual">
                            <div className="feature-graphic">
                                🔍📱💼🎒⌚🔑
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Pronto para começar?</h2>
                        <p>Junte-se à nossa comunidade e ajude a reunir pessoas com seus pertences perdidos.</p>
                        <div className="cta-buttons">
                            <Link to="/cadastro" className="btn-primary">
                                Criar Conta Grátis
                            </Link>
                            <Link to="/perdidos" className="btn-outline">
                                Explorar Itens
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Info */}
            <section className="footer-info">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4>Sistema Recupera Item</h4>
                            <p>Conectando pessoas aos seus pertences perdidos através da tecnologia e colaboração.</p>
                        </div>
                        <div className="footer-section">
                            <h4>Links Rápidos</h4>
                            <ul>
                                <li><Link to="/perdidos">Itens Perdidos</Link></li>
                                <li><Link to="/achados">Itens Encontrados</Link></li>
                                <li><Link to="/login">Entrar</Link></li>
                                <li><Link to="/register">Cadastrar</Link></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Suporte</h4>
                            <p>📧 suporte@recuperaitem.com</p>
                            <p>📞 (11) 9999-9999</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
