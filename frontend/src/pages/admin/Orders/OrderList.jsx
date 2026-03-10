import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';
import OrderStatus from '../../../components/OrderStatus';
import { formatPrice } from '../../../utils/formatPrice';
import { useAuth } from '../../../context/AuthContext';
import { getOrders } from '../../../services/admin.service';

const OrderList = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders(user.token);
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user.token]);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Orders</h1>

                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    {loading && <div style={{ padding: '20px' }}>Loading orders...</div>}
                    {error && <div style={{ padding: '20px', color: 'red' }}>{error}</div>}

                    {!loading && !error && (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                                    <th style={{ padding: '12px' }}>Order ID</th>
                                    <th style={{ padding: '12px' }}>Customer</th>
                                    <th style={{ padding: '12px' }}>Date</th>
                                    <th style={{ padding: '12px' }}>Total</th>
                                    <th style={{ padding: '12px' }}>Paid</th>
                                    <th style={{ padding: '12px' }}>Delivered</th>
                                    <th style={{ padding: '12px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <td style={{ padding: '12px', fontWeight: '500' }}>...{order._id.substring(order._id.length - 6)}</td>
                                        <td style={{ padding: '12px' }}>{order.user && order.user.name ? order.user.name : 'Unknown User'}</td>
                                        <td style={{ padding: '12px', color: '#6b7280' }}>
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td style={{ padding: '12px' }}>{formatPrice(order.totalPrice)}</td>
                                        <td style={{ padding: '12px' }}>
                                            {order.isPaid ? (
                                                <span style={{ color: 'green' }}>{new Date(order.paidAt).toLocaleDateString()}</span>
                                            ) : (
                                                <span style={{ color: 'red' }}>Not Paid</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            {order.isDelivered ? (
                                                <span style={{ color: 'green' }}>{new Date(order.deliveredAt).toLocaleDateString()}</span>
                                            ) : (
                                                <span style={{ color: 'red' }}>Not Delivered</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            <Link to={`/admin/orders/${order._id}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderList;
