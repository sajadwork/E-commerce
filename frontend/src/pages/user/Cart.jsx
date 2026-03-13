import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import { formatPrice } from '../../utils/formatPrice';

const Cart = () => {
    const { user } = useAuth();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const subtotal = getCartTotal();
    const shipping = 10.00;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center', minHeight: '60vh' }}>
                <i className="ph ph-shopping-cart" style={{ fontSize: '4rem', color: '#ccc', marginBottom: '16px' }}></i>
                <h2>Your Cart is Empty</h2>
                <p style={{ color: '#666', marginBottom: '24px' }}>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="btn-buy" style={{ display: 'inline-block', backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none' }}>Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container cart-page" style={{ padding: '0px 20px 40px 20px' }}>
            <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '40px', paddingBottom: '30px', borderBottom: '1px solid #eee', marginBottom: '30px' }}>
                <h1 className="page-title" style={{ margin: 0 }}>Shopping Cart ({cartItems.length})</h1>
                <button onClick={clearCart} style={{ color: '#ef4444', backgroundColor: 'transparent', border: '1px solid #ef4444', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Clear Cart</button>
            </div>

            <div className="cart-layout" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {/* Cart Items List */}
                <div className="cart-items" style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {cartItems.map(item => (
                        <CartItem key={item.product.id} item={item} />
                    ))}
                </div>

                {/* Order Summary */}
                <div className="cart-summary" style={{ position: 'sticky', top: '120px', flex: '1', minWidth: '300px', backgroundColor: '#f9fafb', padding: '30px', borderRadius: '8px', height: 'fit-content' }}>
                    <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>Order Summary</h2>
                    <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <span>Shipping</span>
                        <span>{formatPrice(shipping)}</span>
                    </div>
                    <div className="divider" style={{ borderTop: '1px solid #e5e7eb', margin: '15px 0' }}></div>
                    <div className="summary-row total" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', fontSize: '18px', fontWeight: 'bold' }}>
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                    {user ? (
                        <button onClick={() => navigate('/checkout')} className="btn-checkout" style={{ width: '100%', padding: '15px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Proceed to Checkout
                        </button>
                    ) : (
                        <button onClick={() => navigate('/login')} className="btn-checkout" style={{ width: '100%', padding: '15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Login to Checkout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
