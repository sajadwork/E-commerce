
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppRoutes from './routes';
import { useLocation } from 'react-router-dom';

function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isProfileRoute = ['/profile', '/orders', '/wishlist', '/notifications', '/cart'].includes(location.pathname);
    
    // On profile screens, we hide the heavy top-nav and footer, 
    // but the Navbar component itself contains the Mobile Bottom Nav, which we ALWAYS want.
    const showFooter = !isAdminRoute && !isProfileRoute;

    return (
        <>
            {!isAdminRoute && <Navbar hideDesktop={isProfileRoute} />}

            {/* Route Content */}
            <AppRoutes />

            {showFooter && <Footer />}
        </>
    );
}

export default App;
