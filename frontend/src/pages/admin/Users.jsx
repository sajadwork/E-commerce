import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import { getUsers, deleteUser } from '../../services/admin.service';

const Users = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const data = await getUsers(user.token);
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [user.token]);

    const handleSuspend = async (userId) => {
        if (window.confirm('Are you sure you want to suspend/delete this user? This action cannot be undone.')) {
            try {
                await deleteUser(userId, user.token);
                // Refresh list
                fetchUsers();
            } catch (err) {
                alert(err.message || 'Failed to suspend user');
            }
        }
    };

    return (
        <div className="admin-page">
            <div className="container">
                <div className="dashboard-container">
                    <AdminSidebar />
                    
                    <main className="dashboard-main">
                        <header className="admin-header-actions">
                            <div>
                                <h1 className="page-title" style={{ marginBottom: '4px' }}>Users</h1>
                                <p style={{ color: 'var(--text-light)' }}>Manage system users and their permission levels.</p>
                            </div>
                        </header>

                        {error && <div className="error-message" style={{ marginBottom: '24px' }}>{error}</div>}

                        <div className="admin-table-container">
                            {loading ? (
                                <div style={{ padding: '60px', textAlign: 'center' }}>
                                    <div className="loading-spinner" style={{ margin: '0 auto 16px' }}></div>
                                    <p style={{ color: 'var(--text-light)' }}>Loading users...</p>
                                </div>
                            ) : users.length > 0 ? (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Role</th>
                                            <th>Joined</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u._id}>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div className="profile-avatar-large" style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                                                            {(u.name || 'U').charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>{u.name || 'Unnamed User'}</div>
                                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{u.email || 'No email'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="order-status-badge" style={{ 
                                                        backgroundColor: u.isAdmin ? 'rgba(59, 130, 246, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                                                        color: u.isAdmin ? '#2563eb' : '#4b5563'
                                                    }}>
                                                        <i className={`ph ${u.isAdmin ? 'ph-shield-check' : 'ph-user'}`}></i>
                                                        {u.isAdmin ? 'Administrator' : 'Customer'}
                                                    </span>
                                                </td>
                                                <td style={{ color: 'var(--text-light)' }}>
                                                    {new Date(u.createdAt).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    <span style={{ color: '#16a34a', fontWeight: '600', fontSize: '0.85rem' }}>
                                                        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', marginRight: '6px' }}></span>
                                                        Active
                                                    </span>
                                                </td>
                                                <td>
                                                    {!u.isAdmin && (
                                                        <button 
                                                            onClick={() => handleSuspend(u._id)}
                                                            className="btn-action-delete"
                                                            title="Suspend user"
                                                        >
                                                            <i className="ph ph-user-minus"></i>
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ padding: '80px 20px', textAlign: 'center', color: 'var(--text-light)' }}>
                                    <i className="ph ph-users" style={{ fontSize: '3rem', marginBottom: '16px', display: 'block' }}></i>
                                    <p>No registered users found.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Users;
