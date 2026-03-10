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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '30px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Add New Product</h1>

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

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Brand</label>
                <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}>
                  <option value="">Select Category</option>
                  <option value="Home">Home</option>
                  <option value="Music">Music</option>
                  <option value="Phone">Phone</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Description</label>
              <textarea rows="4" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>

            {/* Image Upload Area */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Product Image</label>
              <input type="file" onChange={handleFileChange} accept="image/*" required style={{ marginBottom: '15px' }} />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              )}
            </div>

            <button type="submit" disabled={loading} style={{ padding: '12px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
              {loading ? 'Uploading...' : 'Save Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
