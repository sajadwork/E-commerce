import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';
import { getProductById } from '../../../services/product.service';
import { updateProduct, uploadImage } from '../../../services/admin.service';
import { useAuth } from '../../../context/AuthContext';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [form, setForm] = useState({ name: '', price: '', category: '', brand: '', description: '', image: '', countInStock: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const prod = await getProductById(id);
                setForm({
                    name: prod.name,
                    price: prod.price,
                    category: prod.category,
                    brand: prod.brand || '',
                    description: prod.description || '',
                    image: prod.image || '',
                    countInStock: prod.countInStock || 0
                });
                setImagePreview(prod.image);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            let finalImageUrl = form.image;

            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);
                const uploadResult = await uploadImage(formData, user.token);
                finalImageUrl = uploadResult.image;
            }

            await updateProduct(id, { ...form, image: finalImageUrl }, user.token);
            navigate('/admin/products');
        } catch (err) {
            setError(err.message || 'Failed to update product');
            setSubmitting(false);
        }
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Edit Product ...{id.substring(id.length - 6)}</h1>

                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', maxWidth: '600px' }}>
                    {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Product Name</label>
                            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Price ($)</label>
                                <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Count In Stock</label>
                                <input type="number" value={form.countInStock} onChange={e => setForm({ ...form, countInStock: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Brand</label>
                            <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
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
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Description</label>
                            <textarea rows="4" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Product Image</label>
                            <input type="file" onChange={handleFileChange} accept="image/*" style={{ marginBottom: '15px' }} />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                            )}
                        </div>
                        <button type="submit" disabled={submitting} style={{ padding: '12px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                            {submitting ? 'Updating...' : 'Update Product'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
