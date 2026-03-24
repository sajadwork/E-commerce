import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/product.service';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const debounceRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced search
    const performSearch = useCallback(async (value) => {
        if (!value.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }
        setIsLoading(true);
        try {
            const data = await searchProducts(value);
            const products = Array.isArray(data) ? data : data.products || [];
            setResults(products.slice(0, 8));
            setIsOpen(true);
        } catch {
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setActiveIndex(-1);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => performSearch(value), 300);
    };

    const handleSelect = (product) => {
        setQuery('');
        setIsOpen(false);
        navigate(`/product/${product._id || product.id}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
            handleSelect(results[activeIndex]);
        } else if (query.trim()) {
            setIsOpen(false);
            navigate(`/?search=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleKeyDown = (e) => {
        if (!isOpen) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, -1));
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className="search-bar-container" ref={containerRef}>
            <form className="search-bar-form" onSubmit={handleSubmit} role="search">
                <input
                    ref={inputRef}
                    type="search"
                    className="search-bar-input"
                    placeholder="Search products…"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
                    aria-label="Search products"
                    aria-autocomplete="list"
                    aria-controls="search-listbox"
                    aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
                    autoComplete="off"
                />
                <button type="submit" className="search-bar-btn" aria-label="Submit search">
                    {isLoading
                        ? <i className="ph ph-circle-notch" style={{ animation: 'spin 0.8s linear infinite' }}></i>
                        : <i className="ph ph-magnifying-glass"></i>
                    }
                </button>
            </form>

            {isOpen && (
                <div
                    className="search-dropdown"
                    id="search-listbox"
                    role="listbox"
                    aria-label="Search results"
                >
                    {results.length === 0 && !isLoading ? (
                        <div className="search-no-results">
                            <i className="ph ph-smiley-sad"></i>
                            <span>No results found for "<strong>{query}</strong>"</span>
                        </div>
                    ) : (
                        results.map((product, index) => (
                            <div
                                key={product._id || product.id}
                                id={`search-option-${index}`}
                                className={`search-result-item ${activeIndex === index ? 'active' : ''}`}
                                role="option"
                                aria-selected={activeIndex === index}
                                onClick={() => handleSelect(product)}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <div className="search-result-image">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} loading="lazy" />
                                    ) : (
                                        <i className="ph ph-image"></i>
                                    )}
                                </div>
                                <div className="search-result-info">
                                    <span className="search-result-name">{product.name}</span>
                                    {product.category && (
                                        <span className="search-result-category">in {product.category}</span>
                                    )}
                                </div>
                                <i className="ph ph-arrow-up-left search-result-arrow"></i>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
