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
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Users</h1>

                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    {loading && <div style={{ padding: '20px' }}>Loading users...</div>}
                    {error && <div style={{ padding: '20px', color: 'red' }}>{error}</div>}

                    {!loading && !error && (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                                    <th style={{ padding: '12px' }}>ID</th>
                                    <th style={{ padding: '12px' }}>Name</th>
                                    <th style={{ padding: '12px' }}>Email</th>
                                    <th style={{ padding: '12px' }}>Role</th>
                                    <th style={{ padding: '12px' }}>Joined</th>
                                    <th style={{ padding: '12px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <td style={{ padding: '12px' }}>...{u._id.substring(u._id.length - 6)}</td>
                                        <td style={{ padding: '12px', fontWeight: '500' }}>{u.name}</td>
                                        <td style={{ padding: '12px', color: '#6b7280' }}>{u.email}</td>
                                        <td style={{ padding: '12px' }}>
                                            <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: u.isAdmin ? '#dbeafe' : '#f3f4f6', color: u.isAdmin ? '#1d4ed8' : '#374151', fontSize: '14px' }}>
                                                {u.isAdmin ? 'Admin' : 'User'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px', color: '#6b7280' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '12px' }}>
                                            <button 
                                                onClick={() => handleSuspend(u._id)}
                                                style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', opacity: u.isAdmin ? 0.5 : 1 }}
                                                disabled={u.isAdmin}
                                                title={u.isAdmin ? 'Cannot suspend an admin' : 'Suspend this user'}
                                            >
                                                Suspend
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Users;
