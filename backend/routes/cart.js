const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const { auth } = require("../middleware/auth");

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get("/", auth, getCart);

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post("/add", auth, addToCart);

// @route   PUT /api/cart/update
// @desc    Update cart item quantity
// @access  Private
router.put("/update", auth, updateCartItem);

// @route   DELETE /api/cart/remove/:productId
// @desc    Remove item from cart
// @access  Private
router.delete("/remove/:productId", auth, removeFromCart);

// @route   DELETE /api/cart/clear
// @desc    Clear entire cart
// @access  Private
router.delete("/clear", auth, clearCart);

module.exports = router;
