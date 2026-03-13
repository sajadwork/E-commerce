
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProductReviews, createProductReview } from '../../services/product.service';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist } = useWishlist();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        setLoading(true);
        const [productData, reviewsData] = await Promise.all([
          getProductById(id),
          getProductReviews(id)
        ]);

        // Map _id back to id to maintain compatibility with Contexts natively
        setProduct({ ...productData, id: productData._id });
        setReviews(reviewsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProductAndReviews();
    window.scrollTo(0, 0); // Scroll to top on load
  }, [id]);

  if (loading) {
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>{error || 'Product not found'}</h2>
        <Link to="/" className="btn-buy" style={{ display: 'inline-block', marginTop: '20px' }}>Back to Home</Link>
      </div>
    );
  }

  const renderStars = (ratingValue) => {
    return Array(5).fill(0).map((_, i) => (
      <i key={i} className={`ph-fill ph-star${i < Math.floor(ratingValue) ? '' : '-half'}`}></i>
    ));
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      setIsSubmittingReview(true);
      setReviewError('');
      await createProductReview(id, { rating, comment }, user.token);

      // Refresh reviews and product details to show new rating
      const [updatedProduct, updatedReviews] = await Promise.all([
        getProductById(id),
        getProductReviews(id)
      ]);
      setProduct({ ...updatedProduct, id: updatedProduct._id });
      setReviews(updatedReviews);
      setComment('');
    } catch (err) {
      setReviewError(err.message);
    } finally {
      setIsSubmittingReview(false);
    }
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

      {/* Reviews Section */}
      <div className="reviews-section" style={{ marginTop: '60px', borderTop: '1px solid #e5e7eb', paddingTop: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>Customer Reviews</h2>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {/* Review List */}
          <div style={{ flex: '1 1 60%' }}>
            {reviews.length === 0 ? (
              <p style={{ color: '#6b7280' }}>No reviews yet. Be the first to review this product!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {reviews.map((review) => (
                  <div key={review._id} style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong style={{ fontSize: '16px' }}>{review.name}</strong>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div style={{ color: '#f59e0b', marginBottom: '10px', fontSize: '14px' }}>
                      {renderStars(review.rating)}
                    </div>
                    <p style={{ color: '#374151', margin: 0, lineHeight: '1.5' }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Review Form */}
          <div style={{ flex: '1 1 35%', minWidth: '300px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Write a Review</h3>

              {user ? (
                <form onSubmit={submitReviewHandler} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {reviewError && <div style={{ padding: '10px', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '4px', fontSize: '14px' }}>{reviewError}</div>}

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Comment</label>
                    <textarea
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', resize: 'vertical' }}
                      placeholder="Share your experience..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    style={{
                      padding: '12px',
                      backgroundColor: '#111827',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: isSubmittingReview ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold',
                      opacity: isSubmittingReview ? 0.7 : 1
                    }}
                  >
                    {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              ) : (
                <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '4px', textAlign: 'center' }}>
                  <p style={{ marginBottom: '10px', color: '#4b5563' }}>Please log in to write a review</p>
                  <Link to="/login" style={{ color: '#3b82f6', fontWeight: '500', textDecoration: 'none' }}>Log In</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
