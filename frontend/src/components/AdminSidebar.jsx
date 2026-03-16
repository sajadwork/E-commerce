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
        <aside className="dashboard-sidebar">
            <div className="admin-brand" style={{ padding: '0 16px', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-color)' }}>Admin Portal</h2>
            </div>

            <NavLink to="/admin/dashboard" className="sidebar-link">
                <i className="ph ph-squares-four"></i> Dashboard
            </NavLink>
            <NavLink to="/admin/products" className="sidebar-link">
                <i className="ph ph-package"></i> Products
            </NavLink>
            <NavLink to="/admin/orders" className="sidebar-link">
                <i className="ph ph-shopping-cart"></i> Orders
            </NavLink>
            <NavLink to="/admin/users" className="sidebar-link">
                <i className="ph ph-users"></i> Users
            </NavLink>
            <NavLink to="/admin/reviews" className="sidebar-link">
                <i className="ph ph-star"></i> Reviews
            </NavLink>
            <NavLink to="/admin/settings" className="sidebar-link" style={{ marginBottom: 'auto' }}>
                <i className="ph ph-gear"></i> Settings
            </NavLink>

            <button 
                onClick={handleLogout} 
                className="sidebar-link" 
                style={{ border: 'none', background: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', color: '#ef4444' }}
            >
                <i className="ph ph-sign-out"></i> Logout
            </button>
        </aside>
    );
};

export default AdminSidebar;
