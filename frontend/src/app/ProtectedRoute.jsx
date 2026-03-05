import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
    }

    if (!user) {
        return <Navigate to={requireAdmin ? "/admin/login" : "/login"} state={{ from: location }} replace />;
    }

    if (requireAdmin && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
