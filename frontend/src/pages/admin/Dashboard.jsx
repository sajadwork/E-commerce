import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { getDashboardStats } from '../../services/admin.service';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
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

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div className="loading-spinner"></div>
        </div>
    );
    
    if (error) return (
        <div className="container" style={{ padding: '80px 0' }}>
            <div className="error-message">{error}</div>
        </div>
    );

    // Map dynamic data to UI structure
    const stats = [
        { label: "Total Revenue", value: `$${statsData?.totalSales?.toLocaleString() || '0.00'}`, icon: "currency-dollar", color: "green" },
        { label: "Total Orders", value: statsData?.orders || 0, icon: "shopping-bag", color: "blue" },
        { label: "Total Customers", value: statsData?.users || 0, icon: "users-three", color: "orange" },
        { label: "Total Products", value: statsData?.products || 0, icon: "package", color: "purple" }
    ];

    return (
        <div className="admin-page">
            <div className="container">
                <div className="dashboard-container">
                    <AdminSidebar />
                    
                    <main className="dashboard-main">
                        <header className="dashboard-header" style={{ marginBottom: '32px' }}>
                            <h1 className="page-title" style={{ marginBottom: '8px' }}>Admin Dashboard</h1>
                            <p style={{ color: 'var(--text-light)' }}>Welcome back! Here's what's happening today.</p>
                        </header>

                        {/* Stats Grid */}
                        <div className="stats-grid" style={{ marginBottom: '40px' }}>
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-card">
                                    <div className={`stat-icon bg-${stat.color}`}>
                                        <i className={`ph ph-${stat.icon}`}></i>
                                    </div>
                                    <div className="stat-info">
                                        <p>{stat.label}</p>
                                        <h3>{stat.value}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Actions / Recent Activity Placeholder */}
                        <section>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '24px' }}>Quick Management</h2>
                            <div className="admin-actions-grid">
                                <Link to="/admin/products" className="admin-action-card">
                                    <i className="ph ph-package"></i>
                                    <span>Products</span>
                                </Link>
                                <Link to="/admin/orders" className="admin-action-card">
                                    <i className="ph ph-shopping-bag"></i>
                                    <span>Orders</span>
                                </Link>
                                <Link to="/admin/users" className="admin-action-card">
                                    <i className="ph ph-users"></i>
                                    <span>Users</span>
                                </Link>
                                <Link to="/admin/reviews" className="admin-action-card">
                                    <i className="ph ph-star"></i>
                                    <span>Reviews</span>
                                </Link>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
