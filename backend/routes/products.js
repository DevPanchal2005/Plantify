const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
} = require("../controllers/productController");
const { auth, adminAuth } = require("../middleware/auth");
const { validateProduct } = require("../middleware/validation");

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get("/", getProducts);

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get("/:id", getProduct);

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Admin only)
router.post("/", auth, adminAuth, validateProduct, createProduct);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Admin only)
router.put("/:id", auth, adminAuth, validateProduct, updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Admin only)
router.delete("/:id", auth, adminAuth, deleteProduct);

// @route   POST /api/products/:id/reviews
// @desc    Add product review
// @access  Private
router.post("/:id/reviews", auth, addReview);

module.exports = router;
