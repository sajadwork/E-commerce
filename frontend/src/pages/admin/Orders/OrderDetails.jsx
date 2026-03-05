import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';
import OrderStatus from '../../../components/OrderStatus';

const OrderDetails = () => {
    const { id } = useParams();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '15px' }}>
                    <Link to="/admin/orders" style={{ textDecoration: 'none', color: '#6b7280', fontSize: '20px' }}>&larr;</Link>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Order Details #{id}</h1>
                    <OrderStatus status="Processing" />
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 2, backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Items</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                            <span>EcoVac R1 Smart Cleaner (x1)</span>
                            <span>$299.00</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                            <span>Shipping</span>
                            <span>$10.00</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', fontWeight: 'bold', fontSize: '18px' }}>
                            <span>Total</span>
                            <span>$309.00</span>
                        </div>
                    </div>

                    <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
                        <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Customer Info</h3>
                        <p style={{ marginBottom: '8px' }}><strong>Name:</strong> Jane Smith</p>
                        <p style={{ marginBottom: '8px' }}><strong>Email:</strong> jane@example.com</p>
                        <p style={{ marginBottom: '8px' }}><strong>Phone:</strong> +1 234 567 890</p>
                        <h3 style={{ margin: '20px 0 15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Shipping Address</h3>
                        <p style={{ color: '#4b5563' }}>123 Mockingbird Lane<br />Seattle, WA 98101</p>

                        <div style={{ marginTop: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Update Status</label>
                            <select style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
