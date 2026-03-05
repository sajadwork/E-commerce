
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../utils/constants';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Find product by ID (convert string id to number)
    const foundProduct = PRODUCTS.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    window.scrollTo(0, 0); // Scroll to top on load
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/" className="btn-buy" style={{ display: 'inline-block', marginTop: '20px' }}>Back to Home</Link>
      </div>
    );
  }

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <i key={i} className={`ph-fill ph-star${i < Math.floor(rating) ? '' : '-half'}`}></i>
    ));
  };

  return (
    <div className="container product-details-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">{product.category}</Link> / <span>{product.name}</span>
      </div>

      <div className="product-details-grid">
        {/* Left: Images */}
        <div className="product-gallery">
          <div className="main-image">
            <button
              className={`btn-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                addToWishlist(product);
              }}
              style={{ top: '20px', right: '20px', width: '48px', height: '48px', fontSize: '1.5rem' }} // Larger for detail page
            >
              <i className={isInWishlist(product.id) ? "ph-fill ph-heart" : "ph ph-heart"}></i>
            </button>
            <img src={product.image} alt={product.name} />
            <span className="product-tag">{product.tag}</span>
          </div>
        </div>

        {/* Right: Info */}
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>

          <div className="product-meta">
            <div className="product-rating-large">
              {renderStars(product.rating)}
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>
            <span className="stock-status">In Stock</span>
          </div>

          <h2 className="product-price">${product.price}</h2>

          <p className="product-description">
            Experience the quality of {product.name}. Designed for modern living,
            this product combines style, durability, and performance.
            Perfect for your {product.category} needs.
          </p>

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <h3>Quantity</h3>
            <div className="qty-controls">
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <i className="ph ph-minus"></i>
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                <i className="ph ph-plus"></i>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="product-actions-large">
            <button
              className="btn-add-cart-large"
              onClick={() => {
                addToCart(product, quantity);
              }}
            >
              <i className="ph ph-shopping-cart"></i> Add to Cart
            </button>
            <button
              className="btn-buy-now-large"
              onClick={() => {
                navigate('/checkout', { state: { directBuy: { product, quantity } } });
              }}
            >
              Buy Now
            </button>
          </div>

          <div className="product-extra-info">
            <div className="info-item">
              <i className="ph ph-truck"></i>
              <span>Free Delivery</span>
            </div>
            <div className="info-item">
              <i className="ph ph-arrow-counter-clockwise"></i>
              <span>30 Days Return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
