import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getDashboardStats } from '../../services/admin.service';

const Dashboard = () => {
    const { user } = useAuth();
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats(user.token);
                setStatsData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchStats();
    }, [user.token]);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading dashboard data...</div>;
    if (error) return <div style={{ padding: '40px', color: 'red' }}>Error: {error}</div>;

    // Map dynamic data to UI structure
    const stats = [
        { label: "Total Sales", value: `$${statsData?.totalSales?.toFixed(2) || '0.00'}`, icon: "currency-dollar-simple", color: "green" },
        { label: "Total Orders", value: statsData?.orders || 0, icon: "shopping-cart", color: "blue" },
        { label: "Total Users", value: statsData?.users || 0, icon: "users", color: "orange" },
        { label: "Total Products", value: statsData?.products || 0, icon: "package", color: "purple" }
    ];

    return (
        <div className="container admin-page">
            <h1 className="page-title">Admin Dashboard</h1>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className={`stat-icon bg-${stat.color}`}>
                            <i className={`ph ph-${stat.icon}`}></i>
                        </div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="admin-actions-grid">
                <Link to="/admin/products" className="admin-action-card">
                    <i className="ph ph-package"></i>
                    <span>Manage Products</span>
                </Link>
                <Link to="/admin/orders" className="admin-action-card">
                    <i className="ph ph-shopping-bag"></i>
                    <span>View Orders</span>
                </Link>
                <Link to="/admin/users" className="admin-action-card">
                    <i className="ph ph-users"></i>
                    <span>Manage Users</span>
                </Link>
                <Link to="/admin/settings" className="admin-action-card">
                    <i className="ph ph-gear"></i>
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
