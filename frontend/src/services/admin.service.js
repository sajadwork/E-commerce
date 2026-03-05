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

export const getDashboardStats = async () => {
    const res = await fetch('/api/admin/dashboard', {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    return res.json();
};

export const getAdminProducts = async () => {
    const res = await fetch('/api/products', {
        headers: authHeaders() // Although it's public on the backend, this is fine
    });
    if (!res.ok) throw new Error('Failed to fetch admin products');
    return res.json();
};
