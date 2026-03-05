import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserOrders } from '../../services/order.service';
import OrderStatus from '../../components/OrderStatus';
import { formatPrice } from '../../utils/formatPrice';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getUserOrders(user?.id);
            setOrders(data);
            setLoading(false);
        };
        if (user) fetchOrders();
    }, [user]);

    if (!user) return <div style={{ padding: '40px', textAlign: 'center' }}>Please login to view orders.</div>;
    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading orders...</div>;

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h2>My Orders</h2>
            {orders.length === 0 ? (
                <p>You have no pending orders.</p>
            ) : (
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map(order => (
                        <div key={order.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3>Order {order.id}</h3>
                                <p style={{ color: '#6b7280' }}>Placed on {order.date}</p>
                                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Total: {formatPrice(order.total)} ({order.items} Items)</p>
                            </div>
                            <div>
                                <OrderStatus status={order.status} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
