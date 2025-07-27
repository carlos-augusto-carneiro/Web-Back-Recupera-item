import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://web-back-end-recupera-item.onrender.com/admin",
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
 * Lista todos os usuários do sistema
 * @returns {Promise<Array>} Lista de usuários
 */
export const listarUsuarios = async () => {
    try {
        const response = await apiClient.get('/listarUsuarios');
        return response.data;
    } catch (error) {
        console.error("Erro ao listar usuários:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Deleta um usuário pelo email
 * @param {string} email - Email do usuário a ser deletado
 * @returns {Promise<void>}
 */
export const deletarUsuario = async (email) => {
    console.log('deletarUsuario chamado com:', email);
    
    try {
        // O backend espera um objeto com propriedade maiúscula "Email"
        const payload = { Email: email };
        console.log('Payload enviado:', payload);
        
        const response = await apiClient.delete('/deletarUsuario', {
            data: payload
        });
        
        console.log('Resposta do servidor:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar usuário:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Promove um usuário para Guarda
 * @param {string} email - Email do usuário
 * @returns {Promise<void>}
 */
export const promoverParaGuarda = async (email) => {
    try {
        const payload = { Email: email };
        console.log('Payload enviado:', payload);
        
        // Para PUT, enviamos o payload diretamente como segundo parâmetro
        const response = await apiClient.put('/promoverGuarda', payload);
        return response.data;
    } catch (error) {
        console.error("Erro ao promover para Guarda:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Promove um usuário para Professor
 * @param {string} email - Email do usuário
 * @returns {Promise<void>}
 */
export const promoverParaProfessor = async (email) => {
    try {
        const payload = { Email: email };
        console.log('Payload enviado:', payload);
        
        // Para PUT, enviamos o payload diretamente como segundo parâmetro
        const response = await apiClient.put('/promoverProfessor', payload);
        return response.data;
    } catch (error) {
        console.error("Erro ao promover para Professor:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Promove um usuário para Aluno
 * @param {string} email - Email do usuário
 * @returns {Promise<void>}
 */
export const promoverParaAluno = async (email) => {
    try {
        const payload = { Email: email };
        console.log('Payload enviado:', payload);
        
        // Para PUT, enviamos o payload diretamente como segundo parâmetro
        const response = await apiClient.put('/promoverAluno', payload);
        return response.data;
    } catch (error) {
        console.error("Erro ao promover para Aluno:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Promove um usuário para Administrador
 * @param {string} email - Email do usuário
 * @returns {Promise<void>}
 */
export const promoverParaAdministrador = async (email) => {
    try {
        const payload = { Email: email };
        console.log('Payload enviado:', payload);
        
        // Para PUT, enviamos o payload diretamente como segundo parâmetro
        const response = await apiClient.put('/promoverAdministrador', payload);
        return response.data;
    } catch (error) {
        console.error("Erro ao promover para Administrador:", error.response?.data || error.message);
        throw error;
    }
};