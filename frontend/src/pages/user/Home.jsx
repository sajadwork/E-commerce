
import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../../utils/constants';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../services/product.service';

const Home = () => {
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
                setProducts(data);
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
                        <input type="text" placeholder="Search on E-commerce" />
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
                    {loading && <div style={{ padding: '40px', textAlign: 'center' }}>Loading products...</div>}
                    {error && <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>{error}</div>}

                    {!loading && !error && (
                        <div className="product-grid">
                            {products
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                .map(product => (
                                <ProductCard
                                    key={product._id}
                                    product={{ ...product, id: product._id }} // map _id to id for the existing ProductCard
                                    renderStars={renderStars}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && !error && products.length > itemsPerPage && (
                        <div className="pagination">
                            <button 
                                className="page-btn prev"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                            >
                                <i className="ph ph-caret-left"></i>
                            </button>
                            
                            {[...Array(Math.ceil(products.length / itemsPerPage))].map((_, index) => (
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
                                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(products.length / itemsPerPage), prev + 1))}
                                disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
                                style={{ opacity: currentPage === Math.ceil(products.length / itemsPerPage) ? 0.5 : 1, cursor: currentPage === Math.ceil(products.length / itemsPerPage) ? 'not-allowed' : 'pointer' }}
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
                    <h2>Explore our recommendations</h2>
                    <div className="rec-controls">
                        <button className="rec-btn prev-rec" onClick={() => scrollRec(-1)}><i className="ph ph-caret-left"></i></button>
                        <button className="rec-btn next-rec" onClick={() => scrollRec(1)}><i className="ph ph-caret-right"></i></button>
                    </div>
                </div>
                <div className="recommendation-track-container" ref={recRef}>
                    {loading ? (
                        <div style={{ padding: '20px', textAlign: 'center' }}>Loading recommendations...</div>
                    ) : (
                        <div className="recommendation-grid">
                            {products.slice(0, 4).map(product => (
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
                        <h2>Ready to Get Our New Stuff?</h2>
                        <div className="email-signup">
                            <input type="email" placeholder="Email Address" />
                            <button>Send</button>
                        </div>
                    </div>
                    <div className="cta-text-right">
                        <p>Use E-commerce for smart EV charging solution and enjoy your comfort from your car.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
