// server/controllers/userController.js
import asyncHandler from 'express-async-handler'; // Changed from require and added .js extension for imports
import generateToken from '../utils/generateToken.js'; // IMPORTANT: Add .js extension here! Convert generateToken.js next!
import User from '../models/User.js'; // IMPORTANT: Add .js extension here!
import { webcrypto } from 'crypto'; // Changed from require('crypto') for ES Modules

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400); // Bad request
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password, // Password hashing happens in pre-save hook in User model
    });

    if (user) {
        res.status(201).json({ // Created
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401); // Unauthorized
        throw new Error('Invalid email or password');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); // req.user set by protect middleware

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            addresses: user.addresses, // Include addresses
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password; // Hashing handled by pre-save hook
        }

        // Handle addresses update (simplified, you might need more complex logic)
        if (req.body.addresses) {
            user.addresses = req.body.addresses;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            addresses: updatedUser.addresses,
            token: generateToken(updatedUser._id), // Generate new token if profile updates affect it
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// --- Additional functions for Admin User Management ---
// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400); // Bad request
            throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({ _id: user._id }); // Use deleteOne for Mongoose 6+
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin === true ? true : false; // Ensure isAdmin is boolean

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


// @desc    Request OTP for password reset
// @route   POST /api/users/request-otp
// @access  Public
const requestOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found with that email address.');
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Set OTP expiry to 10 minutes from now
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Here you would integrate with an email sending service (e.g., Nodemailer, SendGrid)
    // Example (pseudocode):
    // const transporter = nodemailer.createTransport(...);
    // const mailOptions = {
    //    from: 'your_email@example.com',
    //    to: user.email,
    //    subject: 'Your Password Reset OTP',
    //    text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    // };
    // await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent to your email address.' });
});

// @desc    Verify OTP and generate reset token
// @route   POST /api/users/verify-otp
// @access  Public
const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
        res.status(400);
        throw new Error('Invalid or expired OTP.');
    }

    // If OTP is valid, generate a unique token for password reset
    const resetToken = Buffer.from(webcrypto.getRandomValues(new Uint8Array(20))).toString('hex'); // Using webcrypto for ES modules
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    res.json({ message: 'OTP verified. You can now reset your password.', resetToken });
});

// @desc    Reset password using token
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken, newPassword } = req.body;
    const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid or expired reset token.');
    }

    user.password = newPassword; // Hashing handled by pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.otp = undefined; // Clear OTP data
    user.otpExpires = undefined;

    await user.save();

    res.json({ message: 'Password has been reset.' });
});

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers, // Admin
    deleteUser, // Admin
    getUserById, // Admin
    updateUser, // Admin
    requestOtp,
    verifyOtp,
    resetPassword,
};