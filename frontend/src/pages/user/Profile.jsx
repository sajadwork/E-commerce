
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!user) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <p>Please login to view profile.</p>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="container">
                <div className="dashboard-container">
                    <aside className="dashboard-sidebar">
                        <NavLink to="/profile" className="sidebar-link active">
                            <i className="ph ph-user"></i> My Profile
                        </NavLink>
                        <NavLink to="/profile/orders" className="sidebar-link">
                            <i className="ph ph-package"></i> My Orders
                        </NavLink>
                        <NavLink to="/profile/wishlist" className="sidebar-link">
                            <i className="ph ph-heart"></i> Wishlist
                        </NavLink>
                        <NavLink to="/profile/settings" className="sidebar-link">
                            <i className="ph ph-gear"></i> Settings
                        </NavLink>
                        <button 
                            onClick={logout} 
                            className="sidebar-link" 
                            style={{ border: 'none', background: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', marginTop: 'auto', color: '#ef4444' }}
                        >
                            <i className="ph ph-sign-out"></i> Logout
                        </button>
                    </aside>

                    <main className="dashboard-main">
                        <div className="profile-card">
                            <div className="profile-header">
                                <div className="profile-avatar-large">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="profile-info">
                                    <h1>{user.name}</h1>
                                    <p style={{ margin: '0 0 12px' }}>{user.email}</p>
                                    <span className="role-badge">{user.role}</span>
                                </div>
                            </div>

                            <section style={{ marginBottom: '40px' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '24px' }}>Account Details</h3>
                                <div style={{ display: 'grid', gap: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--light-gray)', borderRadius: 'var(--radius-lg)' }}>
                                        <span style={{ color: 'var(--text-light)', fontWeight: '600' }}>Phone</span>
                                        <span style={{ fontWeight: '700' }}>+1 234 567 890</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--light-gray)', borderRadius: 'var(--radius-lg)' }}>
                                        <span style={{ color: 'var(--text-light)', fontWeight: '600' }}>Member Since</span>
                                        <span style={{ fontWeight: '700' }}>March 2026</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--light-gray)', borderRadius: 'var(--radius-lg)' }}>
                                        <span style={{ color: 'var(--text-light)', fontWeight: '600' }}>Shipping Address</span>
                                        <span style={{ fontWeight: '700', textAlign: 'right' }}>123 Modern Loft, Tech City, TC</span>
                                    </div>
                                </div>
                            </section>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button className="btn-buy-now-large" style={{ flex: 1 }}>Edit Profile</button>
                                <button className="btn-add-cart-large" style={{ flex: 1 }} onClick={logout}>Sign Out</button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Profile;

