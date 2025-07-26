import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/itens",
    headers: {
        'Content-Type': 'multipart/form-data'
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

        const response = await apiClient.post('/adicionar', formData);
        
        console.log('Resposta do servidor:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar item:", error.response?.data || error.message);
        throw error;
    }
};