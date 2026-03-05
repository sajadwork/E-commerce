
import React, { useState, useRef } from 'react';
import { PRODUCTS, CATEGORIES } from '../../utils/constants';
import ProductCard from '../../components/ProductCard';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState("All Product");
    const recRef = useRef(null);

    const scrollRec = (direction) => {
        if (recRef.current) {
            recRef.current.scrollBy({ left: direction * 300, behavior: 'smooth' });
        }
    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, i) => (
            <i key={i} className={`ph-fill ph-star${i < Math.floor(rating) ? '' : '-half'}`} style={{ color: 'var(--star-color)' }}></i>
        ));
    };

    // Dummy add to cart function - in real app would use Context
    const handleAddToCart = () => {
        // Dispatch event or use context
        window.dispatchEvent(new CustomEvent('addToCart'));
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <header className="hero">
                <div className="hero-bg"></div>
                <div className="hero-overlay-text">Shop</div>
                <div className="container hero-content">
                    <h1 className="hero-title">Give All You Need</h1>
                    <div className="hero-search">
                        <input type="text" placeholder="Search on Stuffus" />
                        <button className="search-btn">Search</button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container main-layout">

                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="category-card">
                        <h3>Category</h3>
                        <ul className="category-list">
                            {CATEGORIES.map(cat => (
                                <li
                                    key={cat.name}
                                    className={activeCategory === cat.name ? 'active' : ''}
                                    onClick={() => setActiveCategory(cat.name)}
                                >
                                    <span className="cat-icon"><i className={`ph ph-${cat.icon}`}></i></span>
                                    {cat.name}
                                    {cat.count && <span className="badge">{cat.count}</span>}
                                </li>
                            ))}
                        </ul>
                        <div className="divider"></div>
                        <ul className="filter-list">
                            {['New Arrival', 'Best Seller', 'On Discount'].map(filter => (
                                <li key={filter}>
                                    <label className="custom-checkbox">
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                        {filter}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <section className="products-section">
                    <div className="product-grid">
                        {PRODUCTS.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                renderStars={renderStars}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="pagination">
                        <button className="page-btn prev"><i className="ph ph-caret-left"></i></button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">3</button>
                        <span className="page-dots">...</span>
                        <button className="page-btn">10</button>
                        <button className="page-btn next"><i className="ph ph-caret-right"></i></button>
                    </div>
                </section>

            </main>

            {/* Recommendations */}
            <section className="container recommendations">
                <div className="rec-header">
                    <h2>Explore our recommendations</h2>
                    <div className="rec-controls">
                        <button className="rec-btn prev-rec" onClick={() => scrollRec(-1)}><i className="ph ph-caret-left"></i></button>
                        <button className="rec-btn next-rec" onClick={() => scrollRec(1)}><i className="ph ph-caret-right"></i></button>
                    </div>
                </div>
                <div className="recommendation-track-container" ref={recRef}>
                    <div className="recommendation-grid">
                        {PRODUCTS.slice(0, 4).map(product => (
                            <ProductCard
                                key={`rec-${product.id}`}
                                product={product}
                                renderStars={renderStars}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container cta-section">
                <div className="cta-banner">
                    <div className="cta-content">
                        <h2>Ready to Get Our New Stuff?</h2>
                        <div className="email-signup">
                            <input type="email" placeholder="Email Address" />
                            <button>Send</button>
                        </div>
                    </div>
                    <div className="cta-text-right">
                        <p>Use Stuffus for smart EV charging solution and enjoy your comfort from your car.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
