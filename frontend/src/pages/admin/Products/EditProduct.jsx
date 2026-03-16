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
        <div className="admin-page">
            <div className="container">
                <div className="dashboard-container">
                    <AdminSidebar />
                    
                    <main className="dashboard-main">
                        <header className="admin-header-actions">
                            <div>
                                <h1 className="page-title" style={{ marginBottom: '4px' }}>Edit Product</h1>
                                <p style={{ color: 'var(--text-light)' }}>
                                    Update the details for product {id ? `#${id.substring(id.length - 6)}` : 'N/A'}.
                                </p>
                            </div>
                            <button onClick={() => navigate('/admin/products')} className="btn-add-cart" style={{ backgroundColor: 'var(--light-gray)', color: 'var(--text-color)' }}>
                                <i className="ph ph-arrow-left"></i> Back to List
                            </button>
                        </header>

                        {error && <div className="error-message" style={{ marginBottom: '24px' }}>{error}</div>}

                        <div className="profile-card" style={{ maxWidth: '800px' }}>
                            <form onSubmit={handleSubmit} className="checkout-form">
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input 
                                        value={form.name} 
                                        onChange={e => setForm({ ...form, name: e.target.value })} 
                                        required 
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Price ($)</label>
                                        <input 
                                            type="number" 
                                            value={form.price} 
                                            onChange={e => setForm({ ...form, price: e.target.value })} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Count In Stock</label>
                                        <input 
                                            type="number" 
                                            value={form.countInStock} 
                                            onChange={e => setForm({ ...form, countInStock: e.target.value })} 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Brand</label>
                                        <input 
                                            value={form.brand} 
                                            onChange={e => setForm({ ...form, brand: e.target.value })} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select 
                                            value={form.category} 
                                            onChange={e => setForm({ ...form, category: e.target.value })} 
                                            required
                                            style={{ width: '100%', padding: '14px 18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', background: 'var(--light-gray)' }}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Home">Home</option>
                                            <option value="Music">Music</option>
                                            <option value="Phone">Phone</option>
                                            <option value="Storage">Storage</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea 
                                        rows="6" 
                                        value={form.description} 
                                        onChange={e => setForm({ ...form, description: e.target.value })} 
                                        style={{ width: '100%', padding: '14px 18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', background: 'var(--light-gray)', fontFamily: 'inherit' }}
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Product Image</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '8px' }}>
                                        {imagePreview && (
                                            <img src={imagePreview} alt="Preview" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }} />
                                        )}
                                        <div style={{ flex: 1 }}>
                                            <input type="file" onChange={handleFileChange} accept="image/*" style={{ marginBottom: '8px' }} />
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>PNG, JPG, or WEBP. Leave empty to keep current image.</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '32px' }}>
                                    <button type="submit" disabled={submitting} className="btn-buy-now-large" style={{ width: 'auto', minWidth: '200px' }}>
                                        {submitting ? (
                                            <><div className="loading-spinner" style={{ width: '20px', height: '20px', display: 'inline-block', marginRight: '8px' }}></div> Updating...</>
                                        ) : (
                                            'Update Product'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
