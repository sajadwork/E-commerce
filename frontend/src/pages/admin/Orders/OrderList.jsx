import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../../components/AdminSidebar';
import OrderStatus from '../../../components/OrderStatus';
import { formatPrice } from '../../../utils/formatPrice';

const mockOrders = [
    { id: 'ORD-101', customer: 'John Doe', date: '2026-03-01', total: 129.50, status: 'Delivered' },
    { id: 'ORD-102', customer: 'Jane Smith', date: '2026-03-02', total: 299.00, status: 'Processing' },
    { id: 'ORD-103', customer: 'Mike Johnson', date: '2026-03-03', total: 89.00, status: 'Shipped' },
];

const OrderList = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Orders</h1>

                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>Order ID</th>
                                <th style={{ padding: '12px' }}>Customer</th>
                                <th style={{ padding: '12px' }}>Date</th>
                                <th style={{ padding: '12px' }}>Total</th>
                                <th style={{ padding: '12px' }}>Status</th>
                                <th style={{ padding: '12px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockOrders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '12px', fontWeight: '500' }}>#{order.id}</td>
                                    <td style={{ padding: '12px' }}>{order.customer}</td>
                                    <td style={{ padding: '12px', color: '#6b7280' }}>{order.date}</td>
                                    <td style={{ padding: '12px' }}>{formatPrice(order.total)}</td>
                                    <td style={{ padding: '12px' }}><OrderStatus status={order.status} /></td>
                                    <td style={{ padding: '12px' }}>
                                        <Link to={`/admin/orders/${order.id}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
