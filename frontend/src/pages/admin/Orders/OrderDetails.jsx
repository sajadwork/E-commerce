import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';
import { getOrderDetails } from '../../../services/order.service';
import { updateOrderToDelivered } from '../../../services/admin.service';
import { useAuth } from '../../../context/AuthContext';
import { useFormatPrice } from '../../../hooks/useFormatPrice';
import { useSettings } from '../../../context/SettingsContext';

const OrderDetails = () => {
    const { settings } = useSettings();
    const formatPrice = useFormatPrice();
    const { id } = useParams();
    const { user } = useAuth();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);

    const fetchOrder = async () => {
        try {
            const data = await getOrderDetails(id);
            setOrder(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleDeliver = async () => {
        if (!window.confirm('Mark this order as delivered?')) return;
        setUpdating(true);
        try {
            await updateOrderToDelivered(id, user.token);
            await fetchOrder(); // refresh data
            setUpdating(false);
        } catch (err) {
            alert(err.message);
            setUpdating(false);
        }
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading order...</div>;
    if (error) return <div style={{ padding: '40px', color: 'red' }}>Error: {error}</div>;
    if (!order) return <div style={{ padding: '40px' }}>Order not found</div>;

    return (
        <div className="admin-page">
            <div className="container">
                <div className="dashboard-container">
                    <AdminSidebar />
                    
                    <main className="dashboard-main">
                        <header className="admin-header-actions" style={{ marginBottom: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <Link to="/admin/orders" className="sidebar-link" style={{ padding: '8px', background: 'var(--light-gray)', borderRadius: 'var(--radius-full)', color: 'var(--text-color)' }}>
                                    <i className="ph ph-arrow-left" style={{ fontSize: '1.25rem' }}></i>
                                </Link>
                                <div>
                                    <h1 className="page-title" style={{ marginBottom: '4px', fontSize: '1.5rem' }}>Order #{order._id.substring(order._id.length - 6)}</h1>
                                    <p style={{ color: 'var(--text-light)' }}>Ordered on {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <span className="order-status-badge" style={{ 
                                    backgroundColor: order.isPaid ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: order.isPaid ? '#16a34a' : '#dc2626',
                                    padding: '8px 16px'
                                }}>
                                    <i className={`ph ${order.isPaid ? 'ph-check-circle' : 'ph-x-circle'}`}></i>
                                    {order.isPaid ? 'Paid' : 'Unpaid'}
                                </span>
                                <span className="order-status-badge" style={{ 
                                    backgroundColor: order.isDelivered ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                    color: order.isDelivered ? '#16a34a' : '#d97706',
                                    padding: '8px 16px'
                                }}>
                                    <i className={`ph ${order.isDelivered ? 'ph-truck' : 'ph-clock'}`}></i>
                                    {order.isDelivered ? 'Delivered' : 'Pending'}
                                </span>
                            </div>
                        </header>

                        {error && <div className="error-message" style={{ marginBottom: '24px' }}>{error}</div>}

                        <div className="cart-layout" style={{ gridTemplateColumns: '1fr 380px', gap: '32px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <section className="admin-table-container">
                                    <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Order Items</h3>
                                        <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{order.orderItems?.length || 0} Items</span>
                                    </div>
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th style={{ textAlign: 'right' }}>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.orderItems?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                            {item.image && <img src={item.image} alt={item.name} />}
                                                            <div style={{ fontWeight: '600', color: 'var(--primary-color)' }}>{item.name}</div>
                                                        </div>
                                                    </td>
                                                    <td style={{ fontWeight: '600' }}>x{item.qty}</td>
                                                    <td style={{ textAlign: 'right', fontWeight: '800', color: 'var(--accent-color)' }}>
                                                        {formatPrice(item.price * item.qty)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </section>

                                <div className="profile-card" style={{ padding: '32px' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '24px' }}>Timeline & History</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ display: 'flex', gap: '16px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent-color)' }}></div>
                                                <div style={{ width: '2px', flex: 1, backgroundColor: 'var(--border-color)', margin: '4px 0' }}></div>
                                            </div>
                                            <div style={{ paddingBottom: '20px' }}>
                                                <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>Order Placed</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '16px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: order.isPaid ? 'var(--accent-color)' : 'var(--border-color)' }}></div>
                                                <div style={{ width: '2px', flex: 1, backgroundColor: 'var(--border-color)', margin: '4px 0' }}></div>
                                            </div>
                                            <div style={{ paddingBottom: '20px' }}>
                                                <div style={{ fontWeight: '700', color: order.isPaid ? 'var(--primary-color)' : 'var(--text-light)' }}>Payment Processed</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{order.isPaid ? new Date(order.paidAt).toLocaleString() : 'Awaiting payment confirmation'}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '16px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: order.isDelivered ? 'var(--accent-color)' : 'var(--border-color)' }}></div>
                                            <div>
                                                <div style={{ fontWeight: '700', color: order.isDelivered ? 'var(--primary-color)' : 'var(--text-light)' }}>Order {order.isDelivered ? 'Delivered' : 'Delivery'}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{order.isDelivered ? new Date(order.deliveredAt).toLocaleString() : 'Awaiting delivery'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div className="profile-card" style={{ padding: '32px' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>Customer Details</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                        <div className="profile-avatar-large" style={{ width: '50px', height: '50px', fontSize: '1.25rem' }}>
                                            {(order.user?.name || 'G').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>{order.user?.name || 'Guest Customer'}</div>
                                            <a href={`mailto:${order.user?.email}`} style={{ fontSize: '0.85rem', color: 'var(--accent-color)', textDecoration: 'none' }}>{order.user?.email || 'No email provided'}</a>
                                        </div>
                                    </div>
                                    
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Shipping Address</h4>
                                    <div style={{ padding: '16px', backgroundColor: 'var(--light-gray)', borderRadius: 'var(--radius-lg)', color: 'var(--text-color)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                        {order.shippingAddress ? (
                                            <>
                                                {order.shippingAddress.address}<br />
                                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                                {order.shippingAddress.country}
                                            </>
                                        ) : 'No address provided'}
                                    </div>

                                    {!order.isDelivered && (
                                        <button
                                            onClick={handleDeliver}
                                            disabled={updating}
                                            className="btn-buy-now-large"
                                            style={{ width: '100%', marginTop: '32px' }}
                                        >
                                            {updating ? 'Updating...' : 'Mark As Shipped'}
                                        </button>
                                    )}
                                </div>

                                <div className="profile-card" style={{ padding: '32px' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>Order Summary</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div className="summary-row" style={{ marginBottom: 0 }}>
                                            <span style={{ color: 'var(--text-light)' }}>Subtotal</span>
                                            <span style={{ fontWeight: '600' }}>{formatPrice(order.totalPrice - order.shippingPrice - order.taxPrice)}</span>
                                        </div>
                                        <div className="summary-row" style={{ marginBottom: 0 }}>
                                            <span style={{ color: 'var(--text-light)' }}>Shipping</span>
                                            <span style={{ fontWeight: '600' }}>{formatPrice(order.shippingPrice)}</span>
                                        </div>
                                        <div className="summary-row" style={{ marginBottom: 0 }}>
                                            <span style={{ color: 'var(--text-light)' }}>Tax</span>
                                            <span style={{ fontWeight: '600' }}>{formatPrice(order.taxPrice)}</span>
                                        </div>
                                        <div className="summary-row total" style={{ marginTop: '12px', paddingTop: '16px' }}>
                                            <span>Total Amount</span>
                                            <span>{formatPrice(order.totalPrice)}</span>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
