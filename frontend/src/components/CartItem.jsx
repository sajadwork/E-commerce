
import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { useFormatPrice } from '../hooks/useFormatPrice';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCart();
    const formatPrice = useFormatPrice();
    const { product, quantity } = item;

    return (
        <div className="cart-item">
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="cart-item-image" />
            </Link>
            <div className="cart-item-details">
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h4>{product.name}</h4>
                </Link>
                <p className="cart-item-category">{product.category}</p>
                <div className="cart-item-price">{formatPrice(product.price)}</div>
            </div>
            <div className="cart-item-actions">
                <div className="qty-controls">
                    <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(product.id, quantity - 1)} 
                        disabled={quantity <= 1}
                    >
                        <i className="ph ph-minus"></i>
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                        <i className="ph ph-plus"></i>
                    </button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(product.id)} title="Remove item">
                    <i className="ph ph-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default CartItem;

