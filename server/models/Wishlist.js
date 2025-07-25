// server/models/Wishlist.js
import mongoose from 'mongoose'; // Changed from require

const wishlistItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product', // Ensure Product model is also converted
  },
  notes: {
    type: String,
    default: '',
  },
});

const wishlistSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Ensure User model is also converted
      unique: true, // A user should only have one wishlist
    },
    items: [wishlistItemSchema],
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist; // Changed from module.exports