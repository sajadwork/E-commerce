import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useFormatPrice } from '../hooks/useFormatPrice';

const ProductCard = ({ product, renderStars }) => {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist } = useWishlist();
  const navigate = useNavigate();
  const formatPrice = useFormatPrice();
  return (
    <article className="product-card">
      <div className="product-image">
        <button
          className={`btn-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            addToWishlist(product);
          }}
        >
          <i className={isInWishlist(product.id) ? "ph-fill ph-heart" : "ph ph-heart"}></i>
        </button>
        <Link to={`/product/${product.id}`} className="product-link">
          <img src={product.image} alt={product.name} />
          <span className="product-tag">{product.tag}</span>
        </Link>
      </div>
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-info">
          <h3>{product.name}</h3>
          <div className="product-rating">
            <div className="stars">{renderStars(product.rating)}</div>
            <span>({product.reviews})</span>
          </div>
        </div>
      </Link>
      <div className="product-footer">
        <span className="price">{formatPrice(product.price)}</span>
        <div className="product-actions">
          <button
            className="btn-add"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            <i className="ph ph-shopping-cart"></i>
          </button>
          <button
            className="btn-buy"
            onClick={(e) => {
              e.preventDefault();
              navigate('/checkout', { state: { directBuy: { product, quantity: 1 } } });
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
