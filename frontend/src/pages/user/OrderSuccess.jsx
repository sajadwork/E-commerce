import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <i className="ph-fill ph-check-circle" style={{ fontSize: '80px', color: '#10b981', marginBottom: '20px' }}></i>
            <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Order Placed Successfully!</h1>
            <p style={{ color: '#6b7280', marginBottom: '30px' }}>Thank you for your purchase. We will email you the receipt soon.</p>
            <div style={{ display: 'flex', gap: '15px' }}>
                <Link to="/orders" style={{ padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>View Orders</Link>
                <Link to="/" style={{ padding: '12px 24px', backgroundColor: '#e5e7eb', color: '#374151', textDecoration: 'none', borderRadius: '5px' }}>Continue Shopping</Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
