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
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Reviews</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {loading && <div style={{ padding: '20px' }}>Loading reviews...</div>}
                    {error && <div style={{ padding: '20px', color: 'red' }}>{error}</div>}
                    {!loading && !error && reviews.length === 0 && <div style={{ padding: '20px' }}>No reviews found.</div>}

                    {!loading && !error && reviews.map((review) => (
                        <div key={review._id} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>{review.product?.name || 'Deleted Product'}</h3>
                                    <div style={{ color: '#f59e0b', fontSize: '14px' }}>
                                        {Array(review.rating).fill(0).map((_, i) => <i key={i} className="ph-fill ph-star"></i>)}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', color: '#6b7280', fontSize: '14px' }}>
                                    <p>By {review.user?.name || 'Deleted User'}</p>
                                    <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <p style={{ color: '#374151', fontStyle: 'italic', marginBottom: '15px' }}>"{review.comment}"</p>
                            <div>
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
                                >
                                    Delete Review
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
