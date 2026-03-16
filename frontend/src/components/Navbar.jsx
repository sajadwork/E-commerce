
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const Navbar = ({ hideDesktop = false }) => {
    const { settings } = useSettings();
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cartCount = cartItems.length;
    const wishlistCount = wishlistItems.length;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <>
            {/* Desktop/Tablet Top Navbar */}
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} style={hideDesktop ? { display: 'none' } : {}}>
                <div className="container navbar-content">
                    <Link to="/" className="logo">
                        <div className="logo-icon"></div>
                        <span className="brand-name">{settings.storeName}</span>
                    </Link>
                    
                    <ul className="nav-links">
                        <li><Link to="/" className={isActive('/')}>Beranda</Link></li>
                        <li><Link to="/shop" className={isActive('/shop')}>Shop</Link></li>
                        <li><Link to="/blog" className={isActive('/blog')}>Blog</Link></li>
                    </ul>

                    <div className="nav-icons">
                        <button className="icon-btn" aria-label="Search">
                            <i className="ph ph-magnifying-glass"></i>
                        </button>
                        
                        <div className="cart-container">
                            <Link to="/cart" className="icon-btn" aria-label="Cart">
                                <i className="ph ph-shopping-cart"></i>
                                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                            </Link>
                        </div>

                        {user ? (
                            <div className="user-dropdown-container">
                                <div className="profile-trigger">
                                    <div className="user-avatar">
                                        <i className="ph ph-user"></i>
                                    </div>
                                    <i className="ph ph-caret-down"></i>
                                </div>
                                
                                <div className="user-dropdown-menu">
                                    <div className="dropdown-header">Your Account</div>
                                    
                                    <Link to="/profile" className="dropdown-item">
                                        <i className="ph ph-user-circle"></i>
                                        My Profile
                                    </Link>
                                    
                                    <Link to="/orders" className="dropdown-item">
                                        <i className="ph ph-package"></i>
                                        Orders
                                    </Link>
                                    
                                    <Link to="/wishlist" className="dropdown-item">
                                        <i className="ph ph-heart"></i>
                                        Wishlist
                                    </Link>
                                    
                                    <Link to="/notifications" className="dropdown-item">
                                        <i className="ph ph-bell"></i>
                                        Notifications
                                    </Link>
                                    
                                    {user.isAdmin && (
                                        <Link to="/admin" className="dropdown-item">
                                            <i className="ph ph-shield-check"></i>
                                            Admin Panel
                                        </Link>
                                    )}
                                    
                                    <button onClick={handleLogout} className="dropdown-item logout">
                                        <i className="ph ph-sign-out"></i>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="icon-btn" aria-label="Login">
                                <i className="ph ph-user"></i>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <nav className="mobile-bottom-nav">
                <Link to="/" className={`mobile-nav-item ${isActive('/')}`}>
                    <i className="ph ph-house"></i>
                </Link>
                <Link to="/wishlist" className={`mobile-nav-item ${isActive('/wishlist')}`}>
                    <i className="ph ph-heart"></i>
                </Link>
                <Link to="/cart" className={`mobile-nav-item ${isActive('/cart')}`}>
                    <i className="ph ph-shopping-cart"></i>
                </Link>
                <Link to="/chat" className={`mobile-nav-item ${isActive('/chat')}`}>
                    <i className="ph ph-chat-circle"></i>
                </Link>
                <Link to="/profile" className={`mobile-nav-item ${isActive('/profile')}`}>
                    <i className="ph ph-user"></i>
                </Link>
            </nav>
        </>
    );
};

export default Navbar;

