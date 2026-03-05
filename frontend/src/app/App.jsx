
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppRoutes from './routes';
import { useLocation } from 'react-router-dom';

function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <>
            {!isAdminRoute && <Navbar />}

            {/* Route Content */}
            <AppRoutes />

            {!isAdminRoute && <Footer />}
        </>
    );
}

export default App;
