const mongoose = require("mongoose");
const Product = require("../models/Product");
const connectDB = require("../config/database");
require("dotenv").config();

// Example: Add a single product
const addSingleProduct = async () => {
  try {
    await connectDB();

    const newProduct = {
      name: "ZZ Plant (Zamioculcas zamiifolia)",
      description:
        "Nearly indestructible plant that can survive in very low light and with minimal watering. Perfect for offices and dark corners.",
      shortDescription: "Nearly indestructible low-light plant",
      price: 599,
      originalPrice: 799,
      category: "Indoor Plants",
      images: {
        main: "/assets/zz-plant/main_image.jpg",
        hover: "/assets/zz-plant/hover_image.jpg",
      },
      stock: 45,
      sku: "ZZ001",
      rating: {
        average: 5,
        count: 278,
      },
      badges: ["Bestseller"],
      careInstructions: {
        light: "Low to bright, indirect light",
        water: "Water every 2-4 weeks, very drought tolerant",
        soil: "Well-draining potting mix",
        temperature: "18-26°C",
        humidity: "Low to moderate",
      },
      features: [
        "Extremely low maintenance",
        "Drought tolerant",
        "Low light tolerant",
        "Air purifying",
        "Perfect for offices",
      ],
      specifications: {
        height: "60-90 cm",
        spread: "40-60 cm",
        potSize: "10 inch",
        plantType: "Foliage",
        difficulty: "Easy",
      },
      tags: ["zz-plant", "low-light", "drought-tolerant", "office-plant", "indestructible"],
    };

    const product = await Product.create(newProduct);
    console.log("✅ Product added successfully:", product.name);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding product:", error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  addSingleProduct();
}

module.exports = addSingleProduct;
