export const uploadImage = async (formData, token) => {
    const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to upload image');

    return data;
};

export const createProduct = async (productData, token) => {
    const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create product');

    return data;
};

export const getDashboardStats = async (token) => {
    const response = await fetch('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch dashboard stats');
    return data;
};

export const getUsers = async (token) => {
    const response = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
    return data;
};

export const getOrders = async (token) => {
    const response = await fetch('/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch orders');
    return data;
};

export const updateOrderToDelivered = async (orderId, token) => {
    const response = await fetch(`/api/admin/orders/${orderId}/deliver`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update order');
    return data;
};

export const updateProduct = async (productId, productData, token) => {
    const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update product');

    return data;
};

export const deleteProduct = async (productId, token) => {
    const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete product');

    return data;
};

export const getAllReviews = async (token) => {
    const res = await fetch('/api/admin/reviews', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
};

export const deleteReview = async (id, token) => {
    const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Failed to delete review');
    return res.json();
};

export const deleteUser = async (id, token) => {
    const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Failed to delete user');
    return res.json();
};
