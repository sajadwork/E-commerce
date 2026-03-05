// Helper to extract the logged-in user's token directly from local storage.
// A more robust method involves pulling this from Context, but this is simpler for standalone services.
const getToken = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    return user?.token || null;
};

const authHeaders = () => {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
    };
};

export const getUserOrders = async () => {
    const res = await fetch('/api/orders/myorders', {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch user orders');
    return res.json();
};

export const getOrderDetails = async (orderId) => {
    const res = await fetch(`/api/orders/${orderId}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch order details');
    return res.json();
};

export const createOrder = async (orderData) => {
    const res = await fetch('/api/orders', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(orderData)
    });
    if (!res.ok) throw new Error('Failed to create order');
    return res.json();
};
