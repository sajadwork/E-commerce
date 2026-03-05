import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const { user, logout } = useAuth();

    if (!user) return <div style={{ padding: '40px', textAlign: 'center' }}>Please login to view profile.</div>;

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '20px', marginBottom: '20px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#3b82f6', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', fontWeight: 'bold' }}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>{user.name}</h1>
                        <p style={{ color: '#6b7280' }}>{user.email}</p>
                        <span style={{ display: 'inline-block', marginTop: '10px', padding: '4px 8px', backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                            {user.role.toUpperCase()}
                        </span>
                    </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Account Details</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6b7280' }}>Phone</span>
                            <span>+1 234 567 890</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6b7280' }}>Address</span>
                            <span>123 Mockingbird Lane, Seattle, WA</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6b7280' }}>Member Since</span>
                            <span>March 2026</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <button style={{ flex: 1, padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Edit Profile</button>
                    <button onClick={logout} style={{ flex: 1, padding: '12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
