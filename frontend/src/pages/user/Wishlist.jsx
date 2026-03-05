import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (wishlistItems.length === 0) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center', minHeight: '60vh' }}>
                <i className="ph ph-heart" style={{ fontSize: '4rem', color: '#ccc', marginBottom: '16px' }}></i>
                <h2>Your Wishlist is Empty</h2>
                <p style={{ color: '#666', marginBottom: '24px' }}>Save items you like to your wishlist. Review them anytime and easily move them to cart.</p>
                <Link to="/" className="btn-buy" style={{ display: 'inline-block', backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none' }}>Explore Products</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
            <h1 className="page-title" style={{ marginBottom: '30px' }}>My Wishlist ({wishlistItems.length})</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {wishlistItems.map(item => (
                    <div key={item.id} style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '200px', backgroundColor: '#f3f4f6', position: 'relative' }}>
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button onClick={() => removeFromWishlist(item.id)} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444' }}>
                                <i className="ph-fill ph-heart"></i>
                            </button>
                        </div>
                        <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>{item.name}</h3>
                            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '10px' }}>{item.category}</p>
                            <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#3b82f6', marginBottom: '15px' }}>{formatPrice(item.price)}</p>
                            <div style={{ marginTop: 'auto' }}>
                                <button onClick={() => { addToCart(item); removeFromWishlist(item.id); }} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                    <i className="ph ph-shopping-cart"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
