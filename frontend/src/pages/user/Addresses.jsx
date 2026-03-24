import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AddressForm from '../../components/AddressForm';
import UserSidebar from '../../components/UserSidebar';

const Addresses = () => {
    const { user, logout } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    // Mock saved addresses
    const [savedAddresses, setSavedAddresses] = useState([
        {
            id: 1,
            name: user?.name,
            mobile: '9876543210',
            pincode: '700001',
            locality: 'Park Street',
            address: '123 Modern Loft, Tech City',
            city: 'Kolkata',
            state: 'West Bengal',
            type: 'Home',
            isDefault: true
        }
    ]);

    const handleSave = (data) => {
        if (editingAddress) {
            setSavedAddresses(prev => prev.map(addr => addr.id === editingAddress.id ? { ...data, id: addr.id } : addr));
        } else {
            setSavedAddresses(prev => [...prev, { ...data, id: Date.now(), isDefault: false }]);
        }
        setShowForm(false);
        setEditingAddress(null);
    };

    const handleEdit = (address) => {
        setEditingAddress(address);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            setSavedAddresses(prev => prev.filter(addr => addr.id !== id));
        }
    };

    if (!user) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <p>Please login to view addresses.</p>
            </div>
        );
    }

    return (
        <div className="profile-page address-manager-page">
            <div className="container">
                <div className="dashboard-container">
                    <UserSidebar />

                    <main className="dashboard-main">
                        <div className={`profile-card ${showForm ? 'address-editing' : ''}`}>
                            {!showForm ? (
                                <>
                                    <div className="address-header">
                                        <h2>Manage Addresses</h2>
                                        <button className="btn-add-new" onClick={() => { setEditingAddress(null); setShowForm(true); }}>
                                            <i className="ph ph-plus"></i> Add New Address
                                        </button>
                                    </div>

                                    <div className="address-list">
                                        {savedAddresses.map(address => (
                                            <div key={address.id} className="address-card">
                                                <div className="address-card-header">
                                                    <span className="address-type-badge">{address.type}</span>
                                                    <div className="address-menu-container">
                                                        <button className="address-menu-btn" aria-label="More options">
                                                            <i className="ph ph-dots-three-outline-vertical"></i>
                                                        </button>
                                                        <div className="address-menu-dropdown">
                                                            <button onClick={() => handleEdit(address)}><i className="ph ph-pencil-simple"></i> Edit</button>
                                                            <button onClick={() => handleDelete(address.id)} className="delete"><i className="ph ph-trash"></i> Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="address-details">
                                                    <div className="address-user-info">
                                                        <span className="user-name">{address.name}</span>
                                                        <span className="user-mobile">{address.mobile}</span>
                                                    </div>
                                                    <p className="address-text">
                                                        {address.address}, {address.locality}, {address.city}, {address.state} - <strong>{address.pincode}</strong>
                                                    </p>
                                                </div>
                                                {address.isDefault && <span className="default-address-tag">Default Address</span>}
                                            </div>
                                        ))}
                                        {savedAddresses.length === 0 && (
                                            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-light)' }}>
                                                <i className="ph ph-map-pin" style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.3 }}></i>
                                                <p>No addresses saved yet.</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <AddressForm 
                                    initialData={editingAddress}
                                    onSave={handleSave}
                                    onCancel={() => setShowForm(false)}
                                />
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Addresses;
