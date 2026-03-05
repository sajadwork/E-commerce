
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
    const location = useLocation();
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();

    const cartCount = cartItems.length;
    const wishlistCount = wishlistItems.length;

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <>
            {/* Desktop/Tablet Top Navbar */}
            <nav className="navbar">
                <div className="container navbar-content">
                    <div className="logo">
                        <div className="logo-icon"></div>
                        <span className="brand-name">Stuffus</span>
                    </div>
                    <ul className="nav-links">
                        <li><Link to="/" className={isActive('/')}>Beranda</Link></li>
                        <li><Link to="/shop" className={isActive('/shop')}>Shop</Link></li>
                        <li><Link to="/blog" className={isActive('/blog')}>Blog</Link></li>
                    </ul>
                    <div className="nav-icons">
                        <button className="icon-btn"><i className="ph ph-magnifying-glass"></i></button>
                        <div className="cart-container">
                            <Link to="/wishlist" className="icon-btn">
                                <i className="ph ph-heart"></i>
                            </Link>
                            {wishlistCount > 0 && <span className="cart-badge" style={{ backgroundColor: '#ff3b30' }}>{wishlistCount}</span>}
                        </div>
                        <div className="cart-container">
                            <Link to="/cart" className="icon-btn">
                                <i className="ph ph-shopping-cart"></i>
                            </Link>
                            <span className="cart-badge">{cartCount}</span>
                        </div>
                        <div className="user-avatar">
                            <Link to="/profile">
                                <div className="avatar-placeholder">U</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <nav className="mobile-bottom-nav">
                <Link to="/" className={`mobile-nav-item ${isActive('/')}`}>
                    <i className="ph ph-house"></i>
                </Link>
                <div className="mobile-nav-item cart-item">
                    <Link to="/wishlist">
                        <div className="mobile-cart-btn">
                            <i className="ph ph-heart"></i>
                            {wishlistCount > 0 && <span className="mobile-cart-badge" style={{ backgroundColor: '#ff3b30' }}>{wishlistCount}</span>}
                        </div>
                    </Link>
                </div>
                <div className="mobile-nav-item cart-item">
                    <Link to="/cart">
                        <div className="mobile-cart-btn">
                            <i className="ph ph-shopping-cart"></i>
                            {cartCount > 0 && <span className="mobile-cart-badge">{cartCount}</span>}
                        </div>
                    </Link>
                </div>
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
