import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';
import OrderStatus from '../../../components/OrderStatus';
import { useAuth } from '../../../context/AuthContext';
import { useFormatPrice } from '../../../hooks/useFormatPrice';
import { getOrders } from '../../../services/admin.service';

const OrderList = () => {
    const { user } = useAuth();
    const formatPrice = useFormatPrice();
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
        <div className="admin-page">
            <div className="container">
                <div className="dashboard-container">
                    <AdminSidebar />
                    
                    <main className="dashboard-main">
                        <header className="admin-header-actions">
                            <div>
                                <h1 className="page-title" style={{ marginBottom: '4px' }}>Orders</h1>
                                <p style={{ color: 'var(--text-light)' }}>Track and manage all customer purchases.</p>
                            </div>
                        </header>

                        {error && <div className="error-message" style={{ marginBottom: '24px' }}>{error}</div>}

                        <div className="admin-table-container">
                            {loading ? (
                                <div style={{ padding: '60px', textAlign: 'center' }}>
                                    <div className="loading-spinner" style={{ margin: '0 auto 16px' }}></div>
                                    <p style={{ color: 'var(--text-light)' }}>Loading orders...</p>
                                </div>
                            ) : orders.length > 0 ? (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Order</th>
                                            <th>Customer</th>
                                            <th>Total</th>
                                            <th>Payment</th>
                                            <th>Delivery</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order._id}>
                                                <td>
                                                    <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>
                                                        {order._id ? `#${order._id.substring(order._id.length - 6)}` : 'N/A'}
                                                    </div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ fontWeight: '600' }}>{order.user?.name || 'Guest'}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{order.user?.email || 'No email provided'}</div>
                                                </td>
                                                <td style={{ fontWeight: '800', color: 'var(--accent-color)' }}>
                                                    {formatPrice(order.totalPrice)}
                                                </td>
                                                <td>
                                                    <span className="order-status-badge" style={{ 
                                                        backgroundColor: order.isPaid ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                        color: order.isPaid ? '#16a34a' : '#dc2626'
                                                    }}>
                                                        <i className={`ph ${order.isPaid ? 'ph-check-circle' : 'ph-x-circle'}`}></i>
                                                        {order.isPaid ? 'Paid' : 'Unpaid'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="order-status-badge" style={{ 
                                                        backgroundColor: order.isDelivered ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                        color: order.isDelivered ? '#16a34a' : '#d97706'
                                                    }}>
                                                        <i className={`ph ${order.isDelivered ? 'ph-truck' : 'ph-clock'}`}></i>
                                                        {order.isDelivered ? 'Shipped' : 'Pending'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link to={`/admin/orders/${order._id}`} className="btn-action-edit" style={{ marginRight: 0 }}>
                                                        <i className="ph ph-eye"></i> Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ padding: '80px 20px', textAlign: 'center', color: 'var(--text-light)' }}>
                                    <i className="ph ph-shopping-bag" style={{ fontSize: '3rem', marginBottom: '16px', display: 'block' }}></i>
                                    <p>No orders have been placed yet.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
