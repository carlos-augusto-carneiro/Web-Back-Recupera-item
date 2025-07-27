import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://web-back-end-recupera-item.onrender.com/itens",
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Lista todos os itens não devolvidos
 * @returns {Promise<Array>} Lista de itens não devolvidos
 */
export const listarItensNaoDevolvidos = async () => {
    try {
        const response = await apiClient.get('/nao-devolvidos');
        return response.data;
    } catch (error) {
        console.error("Erro ao listar itens não devolvidos:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Lista todos os itens devolvidos
 * @returns {Promise<Array>} Lista de itens devolvidos
 */
export const listarItensDevolvidos = async () => {
    try {
        const response = await apiClient.get('/devolvidos');
        return response.data;
    } catch (error) {
        console.error("Erro ao listar itens devolvidos:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Lista todos os itens (devolvidos + não devolvidos)
 * @returns {Promise<Array>} Lista de todos os itens
 */
export const listarTodosItens = async () => {
    try {
        const [naoDevolvidos, devolvidos] = await Promise.all([
            listarItensNaoDevolvidos(),
            listarItensDevolvidos()
        ]);
        return [...naoDevolvidos, ...devolvidos];
    } catch (error) {
        console.error("Erro ao listar todos os itens:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Busca um item específico pelo ID
 * @param {number} itemId - ID do item
 * @returns {Promise<Object>} Dados do item
 */
export const buscarItemPorId = async (itemId) => {
    try {
        const response = await apiClient.get(`/${itemId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar item por ID:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Busca itens por nome
 * @param {string} nome - Nome do item a buscar
 * @returns {Promise<Array>} Lista de itens encontrados
 */
export const buscarItensPorNome = async (nome) => {
    try {
        const response = await apiClient.get(`/buscar?nome=${encodeURIComponent(nome)}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar itens por nome:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Atualiza um item existente
 * @param {number} itemId - ID do item
 * @param {Object} itemData - Dados atualizados do item
 * @returns {Promise<Object>} Item atualizado
 */
export const atualizarItem = async (itemId, itemData) => {
    try {
        const response = await apiClient.put(`/${itemId}`, itemData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar item:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Marca um item como devolvido
 * @param {number} itemId - ID do item
 * @returns {Promise<Object>} Item atualizado
 */
export const marcarItemComoDevolvido = async (itemId) => {
    try {
        const response = await apiClient.put(`/${itemId}/devolver`);
        return response.data;
    } catch (error) {
        console.error("Erro ao marcar item como devolvido:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Exclui um item
 * @param {number} itemId - ID do item
 * @returns {Promise<void>}
 */
export const excluirItem = async (itemId) => {
    try {
        const response = await apiClient.delete(`/${itemId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir item:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Adiciona um novo item ao sistema
 * @param {Object} itemData - Dados do item
 * @param {File} file - Arquivo de imagem
 * @returns {Promise<Object>} Item criado
 */
export const adicionarItem = async (itemData, file) => {
    try {
        console.log('Dados do item:', itemData);
        console.log('Arquivo:', file);

        // Criar FormData para envio multipart
        const formData = new FormData();
        
        // Adicionar o arquivo
        formData.append('file', file);
        
        // Criar o DTO conforme esperado pelo backend
        const itemDto = {
            nome: itemData.nome,
            descricao: itemData.descricao,
            devolvido: false // Sempre false para itens novos
        };
        
        // Adicionar o DTO como JSON string
        formData.append('itemDto', JSON.stringify(itemDto));
        
        console.log('FormData preparado:', {
            file: file.name,
            itemDto: JSON.stringify(itemDto)
        });

        const response = await apiClient.post('/adicionar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        console.log('Resposta do servidor:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar item:", error.response?.data || error.message);
        throw error;
    }
};