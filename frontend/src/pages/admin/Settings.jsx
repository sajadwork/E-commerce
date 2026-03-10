import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const Settings = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Store Settings</h1>

                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', maxWidth: '600px' }}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Store Name</label>
                            <input defaultValue="E-commerce Store" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Contact Email</label>
                            <input type="email" defaultValue="admin@stuffus.com" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Currency Default</label>
                            <select defaultValue="USD" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input type="checkbox" id="maintenance" />
                            <label htmlFor="maintenance" style={{ fontWeight: '500' }}>Enable Maintenance Mode</label>
                        </div>
                        <button type="button" style={{ padding: '12px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>Save Settings</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
