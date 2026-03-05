import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';

const AddProduct = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', price: '', category: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock save
        navigate('/admin/products');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Add New Product</h1>

                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', maxWidth: '600px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Product Name</label>
                            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Price ($)</label>
                            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Category</label>
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}>
                                <option value="">Select Category</option>
                                <option value="Home">Home</option>
                                <option value="Music">Music</option>
                                <option value="Phone">Phone</option>
                            </select>
                        </div>
                        <button type="submit" style={{ padding: '12px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Save Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
