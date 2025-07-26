import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Função para decodificar JWT
const decodeJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        const expirationTime = localStorage.getItem('tokenExpiration');
        
        // Verifica se o token expirou
        if (expirationTime && new Date().getTime() > expirationTime) {
            logout(); 
        } else if (token) {
            // Decodifica o token para extrair informações do usuário
            const decodedToken = decodeJWT(token);
            
            if (decodedToken) {
                // Verifica se o token ainda é válido (não expirou)
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp && decodedToken.exp < currentTime) {
                    logout(); // Token expirado
                    return;
                }

                setUser({
                    id: decodedToken.id,
                    email: decodedToken.email,
                    perfil: decodedToken.perfil,
                    authorities: decodedToken.authorities,
                    // Para compatibilidade com os componentes existentes
                    nome: decodedToken.email.split('@')[0], // Usa parte do email como nome temporário
                    role: decodedToken.perfil
                });
            } else {
                logout(); // Token inválido
            }
        }
    }, [token]);

    const login = (newToken, expiresIn) => {
        const expirationTime = new Date().getTime() + (expiresIn * 1000);
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('tokenExpiration', expirationTime.toString());
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
        setToken(null);
        setUser(null);
    };

    const value = {
        isAuthenticated: !!token && !!user, 
        token,
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};