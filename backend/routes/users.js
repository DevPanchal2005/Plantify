const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addToWishlist,
  removeFromWishlist,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const { auth } = require("../middleware/auth");
const {
  validateUserRegistration,
  validateUserLogin,
  validateForgotPassword,
  validateResetPassword,
} = require("../middleware/validation");

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
router.post("/register", validateUserRegistration, registerUser);

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post("/login", validateUserLogin, loginUser);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", auth, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", auth, updateUserProfile);

// @route   POST /api/users/wishlist/:productId
// @desc    Add product to wishlist
// @access  Private
router.post("/wishlist/:productId", auth, addToWishlist);

// @route   DELETE /api/users/wishlist/:productId
// @desc    Remove product from wishlist
// @access  Private
router.delete("/wishlist/:productId", auth, removeFromWishlist);

// @route   POST /api/users/forgot-password
// @desc    Request password reset
// @access  Public
router.post("/forgot-password", validateForgotPassword, forgotPassword);

// @route   POST /api/users/reset-password
// @desc    Reset password with token
// @access  Public
router.post("/reset-password", validateResetPassword, resetPassword);

module.exports = router;
