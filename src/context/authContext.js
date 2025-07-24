import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        const expirationTime = localStorage.getItem('tokenExpiration');
        if (expirationTime && new Date().getTime() > expirationTime) {
            logout(); 
        }
    }, []);

    const login = (newToken, expiresIn) => {
        const expirationTime = new Date().getTime() + expiresIn * 1000;
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('tokenExpiration', expirationTime);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration');
        setToken(null);
    };

    const value = {
        isAuthenticated: !!token, 
        token,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};