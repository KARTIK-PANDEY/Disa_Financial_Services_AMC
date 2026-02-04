import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Load user from localStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAdmin(userData.role === 'admin');
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        // Set state immediately for UI updates
        setUser(userData);
        setIsAdmin(userData.role === 'admin');

        // Persist to localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData));

        // Navigate based on role
        if (userData.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/');
        }
    };

    const logout = () => {
        // Clear state immediately
        setUser(null);
        setIsAdmin(false);

        // Clear storage
        localStorage.removeItem('currentUser');

        // Redirect to login or home
        navigate('/login', { replace: true });
    };

    // Protect Admin Routes
    useEffect(() => {
        if (!loading && location.pathname.startsWith('/admin') && (!user || user.role !== 'admin')) {
            navigate('/login');
        }
    }, [user, loading, location.pathname, navigate]);

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
