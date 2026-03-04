import Review from '../models/Review.model.js';
import Product from '../models/Product.model.js';

export const createProductReview = async (req, res) => {
    const { rating, comment, productId } = req.body;

    const product = await Product.findById(productId);

    if (product) {
        const alreadyReviewed = await Review.findOne({ user: req.user._id, product: productId });

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = await Review.create({
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
            product: productId
        });

        const reviews = await Review.find({ product: productId });
        product.numReviews = reviews.length;
        product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added', review });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

export const getProductReviews = async (req, res) => {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
    res.json(reviews);
};
