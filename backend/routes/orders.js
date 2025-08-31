const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");
const { auth, adminAuth } = require("../middleware/auth");

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get("/", auth, getOrders);

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post("/", auth, createOrder);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get("/:id", auth, getOrder);

// @route   PUT /api/orders/:id
// @desc    Update order status
// @access  Private (Admin only)
router.put("/:id", auth, adminAuth, updateOrderStatus);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order
// @access  Private
router.put("/:id/cancel", auth, cancelOrder);

module.exports = router;
