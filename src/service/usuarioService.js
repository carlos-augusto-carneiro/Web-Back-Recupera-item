import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/usuario", // URL base da sua API
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
    (config) => {
        // Pega o token do localStorage
        const token = localStorage.getItem('authToken');

        // Se o token existir, adiciona ao cabeçalho Authorization
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
 * Cria um novo usuário no banco de dados.
 * @param {object} dadosUsuario - Objeto com nome, email, senha, etc.
 * @returns {Promise<object>} O usuário criado.
 */
export const cadastrarUsuario = async (dadosUsuario) => {
    try {
        // Endpoint: POST /usuarios
        const response = await apiClient.post('/createdUser', dadosUsuario);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Cria um novo usuário no banco de dados.
 * @param {object} loginData - Objeto com nome, email, senha, etc.
 * @returns {Promise<object>} O usuário criado.
 */
export const loginUsuario = async (loginData) => {
    try {
        // Endpoint: POST /login
        const response = await apiClient.post('/login', loginData);
        return response.data;
    } catch (error) {
        console.error("Erro ao fazer login:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Cria um novo usuário no banco de dados.
 * @param {object} email - Objeto email.
 * @returns {Promise<object>} O usuário criado.
 */
export const verificarEmail = async (email) => {
    try {
        const response = await apiClient.post('/confirmar', { email });
        return response.data;
    } catch (error) {
        console.error("Erro ao verificar email:", error.response?.data || error.message);
        throw error;
    }
};


/**
 * Cria um novo usuário no banco de dados.
 * @param {object} email - Objeto email.
 * @returns {Promise<object>} O usuário criado.
 */
export const RecuperarSenha = async (email) => {
    try {
        const response = await apiClient.post('/esqueci-senha', { email });
        return response.data;
    } catch (error) {
        console.error("Erro ao recuperar senha:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Cria um novo usuário no banco de dados.
 * @param {object} email - Objeto email.
 * @returns {Promise<object>} O usuário criado.
 */
export const AtualizarSenha = async (dados) => {
    try {
        const response = await apiClient.post('/redefinir-senha', dados);
        return response.data;
    } catch (error) {
        console.error("Erro ao redefinir senha:", error.response?.data || error.message);
        throw error;
    }
};