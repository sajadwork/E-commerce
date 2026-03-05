import React from 'react';

const OrderStatus = ({ status }) => {
    const getStatusConfig = () => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return { icon: 'check-circle', color: '#10b981', bg: '#d1fae5' };
            case 'processing':
                return { icon: 'arrows-clockwise', color: '#3b82f6', bg: '#dbeafe' };
            case 'shipped':
                return { icon: 'truck', color: '#f59e0b', bg: '#fef3c7' };
            case 'cancelled':
                return { icon: 'x-circle', color: '#ef4444', bg: '#fee2e2' };
            default:
                return { icon: 'clock', color: '#6b7280', bg: '#f3f4f6' };
        }
    };

    const config = getStatusConfig();

    return (
        <span className="order-status-badge" style={{ color: config.color, backgroundColor: config.bg, padding: '4px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: '500' }}>
            <i className={`ph ph-${config.icon}`}></i>
            {status}
        </span>
    );
};

export default OrderStatus;
