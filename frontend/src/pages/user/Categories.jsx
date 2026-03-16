
import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';

const Categories = () => {
    return (
        <div className="categories-page">
            <div className="container">
                <header className="shop-header">
                    <h1>Categories</h1>
                    <p>Browse our collection by your favorite tech categories.</p>
                </header>

                <div className="category-grid">
                    {CATEGORIES.map(category => (
                        <Link to={`/shop?category=${category.name}`} key={category.name} className="category-item-card">
                            <i className={`ph ph-${category.icon}`}></i>
                            <h3>{category.name}</h3>
                            {category.count !== null && (
                                <span className="item-count">{category.count} Products</span>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;

