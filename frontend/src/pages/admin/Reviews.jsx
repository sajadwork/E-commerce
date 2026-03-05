import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const Reviews = () => {
    const mockReviews = [
        { id: 1, product: 'EcoVac R1', user: 'Jane Smith', rating: 5, comment: 'Amazing vacuum! Very quiet.', date: '2026-03-01' },
        { id: 2, product: 'AluStand Holder', user: 'Bob Johnson', rating: 4, comment: 'Sturdy, but a bit heavy.', date: '2026-03-02' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Reviews</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {mockReviews.map(review => (
                        <div key={review.id} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>{review.product}</h3>
                                    <div style={{ color: '#f59e0b', fontSize: '14px' }}>
                                        {Array(review.rating).fill(0).map((_, i) => <i key={i} className="ph-fill ph-star"></i>)}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', color: '#6b7280', fontSize: '14px' }}>
                                    <p>By {review.user}</p>
                                    <p>{review.date}</p>
                                </div>
                            </div>
                            <p style={{ color: '#374151', fontStyle: 'italic', marginBottom: '15px' }}>"{review.comment}"</p>
                            <div>
                                <button style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>Delete Review</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
