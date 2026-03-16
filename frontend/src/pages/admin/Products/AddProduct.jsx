import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';
import { uploadImage, createProduct } from '../../../services/admin.service';
import { useAuth } from '../../../context/AuthContext';

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    countInStock: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = '';

      // 1. Upload Image (if provided)
      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        const uploadResult = await uploadImage(formData, user.token);
        imageUrl = uploadResult.image; // e.g. /uploads/image-169999.png
      }

      // 2. Add Product
      const newProduct = {
        ...form,
        image: imageUrl
      };

      await createProduct(newProduct, user.token);
      navigate('/admin/products');

    } catch (err) {
      setError(err.message || "Failed to save product.");
      setLoading(false);
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
                                <h1 className="page-title" style={{ marginBottom: '4px' }}>Add New Product</h1>
                                <p style={{ color: 'var(--text-light)' }}>Enter the details to list a new product in your store.</p>
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
                                        placeholder="e.g. Premium Wireless Headphones"
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
                                            placeholder="299.99"
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Count In Stock</label>
                                        <input 
                                            type="number" 
                                            value={form.countInStock} 
                                            onChange={e => setForm({ ...form, countInStock: e.target.value })} 
                                            placeholder="50"
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
                                            placeholder="e.g. Sony"
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
                                        rows="4" 
                                        value={form.description} 
                                        onChange={e => setForm({ ...form, description: e.target.value })} 
                                        placeholder="Enter detailed product description..."
                                        style={{ width: '100%', padding: '14px 18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', background: 'var(--light-gray)', fontFamily: 'inherit' }}
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Product Image</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '8px' }}>
                                        {imagePreview && (
                                            <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }} />
                                        )}
                                        <div style={{ flex: 1 }}>
                                            <input type="file" onChange={handleFileChange} accept="image/*" required={!imagePreview} style={{ marginBottom: '8px' }} />
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>PNG, JPG, or WEBP. Max 2MB.</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '32px' }}>
                                    <button type="submit" disabled={loading} className="btn-buy-now-large" style={{ width: 'auto', minWidth: '200px' }}>
                                        {loading ? (
                                            <><div className="loading-spinner" style={{ width: '20px', height: '20px', display: 'inline-block', marginRight: '8px' }}></div> Saving...</>
                                        ) : (
                                            'Create Product'
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

export default AddProduct;
