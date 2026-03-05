
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    // Demo Statistics
    const stats = [
        { label: "Total Sales", value: "$12,450", icon: "currency-dollar-simple", color: "green" },
        { label: "Total Orders", value: "345", icon: "shopping-cart", color: "blue" },
        { label: "New Users", value: "56", icon: "users", color: "orange" },
        { label: "Pending Reviews", value: "12", icon: "star", color: "purple" }
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
