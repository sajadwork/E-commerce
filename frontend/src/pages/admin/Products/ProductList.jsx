import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';
import { getProducts } from '../../../services/product.service';
import { deleteProduct } from '../../../services/admin.service';
import { useAuth } from '../../../context/AuthContext';

const ProductList = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you certain you wish to delete this product?')) {
            try {
                await deleteProduct(id, user.token);
                // Refresh the list after deletion
                fetchProducts();
            } catch (err) {
                alert(err.message || 'Failed to delete product');
            }
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
                                <h1 className="page-title" style={{ marginBottom: '4px' }}>Products</h1>
                                <p style={{ color: 'var(--text-light)' }}>Manage your store's inventory and details.</p>
                            </div>
                            <Link to="/admin/products/add" className="btn-add-new">
                                <i className="ph ph-plus"></i> Add Product
                            </Link>
                        </header>

                        {error && <div className="error-message" style={{ marginBottom: '24px' }}>{error}</div>}

                        <div className="admin-table-container">
                            {loading ? (
                                <div style={{ padding: '60px', textAlign: 'center' }}>
                                    <div className="loading-spinner" style={{ margin: '0 auto 16px' }}></div>
                                    <p style={{ color: 'var(--text-light)' }}>Loading products...</p>
                                </div>
                            ) : products.length > 0 ? (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product._id}>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                        <img src={product.image || '/placeholder-product.png'} alt={product.name || 'Product'} />
                                                        <div>
                                                            <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>{product.name || 'Unnamed Product'}</div>
                                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                                                ID: #{product._id ? product._id.substring(product._id.length - 6) : 'N/A'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="role-badge" style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: 'var(--text-color)' }}>
                                                        {product.category || 'Uncategorized'}
                                                    </span>
                                                </td>
                                                <td style={{ fontWeight: '800', color: 'var(--accent-color)' }}>
                                                    ${Number(product.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td>
                                                    <Link to={`/admin/products/edit/${product._id}`} className="btn-action-edit">
                                                        <i className="ph ph-pencil-simple"></i> Edit
                                                    </Link>
                                                    <button onClick={() => handleDelete(product._id)} className="btn-action-delete">
                                                        <i className="ph ph-trash"></i> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ padding: '80px 20px', textAlign: 'center', color: 'var(--text-light)' }}>
                                    <i className="ph ph-package" style={{ fontSize: '3rem', marginBottom: '16px', display: 'block' }}></i>
                                    <p>No products found in your inventory.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
