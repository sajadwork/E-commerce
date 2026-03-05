
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-col brand-col">
                    <div className="logo">
                        <span className="brand-name">Stuffus</span>
                    </div>
                </div>
                <div className="footer-col">
                    <h4>About</h4>
                    <ul>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/team">Meet The Team</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Support</h4>
                    <ul>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/shipping">Shipping</Link></li>
                        <li><Link to="/return">Return</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Social</h4>
                    <div className="social-icons">
                        <a href="#"><i className="ph ph-x-logo"></i></a>
                        <a href="#"><i className="ph ph-facebook-logo"></i></a>
                        <a href="#"><i className="ph ph-linkedin-logo"></i></a>
                        <a href="#"><i className="ph ph-instagram-logo"></i></a>
                    </div>
                </div>
            </div>
            <div className="container footer-bottom">
                <p>&copy; 2026 Stuffus. All Rights Reserved.</p>
                <div className="footer-links">
                    <Link to="/terms">Terms of Service</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
