
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { useFormatPrice } from '../../hooks/useFormatPrice';
import { createOrder } from '../../services/order.service';

const Checkout = () => {
    const { settings } = useSettings();
    const formatPrice = useFormatPrice();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const directBuyItem = location.state?.directBuy;
    const itemsToCheckout = directBuyItem ? [directBuyItem] : cartItems;
    const [form, setForm] = useState({
        address: '',
        city: '',
        zip: '',
        country: '',
        card: ''
    });
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            setError("You must be logged in to place an order.");
            return;
        }

        setIsPlacingOrder(true);
        setError(null);
        
        try {
            const orderItems = itemsToCheckout.map(item => ({
                name: item.product.name,
                qty: item.quantity,
                image: item.product.image,
                price: item.product.price,
                product: item.product.id // backend expects product reference ID
            }));

            const subtotal = directBuyItem ? (directBuyItem.product.price * directBuyItem.quantity) : getCartTotal();
            const shipping = 10;
            const tax = 0; // Simplified for demo
            
            const orderData = {
                orderItems,
                shippingAddress: {
                    address: form.address,
                    city: form.city,
                    postalCode: form.zip,
                    country: form.country || 'USA' // Default if not provided
                },
                paymentMethod: 'Credit Card',
                itemsPrice: subtotal,
                taxPrice: tax,
                shippingPrice: shipping,
                totalPrice: subtotal + shipping + tax
            };

            await createOrder(orderData);
            if (!directBuyItem) {
                clearCart();
            }
            navigate('/order-success');
        } catch (err) {
            setError(err.message || 'Failed to place order.');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (itemsToCheckout.length === 0) {
        return (
            <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px' }}>Your checkout is empty</h2>
                <Link to="/" className="btn-buy-now-large" style={{ display: 'inline-flex', maxWidth: '240px' }}>
                    Start Shopping
                </Link>
            </div>
        );
    }

    const total = directBuyItem ? (directBuyItem.product.price * directBuyItem.quantity) : getCartTotal();

    return (
        <div className="checkout-page">
            <div className="container">
                <header style={{ marginBottom: '48px' }}>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-color)', margin: '0 0 8px' }}>
                        Checkout
                    </h1>
                    <div className="breadcrumb">
                        <Link to="/cart">Cart</Link> / <span>Checkout</span>
                    </div>
                </header>

                <div className="checkout-grid">
                    <div className="checkout-form-section">
                        <div className="form-card">
                            <h2>Shipping Information</h2>
                            {error && <div className="error-state" style={{ padding: '12px', marginBottom: '24px' }}>{error}</div>}
                            
                            <form onSubmit={handleSubmit} className="checkout-form">
                                <div className="form-group">
                                    <label>Street Address</label>
                                    <input 
                                        name="address" 
                                        value={form.address} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="123 Modern St."
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input name="city" value={form.city} onChange={handleChange} required placeholder="San Francisco" />
                                    </div>
                                    <div className="form-group">
                                        <label>Zip Code</label>
                                        <input name="zip" value={form.zip} onChange={handleChange} required placeholder="94103" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <input name="country" value={form.country} onChange={handleChange} required placeholder="United States" />
                                </div>

                                <div style={{ marginTop: '16px' }}>
                                    <h2 style={{ margin: '0 0 24px' }}>Payment Details</h2>
                                    <div className="form-group">
                                        <label>Card Number</label>
                                        <input 
                                            name="card" 
                                            value={form.card} 
                                            onChange={handleChange} 
                                            placeholder="**** **** **** ****" 
                                            required 
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isPlacingOrder}
                                    className="btn-buy-now-large"
                                    style={{ width: '100%', marginTop: '16px' }}
                                >
                                    {isPlacingOrder ? 'Processing Order...' : `Complete Order — ${formatPrice(total + 10)}`}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="cart-summary">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '24px' }}>Order Summary</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {itemsToCheckout.map(item => (
                                <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                                    <span style={{ fontSize: '0.95rem', color: 'var(--text-color)' }}>
                                        {item.product.name} <span style={{ color: 'var(--text-light)' }}>x {item.quantity}</span>
                                    </span>
                                    <span style={{ fontWeight: '600' }}>{formatPrice(item.product.price * item.quantity)}</span>
                                </div>
                            ))}
                            <div style={{ margin: '8px 0', borderTop: '1px solid var(--border-color)' }}></div>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{formatPrice(10)}</span>
                            </div>
                            <div className="summary-row total" style={{ marginTop: '16px', paddingTop: '16px' }}>
                                <span>Total</span>
                                <span>{formatPrice(total + 10)}</span>
                            </div>
                        </div>
                        
                        <div style={{ marginTop: '32px', padding: '20px', background: 'var(--light-gray)', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <i className="ph ph-shield-check" style={{ fontSize: '1.5rem', color: '#10b981' }}></i>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: '1.4' }}>
                                Your transaction is secure. We use high-level encryption to protect your data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

