import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const cartKey = user && user.email ? `cartItems_${user.email}` : 'cartItems_guest';
    const prevCartKeyRef = useRef(cartKey);

    const [toastMessage, setToastMessage] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);
    const toastTimeoutRef = useRef(null);

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem(cartKey);
        return savedCart ? JSON.parse(savedCart) : [];
    });

    if (cartKey !== prevCartKeyRef.current) {
        const savedCart = localStorage.getItem(cartKey);
        setCartItems(savedCart ? JSON.parse(savedCart) : []);
        prevCartKeyRef.current = cartKey;
    }

    useEffect(() => {
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }, [cartItems, cartKey]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { product, quantity }];
        });

        // Trigger Toast
        setToastMessage(`${product.name} saved to cart`);
        setIsToastVisible(true);

        if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
        }

        toastTimeoutRef.current = setTimeout(() => {
            setIsToastVisible(false);
            setTimeout(() => setToastMessage(''), 400); // clear text after animation
        }, 3000);
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCartItems(prev => prev.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setCartItems([]);

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
            {children}
            {/* Global Toast Component (Inline styles to ensure visibility) */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    left: '50%',
                    transform: `translateX(-50%) translateY(${isToastVisible ? '0' : '100px'})`,
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '999px',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                    zIndex: 999999,
                    opacity: isToastVisible ? 1 : 0,
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    pointerEvents: 'none'
                }}
            >
                <i className="ph-fill ph-check-circle" style={{ color: '#4ade80', fontSize: '1.2rem' }}></i>
                {toastMessage}
            </div>
        </CartContext.Provider>
    );
};
