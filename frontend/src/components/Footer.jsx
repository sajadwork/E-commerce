import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer" style={{ backgroundColor: 'white', borderTop: '1px solid var(--border-color)', padding: '60px 0 20px', marginTop: 'auto' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>

                    {/* Brand Col */}
                    <div>
                        <div className="logo" style={{ marginBottom: '20px' }}>
                            <div className="logo-icon"></div>
                            <span className="brand-name">E-commerce</span>
                        </div>
                        <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>
                            High-quality tech products for your modern lifestyle.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            {/* Social Icons Placeholder */}
                            <a href="#" style={{ color: 'var(--text-light)', fontSize: '1.2rem' }}><i className="ph ph-facebook-logo"></i></a>
                            <a href="#" style={{ color: 'var(--text-light)', fontSize: '1.2rem' }}><i className="ph ph-twitter-logo"></i></a>
                            <a href="#" style={{ color: 'var(--text-light)', fontSize: '1.2rem' }}><i className="ph ph-instagram-logo"></i></a>
                        </div>
                    </div>

                    {/* Links Col 1 */}
                    <div>
                        <h4 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Shop</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><a href="#" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>All Products</a></li>
                            <li><a href="#" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Smart Home</a></li>
                            <li><a href="#" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Audio</a></li>
                        </ul>
                    </div>

                    {/* Links Col 2 */}
                    <div>
                        <h4 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Company</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><a href="#" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>About Us</a></li>
                            <li><a href="#" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Contact</a></li>
                            <li><a href="#" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                    <p>&copy; 2026 E-commerce. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
