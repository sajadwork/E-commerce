import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCart();
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
                <div className="quantity-controls">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} disabled={quantity <= 1}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(product.id)}>
                    <i className="ph ph-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default CartItem;
