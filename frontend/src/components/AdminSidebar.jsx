import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <aside className="admin-sidebar" style={{ width: '250px', backgroundColor: '#1f2937', color: 'white', height: '100vh', position: 'sticky', top: 0, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div className="admin-brand" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>
                E-commerce Admin
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <NavLink to="/admin/dashboard" style={({ isActive }) => ({ padding: '10px', borderRadius: '4px', color: 'white', textDecoration: 'none', backgroundColor: isActive ? '#374151' : 'transparent' })}>
                    <i className="ph ph-squares-four" style={{ marginRight: '8px' }}></i> Dashboard
                </NavLink>
                <NavLink to="/admin/products" style={({ isActive }) => ({ padding: '10px', borderRadius: '4px', color: 'white', textDecoration: 'none', backgroundColor: isActive ? '#374151' : 'transparent' })}>
                    <i className="ph ph-package" style={{ marginRight: '8px' }}></i> Products
                </NavLink>
                <NavLink to="/admin/orders" style={({ isActive }) => ({ padding: '10px', borderRadius: '4px', color: 'white', textDecoration: 'none', backgroundColor: isActive ? '#374151' : 'transparent' })}>
                    <i className="ph ph-shopping-cart" style={{ marginRight: '8px' }}></i> Orders
                </NavLink>
                <NavLink to="/admin/users" style={({ isActive }) => ({ padding: '10px', borderRadius: '4px', color: 'white', textDecoration: 'none', backgroundColor: isActive ? '#374151' : 'transparent' })}>
                    <i className="ph ph-users" style={{ marginRight: '8px' }}></i> Users
                </NavLink>
                <NavLink to="/admin/reviews" style={({ isActive }) => ({ padding: '10px', borderRadius: '4px', color: 'white', textDecoration: 'none', backgroundColor: isActive ? '#374151' : 'transparent' })}>
                    <i className="ph ph-star" style={{ marginRight: '8px' }}></i> Reviews
                </NavLink>
                <NavLink to="/admin/settings" style={({ isActive }) => ({ padding: '10px', borderRadius: '4px', color: 'white', textDecoration: 'none', backgroundColor: isActive ? '#374151' : 'transparent' })}>
                    <i className="ph ph-gear" style={{ marginRight: '8px' }}></i> Settings
                </NavLink>
            </nav>

            <button onClick={handleLogout} style={{ marginTop: 'auto', padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                <i className="ph ph-sign-out" style={{ marginRight: '8px' }}></i> Logout
            </button>
        </aside>
    );
};

export default AdminSidebar;
