
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const Login = () => {
    const { settings } = useSettings();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = await login(email, password);
            navigate(user.role === 'admin' ? '/admin/dashboard' : '/');
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p>Please enter your details to sign in.</p>
                
                {settings.maintenanceMode && (
                    <div className="maintenance-alert" style={{ 
                        padding: '16px', 
                        backgroundColor: '#fff5f5', 
                        color: '#c53030', 
                        borderRadius: 'var(--radius-md)', 
                        marginBottom: '24px',
                        border: '1px solid #feb2b2',
                        textAlign: 'center'
                    }}>
                        <i className="ph-fill ph-warning" style={{ fontSize: '1.2rem', marginBottom: '8px', display: 'block' }}></i>
                        <strong style={{ display: 'block' }}>System Under Maintenance</strong>
                        <span style={{ fontSize: '0.85rem' }}>We're currently performing scheduled maintenance. Please try again later.</span>
                    </div>
                )}
                
                {error && (
                    <div className="error-state" style={{ padding: '12px', marginBottom: '24px', fontSize: '0.9rem' }}>
                        <i className="ph ph-warning-circle"></i> {error}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-btn">Sign In</button>
                </form>

                <div className="auth-links">
                    <Link to="/forgot-password">Forgot Password?</Link>
                    <span>Don't have an account? <Link to="/register">Sign up for free</Link></span>
                </div>
            </div>
        </div>
    );
};

export default Login;

