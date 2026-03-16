
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserOrders } from '../../services/order.service';
import OrderStatus from '../../components/OrderStatus';
import { useFormatPrice } from '../../hooks/useFormatPrice';
import { NavLink, Link } from 'react-router-dom';

const Orders = () => {
    const formatPrice = useFormatPrice();
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getUserOrders();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchOrders();
        else setLoading(false);
        window.scrollTo(0, 0);
    }, [user]);

    if (!user) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <p>Please login to view orders.</p>
                <Link to="/login" className="btn-buy-now-large" style={{ display: 'inline-flex', maxWidth: '200px', marginTop: '20px' }}>Login</Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container loading-state">
                <div className="loader"></div>
                <p>Fetching your orders...</p>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="container">
                <div className="dashboard-container">
                    <aside className="dashboard-sidebar">
                        <NavLink to="/profile" className="sidebar-link">
                            <i className="ph ph-user"></i> My Profile
                        </NavLink>
                        <NavLink to="/profile/orders" className="sidebar-link active">
                            <i className="ph ph-package"></i> My Orders
                        </NavLink>
                        <NavLink to="/profile/wishlist" className="sidebar-link">
                            <i className="ph ph-heart"></i> Wishlist
                        </NavLink>
                        <NavLink to="/profile/settings" className="sidebar-link">
                            <i className="ph ph-gear"></i> Settings
                        </NavLink>
                        <button 
                            onClick={logout} 
                            className="sidebar-link" 
                            style={{ border: 'none', background: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', marginTop: 'auto', color: '#ef4444' }}
                        >
                            <i className="ph ph-sign-out"></i> Logout
                        </button>
                    </aside>

                    <main className="dashboard-main">
                        <header style={{ marginBottom: '32px' }}>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800', color: 'var(--primary-color)', margin: 0 }}>
                                My Orders
                            </h2>
                            <p style={{ color: 'var(--text-light)', marginTop: '8px' }}>Manage and track your recent purchases.</p>
                        </header>

                        {error && (
                            <div className="error-state" style={{ padding: '16px', marginBottom: '32px' }}>
                                <i className="ph ph-warning-circle"></i> {error}
                            </div>
                        )}

                        {orders.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-color)' }}>
                                <i className="ph ph-package-open" style={{ fontSize: '3rem', color: 'var(--text-light)', marginBottom: '16px', display: 'block' }}></i>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>No orders found</h3>
                                <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>You haven't placed any orders yet. Start shopping to see them here!</p>
                                <Link to="/" className="btn-buy-now-large" style={{ display: 'inline-flex', maxWidth: '200px' }}>Browse Products</Link>
                            </div>
                        ) : (
                            <div className="orders-list">
                                {orders.map(order => (
                                    <div key={order._id} className="order-card">
                                        <div className="order-meta">
                                            <h3>Order #{order._id.substring(order._id.length - 8).toUpperCase()}</h3>
                                            <p className="order-date">Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            <p className="order-total">
                                                {formatPrice(order.totalPrice)} • {order.orderItems?.length || 0} {order.orderItems?.length === 1 ? 'Item' : 'Items'}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
                                            <OrderStatus status={order.isDelivered ? 'Delivered' : (order.isShipped ? 'Shipped' : 'Processing')} />
                                            <Link to={`/order/${order._id}`} style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-color)', textDecoration: 'none' }}>
                                                View Details <i className="ph ph-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Orders;

