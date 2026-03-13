import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserOrders } from '../../services/order.service';
import OrderStatus from '../../components/OrderStatus';
import { formatPrice } from '../../utils/formatPrice';

const Orders = () => {
    const { user } = useAuth();
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
    }, [user]);

    if (!user) return <div style={{ padding: '40px', textAlign: 'center' }}>Please login to view orders.</div>;
    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading orders...</div>;
    if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
            <h2>My Orders</h2>
            {orders.length === 0 ? (
                <p style={{ marginTop: '20px' }}>You have no pending orders.</p>
            ) : (
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map(order => (
                        <div key={order._id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
                            <div>
                                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Order ...{order._id.substring(order._id.length - 6)}</h3>
                                <p style={{ color: '#6b7280', fontSize: '14px' }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Total: {formatPrice(order.totalPrice)} ({order.orderItems?.length || 0} Items)</p>
                            </div>
                            <div>
                                <OrderStatus status={order.isDelivered ? 'Delivered' : 'Processing'} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
