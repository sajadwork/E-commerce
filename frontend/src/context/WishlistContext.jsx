import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const wishlistKey = user && user.email ? `wishlistItems_${user.email}` : 'wishlistItems_guest';
    const prevWishlistKeyRef = useRef(wishlistKey);

    const [toastMessage, setToastMessage] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);
    const toastTimeoutRef = useRef(null);

    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedWishlist = localStorage.getItem(wishlistKey);
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    if (wishlistKey !== prevWishlistKeyRef.current) {
        const savedWishlist = localStorage.getItem(wishlistKey);
        setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
        prevWishlistKeyRef.current = wishlistKey;
    }

    useEffect(() => {
        localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
    }, [wishlistItems, wishlistKey]);

    const addToWishlist = (product) => {
        setWishlistItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                // If it already exists, remove it (toggle behavior)
                const newItems = prev.filter(item => item.id !== product.id);
                showToast(`${product.name} removed from wishlist`);
                return newItems;
            }
            // Add if it doesn't exist
            showToast(`${product.name} added to wishlist`);
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems(prev => {
            const product = prev.find(item => item.id === productId);
            if (product) {
                showToast(`${product.name} removed from wishlist`);
            }
            return prev.filter(item => item.id !== productId);
        });
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId);
    };

    const clearWishlist = () => setWishlistItems([]);

    const showToast = (message) => {
        setToastMessage(message);
        setIsToastVisible(true);

        if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
        }

        toastTimeoutRef.current = setTimeout(() => {
            setIsToastVisible(false);
            setTimeout(() => setToastMessage(''), 400); // clear text after animation
        }, 3000);
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            clearWishlist
        }}>
            {children}
            {/* Dedicated Wishlist Toast Component */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '80px', /* slightly higher than cart toast to prevent complete overlap */
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
                <i className="ph-fill ph-heart" style={{ color: '#ff3b30', fontSize: '1.2rem' }}></i>
                {toastMessage}
            </div>
        </WishlistContext.Provider>
    );
};
