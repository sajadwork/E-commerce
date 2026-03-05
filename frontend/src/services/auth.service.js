// Authentication Service calling the Backend API

export const loginUser = async (email, password) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to login');

    // Normalize properties for the frontend expectations if needed
    return { ...data, id: data._id, role: data.isAdmin ? 'admin' : 'user' };
};

export const registerUser = async (name, email, password) => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to register');

    return { ...data, id: data._id, role: data.isAdmin ? 'admin' : 'user' };
};

export const resetPassword = async (email) => {
    // Backend doesn't have reset password yet, mock returning true
    return new Promise((resolve) => setTimeout(() => resolve(true), 500));
};
