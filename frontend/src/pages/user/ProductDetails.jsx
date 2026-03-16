
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProductReviews, createProductReview } from '../../services/product.service';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useFormatPrice } from '../../hooks/useFormatPrice';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist } = useWishlist();
    const { user } = useAuth();
    const formatPrice = useFormatPrice();
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
        return (
            <div className="container loading-state">
                <div className="loader"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container error-state" style={{ margin: '80px auto' }}>
                <h2>{error || 'Product not found'}</h2>
                <Link to="/" className="btn-buy-now-large" style={{ display: 'inline-flex', marginTop: '20px', maxWidth: '200px' }}>Back to Home</Link>
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
                            title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
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
                            <div className="stars">{renderStars(product.rating)}</div>
                            <span>{product.rating} ({product.reviews} reviews)</span>
                        </div>
                        <span className="stock-status">In Stock</span>
                    </div>

                    <h2 className="product-price">{formatPrice(product.price)}</h2>

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
                                aria-label="Decrease quantity"
                            >
                                <i className="ph ph-minus"></i>
                            </button>
                            <span className="qty-value">{quantity}</span>
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(quantity + 1)}
                                aria-label="Increase quantity"
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
                            <i className="ph ph-bolt"></i> Buy Now
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
            <div className="reviews-section">
                <h2>Customer Reviews</h2>

                <div className="reviews-container">
                    {/* Review List */}
                    <div className="reviews-list">
                        {reviews.length === 0 ? (
                            <div className="login-prompt">
                                <p>No reviews yet. Be the first to review this product!</p>
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <div key={review._id} className="review-card">
                                    <div className="review-header">
                                        <span className="review-author">{review.name}</span>
                                        <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="review-stars">
                                        {renderStars(review.rating)}
                                    </div>
                                    <p className="review-content">{review.comment}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Submit Review Form */}
                    <div className="review-form-container">
                        <div className="review-form-card">
                            <h3>Write a Review</h3>

                            {user ? (
                                <form onSubmit={submitReviewHandler} className="review-form">
                                    {reviewError && <div className="error-state" style={{ padding: '12px', marginBottom: '0' }}>{reviewError}</div>}

                                    <div className="form-group">
                                        <label>Rating</label>
                                        <select
                                            value={rating}
                                            onChange={(e) => setRating(Number(e.target.value))}
                                        >
                                            <option value="5">5 - Excellent</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="3">3 - Good</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="1">1 - Poor</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Comment</label>
                                        <textarea
                                            rows="5"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                            placeholder="Share your experience..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmittingReview}
                                        className="btn-submit-review"
                                    >
                                        {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </form>
                            ) : (
                                <div className="login-prompt">
                                    <p>Please <Link to="/login">log in</Link> to write a review</p>
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

