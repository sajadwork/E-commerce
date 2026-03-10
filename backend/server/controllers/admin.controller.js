import User from '../models/User.model.js';
import Order from '../models/Order.model.js';
import Product from '../models/Product.model.js';

export const getDashboardStats = async (req, res) => {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();

    const orders = await Order.find({});
    const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.json({
        users: usersCount,
        products: productsCount,
        orders: ordersCount,
        totalSales
    });
};

export const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

export const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({ _id: user._id });
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

export const getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
};

export const updateOrderToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
};

export const createProduct = async (req, res) => {
    console.log("CREATE PRODUCT REQUEST BODY:", req.body);
    const { name, price, description, image, brand, category, countInStock } = req.body;

    try {
        const product = new Product({
            name: name || 'Sample name',
            price: price || 0,
            user: req.user._id,
            image: image || '/images/sample.jpg',
            brand: brand || 'Sample brand',
            category: category || 'Sample category',
            countInStock: countInStock || 0,
            numReviews: 0,
            rating: 0,
            description: description || 'Sample description',
        });
        const createdProduct = await product.save();
        console.log("SAVED PRODUCT:", createdProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error("ERROR SAVING PRODUCT:", error);
        res.status(400);
        throw error;
    }
};

export const updateProduct = async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

export const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};
