
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Reset password for:', email);
        // Add reset logic here
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Reset Password</h2>
                <p>Enter your email and we'll send you a link to reset your password.</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-btn">Send Reset Link</button>
                </form>

                <div className="auth-links">
                    <Link to="/login">Back to Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
