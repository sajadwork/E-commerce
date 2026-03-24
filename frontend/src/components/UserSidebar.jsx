import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserSidebar = () => {
    const { logout } = useAuth();

    return (
        <aside className="dashboard-sidebar">
            <NavLink to="/profile" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} end>
                <i className="ph ph-user"></i> My Profile
            </NavLink>
            <NavLink to="/profile/addresses" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
                <i className="ph ph-map-pin"></i> Manage Addresses
            </NavLink>
            <NavLink to="/profile/orders" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
                <i className="ph ph-package"></i> My Orders
            </NavLink>
            <NavLink to="/profile/wishlist" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
                <i className="ph ph-heart"></i> Wishlist
            </NavLink>
            <button
                onClick={logout}
                className="sidebar-link sidebar-logout"
            >
                <i className="ph ph-sign-out"></i> Logout
            </button>
        </aside>
    );
};

export default UserSidebar;
