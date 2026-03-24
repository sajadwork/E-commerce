import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppRoutes from './routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const { settings } = useSettings();
    const { user, logout } = useAuth();

    // Maintenance Mode Guard
    useEffect(() => {
        if (settings.maintenanceMode && user && !user.isAdmin) {
            logout();
            navigate('/login');
        }
    }, [settings.maintenanceMode, user, logout, navigate]);

    const isAdminRoute = location.pathname.startsWith('/admin');
    const isAuthRoute = ['/login', '/register', '/forgot-password'].includes(location.pathname);
    const isProfileRoute = ['/profile', '/orders', '/wishlist', '/notifications', '/cart', '/profile/addresses'].includes(location.pathname);
    
    // Hide specialized layout on admin, auth, and specific profile pages
    const showNavbar = !isAdminRoute && !isAuthRoute && location.pathname !== '/profile/addresses';
    const showFooter = !isAdminRoute && !isAuthRoute && !isProfileRoute;

    return (
        <>
            {showNavbar && <Navbar hideDesktop={isProfileRoute} />}

            {/* Route Content */}
            <AppRoutes />

            {showFooter && <Footer />}
        </>
    );
}

export default App;
