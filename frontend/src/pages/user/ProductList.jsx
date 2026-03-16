
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/product.service';
import ProductCard from '../../components/ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchAll();
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return (
            <div className="container loading-state">
                <div className="loader"></div>
                <p>Curating our premium collection...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container error-state" style={{ margin: '80px auto' }}>
                <h2>Something went wrong</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="shop-page">
            <div className="container">
                <header className="shop-header">
                    <h1>Our Collection</h1>
                    <p>Discover high-quality tech products curated for your modern lifestyle.</p>
                </header>

                <div className="section-header">
                    <h2>All Products</h2>
                    <span className="results-count">{products.length} Products Found</span>
                </div>

                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product._id} product={{ ...product, id: product._id }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;

