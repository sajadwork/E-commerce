import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser as loginService, registerUser } from '../services/auth.service';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        const userData = await loginService(email, password);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    };

    const register = async (name, email, password) => {
        const userData = await registerUser(name, email, password);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
