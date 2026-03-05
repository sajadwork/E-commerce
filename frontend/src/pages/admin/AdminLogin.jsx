
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login logic
        console.log("Admin logged in");
        navigate('/admin/dashboard');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Admin Portal</h2>
                <p>Please log in to manage your store.</p>

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="admin@stuffus.com" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" required />
                    </div>

                    <button type="submit" className="auth-btn">Access Dashboard</button>

                    <div className="auth-links">
                        <Link to="/">Back to Store</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
