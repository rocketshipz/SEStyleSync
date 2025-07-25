// server/controllers/wishlistController.js
import asyncHandler from 'express-async-handler'; // Changed from require and added .js extension for imports
import Wishlist from '../models/Wishlist.js'; // IMPORTANT: Add .js extension here!
import Product from '../models/Product.js'; // IMPORTANT: Add .js extension here!

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
const getUserWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('items.product');
    if (wishlist) {
        res.json(wishlist);
    } else {
        res.json({ user: req.user._id, items: [] }); // Return empty wishlist if not found
    }
});

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private
const addProductToWishlist = asyncHandler(async (req, res) => {
    const { productId, notes = '' } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
        // Create new wishlist if none exists for the user
        wishlist = new Wishlist({
            user: req.user._id,
            items: [{ product: productId, notes }],
        });
    } else {
        // Check if product already in wishlist
        const itemExists = wishlist.items.find(
            (item) => item.product.toString() === productId.toString()
        );

        if (itemExists) {
            res.status(400);
            throw new Error('Product already in wishlist');
        } else {
            wishlist.items.push({ product: productId, notes });
        }
    }

    const updatedWishlist = await wishlist.save();
    res.status(201).json(updatedWishlist);
});

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
const removeProductFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
        wishlist.items = wishlist.items.filter(
            (item) => item.product.toString() !== productId.toString()
        );
        await wishlist.save();
        res.json({ message: 'Product removed from wishlist' });
    } else {
        res.status(404);
        throw new Error('Wishlist not found');
    }
});

// @desc    Update notes for a product in wishlist
// @route   PUT /api/wishlist/:productId/notes
// @access  Private
const updateWishlistItemNotes = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { notes } = req.body;
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
        const item = wishlist.items.find(
            (item) => item.product.toString() === productId.toString()
        );

        if (item) {
            item.notes = notes;
            await wishlist.save();
            res.json({ message: 'Wishlist item notes updated' });
        } else {
            res.status(404);
            throw new Error('Product not found in wishlist');
        }
    } else {
        res.status(404);
        throw new Error('Wishlist not found');
    }
    });

export {
    getUserWishlist,
    addProductToWishlist,
    removeProductFromWishlist,
    updateWishlistItemNotes,
};