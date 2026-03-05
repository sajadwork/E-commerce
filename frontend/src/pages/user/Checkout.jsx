import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/formatPrice';

const Checkout = () => {
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
        card: ''
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock order placement
        if (!directBuyItem) {
            clearCart();
        }
        navigate('/order-success');
    };

    if (itemsToCheckout.length === 0) {
        return <div style={{ padding: '40px', textAlign: 'center' }}><h2>Your checkout is empty.</h2></div>;
    }

    const total = directBuyItem ? (directBuyItem.product.price * directBuyItem.quantity) : getCartTotal();

    return (
        <div className="container" style={{ padding: '40px 20px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
                <h2>Checkout</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    <div>
                        <label>Shipping Address</label>
                        <input name="address" value={form.address} onChange={handleChange} required style={{ width: '100%', padding: '10px' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: '1' }}>
                            <label>City</label>
                            <input name="city" value={form.city} onChange={handleChange} required style={{ width: '100%', padding: '10px' }} />
                        </div>
                        <div style={{ flex: '1' }}>
                            <label>Zip Code</label>
                            <input name="zip" value={form.zip} onChange={handleChange} required style={{ width: '100%', padding: '10px' }} />
                        </div>
                    </div>
                    <div>
                        <label>Card Number</label>
                        <input name="card" value={form.card} onChange={handleChange} placeholder="**** **** **** ****" required style={{ width: '100%', padding: '10px' }} />
                    </div>
                    <button type="submit" style={{ padding: '15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                        Place Order ({formatPrice(total + 10)})
                    </button>
                </form>
            </div>

            <div style={{ width: '350px', backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', height: 'fit-content' }}>
                <h3>Order Summary</h3>
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {itemsToCheckout.map(item => (
                        <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{item.product.name} x {item.quantity}</span>
                            <span>{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                    ))}
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Subtotal</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Shipping</span>
                        <span>$10.00</span>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
                        <span>Total</span>
                        <span>{formatPrice(total + 10)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
