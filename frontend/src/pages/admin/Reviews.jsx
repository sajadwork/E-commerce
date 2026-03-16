import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { getAllReviews, deleteReview } from '../../services/admin.service';
import { useAuth } from '../../context/AuthContext';

const Reviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const data = await getAllReviews(user.token);
            setReviews(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.token) {
            fetchReviews();
        }
    }, [user]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you confirm you want to delete this review?')) {
            try {
                await deleteReview(id, user.token);
                fetchReviews(); // Refresh the list
            } catch (err) {
                alert(err.message || 'Failed to delete review');
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
                                <h1 className="page-title" style={{ marginBottom: '4px' }}>Reviews</h1>
                                <p style={{ color: 'var(--text-light)' }}>Monitor and moderate customer feedback across your store.</p>
                            </div>
                        </header>

                        {error && <div className="error-message" style={{ marginBottom: '24px' }}>{error}</div>}

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
                            {loading ? (
                                <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center' }}>
                                    <div className="loading-spinner" style={{ margin: '0 auto 16px' }}></div>
                                    <p style={{ color: 'var(--text-light)' }}>Loading reviews...</p>
                                </div>
                            ) : reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review._id} className="profile-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div className="profile-avatar-large" style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                                                    {(review.user?.name || 'G').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>{review.user?.name || 'Guest'}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{new Date(review.createdAt).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', color: 'var(--accent-color)', fontSize: '0.9rem' }}>
                                                {Array(5).fill(0).map((_, i) => (
                                                    <i key={i} className={`ph${i < review.rating ? '-fill' : ''} ph-star`}></i>
                                                ))}
                                            </div>
                                        </div>

                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.05em', marginBottom: '8px' }}>Product</div>
                                            <div style={{ fontWeight: '600', color: 'var(--primary-color)', marginBottom: '16px' }}>{review.product?.name || 'Deleted Product'}</div>
                                            
                                            <div style={{ position: 'relative', padding: '16px', backgroundColor: 'var(--light-gray)', borderRadius: 'var(--radius-lg)', color: 'var(--text-color)', fontStyle: 'italic', fontSize: '0.95rem' }}>
                                                <i className="ph-fill ph-quotes" style={{ position: 'absolute', top: '-10px', left: '10px', fontSize: '1.5rem', color: 'var(--accent-color)', opacity: 0.2 }}></i>
                                                "{review.comment}"
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => handleDelete(review._id)}
                                                className="btn-action-delete"
                                                style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                                            >
                                                <i className="ph ph-trash"></i> Delete Review
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ gridColumn: '1 / -1', padding: '80px 20px', textAlign: 'center', color: 'var(--text-light)' }}>
                                    <i className="ph ph-chat-centered-dots" style={{ fontSize: '3rem', marginBottom: '16px', display: 'block' }}></i>
                                    <p>No customer reviews found.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
