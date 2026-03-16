
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const Register = () => {
    const { settings } = useSettings();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p>Join our premium tech community today.</p>

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
                        <span style={{ fontSize: '0.85rem' }}>Registration is temporarily disabled for maintenance. Please check back later.</span>
                    </div>
                )}
                
                {error && (
                    <div className="error-state" style={{ padding: '12px', marginBottom: '24px', fontSize: '0.9rem' }}>
                        <i className="ph ph-warning-circle"></i> {error}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-btn">Sign Up</button>
                </form>

                <div className="auth-links">
                    <span>Already have an account? <Link to="/login">Sign in here</Link></span>
                </div>
            </div>
        </div>
    );
};

export default Register;

