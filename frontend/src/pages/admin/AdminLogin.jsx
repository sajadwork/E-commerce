import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const user = await login(email, password);
            if (user && user.role === 'admin') {
                console.log("Admin logged in successfully");
                navigate('/admin/dashboard');
            } else {
                setError("Access denied. You are not an admin.");
            }
        } catch (err) {
            setError(err.message || 'Failed to login');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Admin Portal</h2>
                <p>Please log in to manage your store.</p>

                {error && <div className="error-message">{error}</div>}

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="admin@ecommerce.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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
