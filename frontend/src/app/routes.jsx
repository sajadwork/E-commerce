import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Public Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// User Pages
import Home from '../pages/user/Home';
import Search from '../pages/user/Search';
import Categories from '../pages/user/Categories';
import ProductList from '../pages/user/ProductList';
import ProductDetails from '../pages/user/ProductDetails';
import Cart from '../pages/user/Cart';
import Checkout from '../pages/user/Checkout';
import OrderSuccess from '../pages/user/OrderSuccess';
import Orders from '../pages/user/Orders';
import Wishlist from '../pages/user/Wishlist';
import Profile from '../pages/user/Profile';

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminProductList from '../pages/admin/Products/ProductList';
import AddProduct from '../pages/admin/Products/AddProduct';
import EditProduct from '../pages/admin/Products/EditProduct';
import OrderList from '../pages/admin/Orders/OrderList';
import OrderDetails from '../pages/admin/Orders/OrderDetails';
import Users from '../pages/admin/Users';
import Reviews from '../pages/admin/Reviews';
import Settings from '../pages/admin/Settings';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* General App Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />

            {/* Protected User Routes */}
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute requireAdmin={true}><AdminProductList /></ProtectedRoute>} />
            <Route path="/admin/products/add" element={<ProtectedRoute requireAdmin={true}><AddProduct /></ProtectedRoute>} />
            <Route path="/admin/products/edit/:id" element={<ProtectedRoute requireAdmin={true}><EditProduct /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute requireAdmin={true}><OrderList /></ProtectedRoute>} />
            <Route path="/admin/orders/:id" element={<ProtectedRoute requireAdmin={true}><OrderDetails /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requireAdmin={true}><Users /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute requireAdmin={true}><Reviews /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute requireAdmin={true}><Settings /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
