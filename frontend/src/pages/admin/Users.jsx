import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const Users = () => {
    const mockUsers = [
        { id: 1, name: 'Demo User', email: 'demo@user.com', role: 'User', joined: '2026-01-15' },
        { id: 2, name: 'Admin User', email: 'admin@stuffus.com', role: 'Admin', joined: '2025-11-01' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Users</h1>

                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
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
                            {mockUsers.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '12px' }}>#{user.id}</td>
                                    <td style={{ padding: '12px', fontWeight: '500' }}>{user.name}</td>
                                    <td style={{ padding: '12px', color: '#6b7280' }}>{user.email}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: user.role === 'Admin' ? '#dbeafe' : '#f3f4f6', color: user.role === 'Admin' ? '#1d4ed8' : '#374151', fontSize: '14px' }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', color: '#6b7280' }}>{user.joined}</td>
                                    <td style={{ padding: '12px' }}>
                                        <button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Suspend</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
