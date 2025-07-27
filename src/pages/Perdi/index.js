import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listarItensNaoDevolvidos, listarItensDevolvidos, buscarItensPorNome } from "../../service/itemService";
import "./perdi.css";

function Perdi(){
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroStatus, setFiltroStatus] = useState('nao-devolvidos'); 
    const [busca, setBusca] = useState('');
    const [buscando, setBuscando] = useState(false);

    // Função para converter URL do Google Drive para acesso direto
    const getDirectGoogleDriveUrl = (url) => {
        // Verifica se a URL é válida e do Google Drive
        if (!url || !url.includes('drive.google.com')) {
            return null; 
        }
        
        // Extrai o ID do arquivo da URL
        const fileId = url.split('/d/')[1]?.split('/')[0];
        
        if (!fileId) {
            return null; // Retorna nulo se não encontrar o ID
        }
        
        // Monta a URL de acesso direto
        return `https://lh3.googleusercontent.com/d/${fileId}`;
        // ou: return `https://drive.google.com/uc?id=${fileId}`;
    };

    // Carrega os itens baseado no filtro de status
    const carregarItens = async () => {
        setLoading(true);
        try {
            let dados;
            if (filtroStatus === 'nao-devolvidos') {
                dados = await listarItensNaoDevolvidos();
            } else {
                dados = await listarItensDevolvidos();
            }
            setItens(dados);
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
            alert('Erro ao carregar lista de itens');
        } finally {
            setLoading(false);
        }
    };

    // Busca itens por nome
    const buscarItens = async () => {
        if (!busca.trim()) {
            carregarItens();
            return;
        }

        setBuscando(true);
        try {
            const dados = await buscarItensPorNome(busca.trim());
            setItens(dados);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
            alert('Erro ao buscar itens');
        } finally {
            setBuscando(false);
        }
    };

    // Efeito para carregar itens quando o filtro de status muda
    useEffect(() => {
        carregarItens();
    }, [filtroStatus]);

    // Debounce para busca por nome
    useEffect(() => {
        const timer = setTimeout(() => {
            if (busca.trim()) {
                buscarItens();
            } else {
                carregarItens();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [busca]);

    const handleFiltroChange = (novoFiltro) => {
        setFiltroStatus(novoFiltro);
        setBusca(''); // Limpar busca ao trocar filtro
    };

    // Função para lidar com erro no carregamento da imagem
    const handleImageError = (e) => {
        console.log('Erro ao carregar imagem:', e.target.src);
        // Esconder a imagem e mostrar o placeholder
        e.target.style.display = 'none';
        const container = e.target.parentElement;
        if (container && !container.querySelector('.img-placeholder')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'img-placeholder';
            placeholder.innerHTML = '<span>📷</span><span>Imagem indisponível</span>';
            container.appendChild(placeholder);
        }
    };

    return(
        <div className="container-perdi">
            <h2 className="titulo-container">
                {filtroStatus === 'nao-devolvidos' ? 'Itens Não Devolvidos' : 'Itens Devolvidos'}
            </h2>

            {/* Filtros e Busca */}
            <div className="filtros-container">
                <div className="filtros-status">
                    <button 
                        className={`btn-filtro ${filtroStatus === 'nao-devolvidos' ? 'ativo' : ''}`}
                        onClick={() => handleFiltroChange('nao-devolvidos')}
                    >
                        📋 Não Devolvidos
                    </button>
                    <button 
                        className={`btn-filtro ${filtroStatus === 'devolvidos' ? 'ativo' : ''}`}
                        onClick={() => handleFiltroChange('devolvidos')}
                    >
                        ✅ Devolvidos
                    </button>
                </div>

                <div className="busca-container">
                    <input
                        type="text"
                        placeholder="Buscar por nome do item..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="input-busca"
                    />
                    {(buscando || loading) && (
                        <div className="loading-busca">🔍</div>
                    )}
                </div>
            </div>

            {/* Lista de Itens */}
            {loading ? (
                <div className="loading">Carregando itens...</div>
            ) : (
                <>
                    {itens.length > 0 ? (
                        <ul className="lista-itens perdidos">
                            {itens.map(item => {
                                // Converte a URL do Google Drive para acesso direto
                                const imageUrl = getDirectGoogleDriveUrl(item.caminhoImagem);
                                
                                return (
                                    <li key={item.id} className="item">
                                        <div className="item-header">
                                            <h2 className="titulo-item">{item.nome}</h2>
                                            <span className={`status-badge ${item.devolvido ? 'devolvido' : 'nao-devolvido'}`}>
                                                {item.devolvido ? '✅ Devolvido' : '📋 Não Devolvido'}
                                            </span>
                                        </div>
                                        
                                        <div className="item-body">
                                            <div className="img-container">
                                                {imageUrl ? (
                                                    <img 
                                                        className="img-item" 
                                                        src={imageUrl} 
                                                        alt={item.nome}
                                                        onError={handleImageError}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="img-placeholder">
                                                        <span>📷</span>
                                                        <span>Sem imagem</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="item-info">
                                                <p className="descricao-item">{item.descricao}</p>
                                                <p className="data-item">
                                                    Adicionado em: {new Date(item.dataCriacao).toLocaleDateString('pt-BR')}
                                                </p>
                                                {item.usuario && (
                                                    <p className="usuario-item">
                                                        Por: {item.usuario.nome}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <Link className="link-item" to={`/perdidos/item/${item.id}`}>
                                            Ver Detalhes
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="sem-itens">
                            {busca ? 
                                `Nenhum item encontrado para "${busca}"` : 
                                `Nenhum item ${filtroStatus === 'nao-devolvidos' ? 'não devolvido' : 'devolvido'} encontrado`
                            }
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Perdi;