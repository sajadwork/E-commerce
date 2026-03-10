import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';
import { getOrderDetails } from '../../../services/order.service';
import { updateOrderToDelivered } from '../../../services/admin.service';
import { useAuth } from '../../../context/AuthContext';
import { formatPrice } from '../../../utils/formatPrice';

const OrderDetails = () => {
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
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '15px' }}>
                    <Link to="/admin/orders" style={{ textDecoration: 'none', color: '#6b7280', fontSize: '20px' }}>&larr;</Link>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Order Details ...{order._id.substring(order._id.length - 6)}</h1>
                    {order.isDelivered ? (
                        <span style={{ padding: '6px 12px', borderRadius: '20px', backgroundColor: '#dcfce7', color: '#166534', fontWeight: '500', fontSize: '14px' }}>Delivered</span>
                    ) : (
                        <span style={{ padding: '6px 12px', borderRadius: '20px', backgroundColor: '#fef3c7', color: '#92400e', fontWeight: '500', fontSize: '14px' }}>Not Delivered</span>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 2, backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Items</h3>
                        {order.orderItems?.map((item, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {item.image && <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                    <span>{item.name} (x{item.qty})</span>
                                </div>
                                <span>{formatPrice(item.price * item.qty)}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                            <span>Shipping</span>
                            <span>{formatPrice(order.shippingPrice)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                            <span>Tax</span>
                            <span>{formatPrice(order.taxPrice)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', fontWeight: 'bold', fontSize: '18px' }}>
                            <span>Total</span>
                            <span>{formatPrice(order.totalPrice)}</span>
                        </div>
                    </div>

                    <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
                        <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Customer Info</h3>
                        <p style={{ marginBottom: '8px' }}><strong>Name:</strong> {order.user?.name || 'Unknown'}</p>
                        <p style={{ marginBottom: '8px' }}><strong>Email:</strong> <a href={`mailto:${order.user?.email}`}>{order.user?.email || 'Unknown'}</a></p>

                        <h3 style={{ margin: '20px 0 15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Shipping Address</h3>
                        {order.shippingAddress ? (
                            <p style={{ color: '#4b5563' }}>
                                {order.shippingAddress.address}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                {order.shippingAddress.country}
                            </p>
                        ) : (
                            <p style={{ color: '#4b5563' }}>No address provided</p>
                        )}

                        <div style={{ marginTop: '20px' }}>
                            {!order.isDelivered && (
                                <button
                                    onClick={handleDeliver}
                                    disabled={updating}
                                    style={{ width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: updating ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                                >
                                    {updating ? 'Updating...' : 'Mark As Delivered'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
