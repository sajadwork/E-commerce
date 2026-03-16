
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import { useFormatPrice } from '../../hooks/useFormatPrice';

const Cart = () => {
    const { user } = useAuth();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const formatPrice = useFormatPrice();
    const navigate = useNavigate();

    const subtotal = getCartTotal();
    const shipping = cartItems.length > 0 ? 10.00 : 0;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ padding: '120px 0', textAlign: 'center', minHeight: '60vh' }}>
                <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    background: 'var(--light-gray)', 
                    borderRadius: 'var(--radius-full)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 32px' 
                }}>
                    <i className="ph ph-shopping-cart" style={{ fontSize: '3.5rem', color: 'var(--text-light)' }}></i>
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px', color: 'var(--primary-color)' }}>Your Cart is Empty</h2>
                <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', marginBottom: '40px', maxWidth: '400px', margin: '0 auto 40px' }}>
                    Looks like you haven't added anything to your cart yet. Discover something new today!
                </p>
                <Link to="/" className="btn-buy-now-large" style={{ display: 'inline-flex', maxWidth: '240px' }}>
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-color)', margin: 0 }}>
                        Shopping Cart <span style={{ fontSize: '1.2rem', color: 'var(--text-light)', fontWeight: '500' }}>({cartItems.length} items)</span>
                    </h1>
                    <button 
                        onClick={clearCart} 
                        style={{ 
                            color: '#ef4444', 
                            backgroundColor: 'white', 
                            border: '1px solid #ef4444', 
                            padding: '10px 20px', 
                            borderRadius: 'var(--radius-md)', 
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={e => { e.currentTarget.style.backgroundColor = '#ef4444'; e.currentTarget.style.color = 'white'; }}
                        onMouseOut={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#ef4444'; }}
                    >
                        <i className="ph ph-trash"></i> Clear Cart
                    </button>
                </div>

                <div className="cart-layout">
                    {/* Cart Items List */}
                    <div className="cart-items" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {cartItems.map(item => (
                            <CartItem key={item.product.id} item={item} />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="cart-summary">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '32px', color: 'var(--primary-color)' }}>Order Summary</h2>
                        
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{formatPrice(shipping)}</span>
                        </div>
                        
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>

                        {user ? (
                            <button 
                                onClick={() => navigate('/checkout')} 
                                className="btn-buy-now-large" 
                                style={{ width: '100%', marginTop: '32px' }}
                            >
                                Proceed to Checkout
                            </button>
                        ) : (
                            <button 
                                onClick={() => navigate('/login')} 
                                className="btn-add-cart-large" 
                                style={{ width: '100%', marginTop: '32px' }}
                            >
                                Login to Checkout
                            </button>
                        )}

                        <div style={{ marginTop: '24px', textAlign: 'center' }}>
                            <Link to="/" style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none' }}>
                                <i className="ph ph-arrow-left"></i> Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

