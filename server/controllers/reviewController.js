// server/controllers/reviewController.js
import asyncHandler from 'express-async-handler'; // Changed from require and added .js extension for imports
import Product from '../models/Product.js'; // IMPORTANT: Add .js extension here!
import Review from '../models/Review.js'; // IMPORTANT: Add .js extension here!

// @desc    Get all reviews for a specific product
// @route   GET /api/reviews/product/:productId
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
    res.json(reviews);
});

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { productId, rating, comment } = req.body;

    const product = await Product.findById(productId);

    if (product) {
        // You might want to allow multiple reviews, or only one editable review
        // For this example, we'll allow only one review per user per product, but it's editable
        const existingReview = await Review.findOne({ product: productId, user: req.user._id });

        if (existingReview) {
            res.status(400);
            throw new Error('Product already reviewed by this user. Please edit your existing review.');
        }

        const review = new Review({
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
            product: productId,
        });

        await review.save();

        // Update product's rating and numReviews
        const reviews = await Review.find({ product: productId });
        product.numReviews = reviews.length;
        product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (review) {
        // Ensure only the review owner can update
        if (review.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to update this review');
        }

        review.rating = Number(rating) || review.rating;
        review.comment = comment || review.comment;

        await review.save();

        // Recalculate product rating
        const product = await Product.findById(review.product);
        const reviews = await Review.find({ product: product._id });
        product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
        await product.save();

        res.json({ message: 'Review updated' });
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (review) {
        // Ensure only the review owner or an admin can delete
        if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            res.status(401);
            throw new Error('Not authorized to delete this review');
        }

        await Review.deleteOne({ _id: review._id });

        // Recalculate product rating and numReviews
        const product = await Product.findById(review.product);
        const reviews = await Review.find({ product: product._id });
        product.numReviews = reviews.length;
        product.rating = reviews.length > 0 ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length : 0;
        await product.save();

        res.json({ message: 'Review removed' });
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

export {
    getProductReviews,
    createProductReview,
    updateReview,
    deleteReview,
};