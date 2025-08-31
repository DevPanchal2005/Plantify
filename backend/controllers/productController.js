const Product = require("../models/Product");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { isActive: true };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      const searchTerm = req.query.search.trim();
      // Use regex for more flexible search with case insensitive matching
      filter.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { shortDescription: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { tags: { $regex: searchTerm, $options: "i" } },
      ];
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice)
        filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice)
        filter.price.$lte = parseFloat(req.query.maxPrice);
    }

    // Build sort object
    let sort = {};
    switch (req.query.sort) {
      case "price-low":
        sort = { price: 1 };
        break;
      case "price-high":
        sort = { price: -1 };
        break;
      case "rating":
        sort = { "rating.average": -1 };
        break;
      case "newest":
        sort = { createdAt: -1 };
        break;
      case "popular":
        sort = { "rating.count": -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    let products;
    let total;

    // If search query exists, use aggregation for better relevance scoring
    if (req.query.search) {
      const searchTerm = req.query.search.trim();

      const pipeline = [
        {
          $match: filter,
        },
        {
          $addFields: {
            // Calculate relevance score based on where the match occurs
            relevanceScore: {
              $add: [
                // Title match gets highest score (10 points)
                {
                  $cond: [
                    {
                      $regexMatch: {
                        input: "$name",
                        regex: searchTerm,
                        options: "i",
                      },
                    },
                    10,
                    0,
                  ],
                },
                // Exact title match gets bonus (20 points)
                {
                  $cond: [
                    { $eq: [{ $toLower: "$name" }, searchTerm.toLowerCase()] },
                    20,
                    0,
                  ],
                },
                // Title starts with search term (15 points)
                {
                  $cond: [
                    {
                      $regexMatch: {
                        input: "$name",
                        regex: `^${searchTerm}`,
                        options: "i",
                      },
                    },
                    15,
                    0,
                  ],
                },
                // Category match (5 points)
                {
                  $cond: [
                    {
                      $regexMatch: {
                        input: "$category",
                        regex: searchTerm,
                        options: "i",
                      },
                    },
                    5,
                    0,
                  ],
                },
                // Description match (2 points)
                {
                  $cond: [
                    {
                      $regexMatch: {
                        input: "$description",
                        regex: searchTerm,
                        options: "i",
                      },
                    },
                    2,
                    0,
                  ],
                },
              ],
            },
          },
        },
        {
          $match: {
            relevanceScore: { $gt: 0 }, // Only include results with some relevance
          },
        },
        {
          $sort: req.query.search
            ? { relevanceScore: -1, ...sort } // Sort by relevance first, then by other criteria
            : sort,
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            relevanceScore: 0, // Remove relevance score from final output
            reviews: 0, // Exclude reviews for list view
          },
        },
      ];

      products = await Product.aggregate(pipeline);

      // Get total count for pagination (simplified count)
      const countResult = await Product.find(filter).countDocuments();
      total = countResult;
    } else {
      // Regular query without search
      products = await Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select("-reviews");

      total = await Product.countDocuments(filter);
    }

    res.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "reviews.user",
      "name"
    );

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get product error:", error);
    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error while fetching product",
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin only)
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Create product error:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error while creating product",
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin only)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Update product error:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error while updating product",
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};

// @desc    Add product review
// @route   POST /api/products/:id/reviews
// @access  Private
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user already reviewed this product
    const existingReview = product.reviews.find(
      (review) => review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const review = {
      user: req.user.id,
      rating,
      comment,
    };

    product.reviews.push(review);
    product.updateRating();
    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding review",
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
};
