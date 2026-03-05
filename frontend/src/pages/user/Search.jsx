import React, { useState, useEffect } from 'react';
import { getProducts, searchProducts } from '../../services/product.service';
import ProductCard from '../../components/ProductCard';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInitial = async () => {
            setLoading(true);
            const data = await getProducts();
            setResults(data);
            setLoading(false);
        };
        fetchInitial();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = await searchProducts(query);
        setResults(data);
        setLoading(false);
    };

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    style={{ flex: 1, padding: '12px 20px', borderRadius: '25px', border: '1px solid #ccc', outline: 'none' }}
                />
                <button type="submit" style={{ padding: '12px 25px', borderRadius: '25px', backgroundColor: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Search
                </button>
            </form>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Searching...</div>
            ) : (
                <div>
                    <h3 style={{ marginBottom: '20px' }}>{results.length} Results Found</h3>
                    <div className="product-grid">
                        {results.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
