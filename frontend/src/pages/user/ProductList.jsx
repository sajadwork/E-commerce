import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/product.service';
import ProductCard from '../../components/ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            const data = await getProducts();
            setProducts(data);
            setLoading(false);
        };
        fetchAll();
    }, []);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading products...</div>;

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
            <h2 style={{ marginBottom: '30px' }}>All Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
