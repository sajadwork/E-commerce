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
