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
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1 }}>

                {/* Sticky Header Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#f3f4f6',
                    padding: '30px',
                    zIndex: 10,
                    borderBottom: '1px solid #e5e7eb' // subtle separation line when scrolling
                }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Products</h1>
                    <Link to="/admin/products/add" style={{ padding: '10px 15px', backgroundColor: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                        + Add Product
                    </Link>
                </div>

                {/* Main Content Area */}
                <div style={{ padding: '0 30px 30px 30px' }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        {loading && <div style={{ padding: '20px' }}>Loading products...</div>}
                        {error && <div style={{ padding: '20px', color: 'red' }}>{error}</div>}

                        {!loading && !error && (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                                        <th style={{ padding: '12px' }}>ID</th>
                                        <th style={{ padding: '12px' }}>Image</th>
                                        <th style={{ padding: '12px' }}>Name</th>
                                        <th style={{ padding: '12px' }}>Category</th>
                                        <th style={{ padding: '12px' }}>Price</th>
                                        <th style={{ padding: '12px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                            <td style={{ padding: '12px' }}>...{product._id.substring(product._id.length - 6)}</td>
                                            <td style={{ padding: '12px' }}><img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                                            <td style={{ padding: '12px', fontWeight: '500' }}>{product.name}</td>
                                            <td style={{ padding: '12px' }}>{product.category}</td>
                                            <td style={{ padding: '12px' }}>${product.price}</td>
                                            <td style={{ padding: '12px' }}>
                                                <Link to={`/admin/products/edit/${product._id}`} style={{ marginRight: '10px', color: '#3b82f6', textDecoration: 'none' }}>Edit</Link>
                                                <button onClick={() => handleDelete(product._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
