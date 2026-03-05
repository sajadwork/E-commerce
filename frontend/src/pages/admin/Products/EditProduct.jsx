import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';
import { PRODUCTS } from '../../../utils/constants';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', price: '', category: '' });

    useEffect(() => {
        const prod = PRODUCTS.find(p => p.id === parseInt(id));
        if (prod) {
            setForm({ name: prod.name, price: prod.price, category: prod.category });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/admin/products');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Edit Product #{id}</h1>

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
                                <option value="Home">Home</option>
                                <option value="Music">Music</option>
                                <option value="Phone">Phone</option>
                            </select>
                        </div>
                        <button type="submit" style={{ padding: '12px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
