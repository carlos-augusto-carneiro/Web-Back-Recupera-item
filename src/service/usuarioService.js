import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://web-back-end-recupera-item.onrender.com/usuario", // URL base da sua API
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
 * Confirma o email do usuário com o token recebido
 * @param {string} token - Token de confirmação
 * @returns {Promise<object>} Resposta da confirmação
 */
export const confirmarEmailComToken = async (token) => {
    try {
        // Endpoint: PUT /confirmar com token como query parameter
        const response = await apiClient.put(`/confirmar?token=${token}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao confirmar email com token:", error.response?.data || error.message);
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
        console.log('Recuperando senha para o email:', email);
        const response = await apiClient.post('/esqueci-senha', { Email: email });
        return response.data;
    } catch (error) {
        console.error("Erro ao recuperar senha:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Redefine a senha do usuário usando o token
 * @param {string} token - Token de recuperação
 * @param {string} novaSenha - Nova senha do usuário
 * @returns {Promise<object>} Resposta da redefinição
 */
export const AtualizarSenha = async (token, novaSenha) => {
    try {
        // Endpoint: PUT /redefinir-senha
        const response = await apiClient.put('/redefinir-senha', {
            token: token,
            novaSenha: novaSenha
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao redefinir senha:", error.response?.data || error.message);
        throw error;
    }
};