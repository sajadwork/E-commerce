
import React from 'react';

const OrderStatus = ({ status }) => {
    const getStatusConfig = () => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return { icon: 'check-circle', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' };
            case 'processing':
                return { icon: 'arrows-clockwise', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' };
            case 'shipped':
                return { icon: 'truck', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' };
            case 'cancelled':
                return { icon: 'x-circle', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' };
            default:
                return { icon: 'clock', color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' };
        }
    };

    const config = getStatusConfig();

    return (
        <span className="order-status-badge" style={{ color: config.color, backgroundColor: config.bg }}>
            <i className={`ph ph-${config.icon}`}></i>
            {status}
        </span>
    );
};

export default OrderStatus;

