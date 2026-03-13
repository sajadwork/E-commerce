export const getProducts = async () => {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
};

export const getProductById = async (id) => {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
};

export const searchProducts = async (query) => {
    const res = await fetch(`/api/products?keyword=${query}`);
    if (!res.ok) throw new Error('Failed to search products');
    return res.json();
};

export const getProductReviews = async (productId) => {
    const res = await fetch(`/api/reviews/${productId}`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
};

export const createProductReview = async (productId, reviewData, token) => {
    const res = await fetch(`/api/reviews/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reviewData)
    });

    // We want to return the error message natively, not just "Failed"
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to submit review');
    }
    return data;
};
