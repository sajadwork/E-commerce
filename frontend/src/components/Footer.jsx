import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const Footer = () => {
    const { settings } = useSettings();
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">

                    {/* Brand Col */}
                    <div className="footer-brand">
                        <Link to="/" className="logo">
                            <div className="logo-icon"></div>
                            <span className="brand-name">{settings.storeName}</span>
                        </Link>
                        <p>
                            High-quality tech products for your modern lifestyle.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon" aria-label="Facebook"><i className="ph ph-facebook-logo"></i></a>
                            <a href="#" className="social-icon" aria-label="Twitter"><i className="ph ph-twitter-logo"></i></a>
                            <a href="#" className="social-icon" aria-label="Instagram"><i className="ph ph-instagram-logo"></i></a>
                        </div>
                    </div>

                    {/* Links Col 1 */}
                    <div>
                        <h4 className="footer-heading">Shop</h4>
                        <ul className="footer-links">
                            <li><Link to="/shop">All Products</Link></li>
                            <li><Link to="/categories/smart-home">Smart Home</Link></li>
                            <li><Link to="/categories/audio">Audio</Link></li>
                        </ul>
                    </div>

                    {/* Links Col 2 */}
                    <div>
                        <h4 className="footer-heading">Company</h4>
                        <ul className="footer-links">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 {settings.storeName}. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

