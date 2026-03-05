import React from 'react';
import { CATEGORIES } from '../../utils/constants';

const Categories = () => {
    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
            <h2 style={{ marginBottom: '30px' }}>Browse by Category</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {CATEGORIES.map(category => (
                    <div key={category.name} style={{ padding: '30px 20px', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                        <i className={`ph ph-${category.icon}`} style={{ fontSize: '40px', color: '#3b82f6', marginBottom: '15px' }}></i>
                        <h3 style={{ fontSize: '18px', color: '#1f2937' }}>{category.name}</h3>
                        {category.count !== null && <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '5px' }}>{category.count} Products</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
