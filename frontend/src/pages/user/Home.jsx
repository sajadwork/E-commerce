import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../../utils/constants';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../services/product.service';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';

const Home = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("All Product");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth <= 480 ? 8 : 9);
    const recRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth <= 480 ? 8 : 9);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                // Shuffle logic for "All Product" variety on refresh
                const shuffled = [...data].sort(() => Math.random() - 0.5);
                setProducts(shuffled);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const scrollRec = (direction) => {
        if (recRef.current) {
            const card = recRef.current.querySelector('.product-card');
            const cardWidth = card ? card.offsetWidth + 24 : 324; // Width + gap
            recRef.current.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
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

    // Filter products based on active category
    const filteredProducts = activeCategory === "All Product" 
        ? products 
        : products.filter(p => activeCategory.toLowerCase().includes(p.category.toLowerCase()));

    // Reset to first page when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);


    return (
        <div className="home-page">
            {/* Hero Section */}
            <header className="hero">
                <div className="hero-bg"></div>
                <div className="hero-overlay-text">PREMIUM</div>
                <div className="container hero-content">
                    <h1 className="hero-title">Experience the Future of Life</h1>
                    <form className="hero-search">
                        <SearchBar />
                    </form>
                </div>
            </header>


            {/* Category Navigation for Mobile */}
            <div className="container mobile-category-nav">
                <ul className="category-scroll">
                    {CATEGORIES.map(cat => (
                        <li
                            key={cat.name}
                            className={activeCategory === cat.name ? 'active' : ''}
                            onClick={() => setActiveCategory(cat.name)}
                        >
                            <i className={`ph ph-${cat.icon}`}></i>
                            <span>{cat.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <main className="container main-layout">

                {/* Sidebar (Desktop) */}
                <aside className="sidebar">
                    <div className="category-card">
                        <h3>Discover Category</h3>
                        <ul className="category-list">
                            {CATEGORIES.map(cat => (
                                <li
                                    key={cat.name}
                                    className={activeCategory === cat.name ? 'active' : ''}
                                    onClick={() => setActiveCategory(cat.name)}
                                >
                                    <span className="cat-icon"><i className={`ph ph-${cat.icon}`}></i></span>
                                    <span className="cat-name">{cat.name}</span>
                                    {cat.count && <span className="badge">{cat.count}</span>}
                                </li>
                            ))}
                        </ul>
                        <div className="divider"></div>
                        <h3 style={{ marginTop: '24px', fontSize: '1rem', color: 'var(--text-color)', fontWeight: '600' }}>Filters</h3>
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
                    <div className="section-header">
                        <h2>{activeCategory}</h2>
                        <span className="results-count">{filteredProducts.length} Products Found</span>
                    </div>

                    {loading && (
                        <div className="loading-state">
                            <div className="loader"></div>
                            <p>Discovering amazing products...</p>
                        </div>
                    )}
                    
                    {error && <div className="error-state">{error}</div>}

                    {!loading && !error && (
                        <div className="product-grid">
                            {filteredProducts
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                .map(product => (
                                <ProductCard
                                    key={product._id}
                                    product={{ ...product, id: product._id }}
                                    renderStars={renderStars}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && !error && filteredProducts.length > itemsPerPage && (
                        <div className="pagination">
                            <button 
                                className="page-btn prev"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                <i className="ph ph-caret-left"></i>
                            </button>
                            
                            {[...Array(Math.ceil(filteredProducts.length / itemsPerPage))].map((_, index) => (
                                <button
                                    key={index + 1}
                                    className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button 
                                className="page-btn next"
                                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredProducts.length / itemsPerPage), prev + 1))}
                                disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
                            >
                                <i className="ph ph-caret-right"></i>
                            </button>
                        </div>
                    )}
                </section>

            </main>

            {/* Recommendations */}
            <section className="container recommendations">
                <div className="rec-header">
                    <div className="title-group">
                        <span className="label">Handpicked</span>
                        <h2>Recommended for You</h2>
                    </div>
                    {!loading && products.length > 4 && (
                        <div className="rec-controls">
                            <button className="rec-btn prev-rec" onClick={() => scrollRec(-1)} aria-label="Previous"><i className="ph ph-caret-left"></i></button>
                            <button className="rec-btn next-rec" onClick={() => scrollRec(1)} aria-label="Next"><i className="ph ph-caret-right"></i></button>
                        </div>
                    )}
                </div>
                <div className="recommendation-track-container" ref={recRef}>
                    {loading ? (
                        <div className="loading-skeleton"></div>
                    ) : (
                        <div className="recommendation-grid">
                            {products.slice(0, 10).map(product => (
                                <ProductCard
                                    key={`rec-${product._id}`}
                                    product={{ ...product, id: product._id }}
                                    renderStars={renderStars}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container cta-section">
                <div className="cta-banner">
                    <div className="cta-content">
                        <h2>Join Our Community</h2>
                        <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <div className="email-signup">
                            <input type="email" placeholder="Your email address" aria-label="Email" />
                            <button className="btn-primary">Subscribe Now</button>
                        </div>
                    </div>
                    <div className="cta-visual">
                        <div className="stat-card">
                            <span className="count">50k+</span>
                            <span className="label">Happy Customers</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

