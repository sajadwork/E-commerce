import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/formatPrice';
import { createOrder } from '../../services/order.service';

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
        return <div style={{ padding: '40px', textAlign: 'center' }}><h2>Your checkout is empty.</h2></div>;
    }

    const total = directBuyItem ? (directBuyItem.product.price * directBuyItem.quantity) : getCartTotal();

    return (
        <div className="container" style={{ padding: '40px 20px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
                <h2>Checkout</h2>
                {error && <div style={{ padding: '10px', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '4px', marginBottom: '15px' }}>{error}</div>}
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
                        <div style={{ flex: '1' }}>
                            <label>Country</label>
                            <input name="country" value={form.country} onChange={handleChange} required style={{ width: '100%', padding: '10px' }} />
                        </div>
                    </div>
                    <div>
                        <label>Card Number</label>
                        <input name="card" value={form.card} onChange={handleChange} placeholder="**** **** **** ****" required style={{ width: '100%', padding: '10px' }} />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isPlacingOrder}
                        style={{ 
                            padding: '15px', 
                            backgroundColor: '#3b82f6', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            fontWeight: 'bold', 
                            cursor: isPlacingOrder ? 'not-allowed' : 'pointer', 
                            marginTop: '10px',
                            opacity: isPlacingOrder ? 0.7 : 1
                        }}>
                        {isPlacingOrder ? 'Processing...' : `Place Order (${formatPrice(total + 10)})`}
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
