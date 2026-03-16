
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Reset password for:', email);
        setIsSubmitted(true);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                {!isSubmitted ? (
                    <>
                        <h2>Reset Password</h2>
                        <p>Enter your email and we'll send you a link to reset your password.</p>

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

                            <button type="submit" className="auth-btn">Send Reset Link</button>
                        </form>
                    </>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                            width: '80px', 
                            height: '80px', 
                            background: 'rgba(16, 185, 129, 0.1)', 
                            color: '#10b981', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            margin: '0 auto 24px',
                            fontSize: '2rem'
                        }}>
                            <i className="ph ph-check-circle"></i>
                        </div>
                        <h2>Link Sent!</h2>
                        <p>Check your email for instructions to reset your password.</p>
                    </div>
                )}

                <div className="auth-links">
                    <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <i className="ph ph-arrow-left"></i> Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

