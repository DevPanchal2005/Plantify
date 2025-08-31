const mongoose = require("mongoose");
const Product = require("../models/Product");
const connectDB = require("../config/database");
require("dotenv").config();

const sampleProducts = [
  {
    name: "Brazilian Wood Plant",
    description:
      "A beautiful and low-maintenance indoor plant perfect for beginners. The Brazilian Wood Plant is known for its striking foliage and air-purifying qualities.",
    shortDescription: "Low-maintenance indoor plant with striking foliage",
    price: 499,
    originalPrice: 1999,
    category: "Indoor Plants",
    images: {
      main: "/assets/brazilwood-plant/main_image.jpg",
      hover: "/assets/brazilwood-plant/hover_image.jpg",
    },
    stock: 50,
    sku: "BWP001",
    rating: {
      average: 5,
      count: 127,
    },
    careInstructions: {
      light: "Bright, indirect light. Avoid direct sunlight.",
      water: "Water when top inch of soil feels dry. Usually once a week.",
      soil: "Well-draining potting mix with good aeration.",
      temperature: "Ideal temperature range: 65-75°F (18-24°C)",
    },
    features: [
      "Air purifying plant",
      "Low maintenance",
      "Pet-friendly",
      "Suitable for beginners",
    ],
    badges: ["Trending"],
    specifications: {
      height: "30-60 cm",
      spread: "20-30 cm",
      potSize: "6 inch",
      plantType: "Foliage",
      difficulty: "Easy",
    },
    tags: ["indoor", "low-maintenance", "air-purifying", "beginner-friendly"],
  },
  {
    name: "Peace Lily Plant",
    description:
      "Elegant flowering plant that thrives in low light conditions. Known for its beautiful white blooms and excellent air purification properties.",
    shortDescription: "Elegant flowering plant for low light areas",
    price: 299,
    originalPrice: 399,
    category: "Flowering Plants",
    images: {
      main: "/assets/peace-lily-plant/main_image.jpg",
      hover: "/assets/peace-lily-plant/hover_image.jpg",
    },
    stock: 35,
    sku: "PLP001",
    rating: {
      average: 4,
      count: 89,
    },
    careInstructions: {
      light: "Low to medium light",
      water: "Keep soil consistently moist",
      soil: "Rich, well-draining soil",
      temperature: "18-27°C",
      humidity: "High",
    },
    specifications: {
      height: "40-65 cm",
      spread: "30-40 cm",
      potSize: "8 inch",
      plantType: "Flowering",
      bloomTime: "Spring to Fall",
      difficulty: "Easy",
    },
    tags: ["flowering", "low-light", "air-purifying", "indoor"],
  },
  {
    name: "Bamboo Palm Plant",
    description:
      "A graceful palm that adds tropical elegance to any space. Perfect for corners and creates a natural privacy screen.",
    shortDescription: "Graceful palm for tropical elegance",
    price: 299,
    originalPrice: 399,
    category: "Indoor Plants",
    images: {
      main: "/assets/bamboo-palm-plant/main_image.jpg",
      hover: "/assets/bamboo-palm-plant/hover_image.jpg",
    },
    stock: 25,
    sku: "BPP001",
    rating: {
      average: 4,
      count: 156,
    },
    badges: ["Bestseller"],
    careInstructions: {
      light: "Bright, indirect light",
      water: "Water regularly, keep soil moist",
      soil: "Well-draining potting mix",
      temperature: "20-26°C",
      humidity: "High",
    },
    specifications: {
      height: "120-180 cm",
      spread: "60-90 cm",
      potSize: "12 inch",
      plantType: "Palm",
      difficulty: "Medium",
    },
    tags: ["palm", "tropical", "tall", "corner-plant"],
  },
  {
    name: "Jade Plant Mini",
    description:
      "A compact succulent known for bringing good luck and prosperity. Very easy to care for and perfect for desks.",
    shortDescription: "Lucky succulent perfect for desks",
    price: 279,
    originalPrice: 299,
    category: "Cacti & Succulents",
    images: {
      main: "/assets/jade-plant-mini/main_image.jpg",
      hover: "/assets/jade-plant-mini/hover_image.jpg",
    },
    stock: 100,
    sku: "JPM001",
    rating: {
      average: 3,
      count: 234,
    },
    badges: ["Bestseller"],
    careInstructions: {
      light: "Bright light, some direct sun",
      water: "Water sparingly, let soil dry completely",
      soil: "Cactus/succulent potting mix",
      temperature: "18-24°C",
      humidity: "Low",
    },
    specifications: {
      height: "10-15 cm",
      spread: "8-12 cm",
      potSize: "4 inch",
      plantType: "Succulent",
      difficulty: "Easy",
    },
    tags: ["succulent", "mini", "desk-plant", "good-luck", "low-maintenance"],
  },
  {
    name: "Monstera Deliciosa Plant - XL",
    description:
      "Large statement plant with iconic split leaves. Perfect for creating a dramatic focal point in any room.",
    shortDescription: "Large statement plant with iconic split leaves",
    price: 2999,
    originalPrice: 3499,
    category: "Indoor Plants",
    images: {
      main: "/assets/monstera-xl/main_image.jpg",
      hover: "/assets/monstera-xl/hover_image.jpg",
    },
    stock: 15,
    sku: "MDX001",
    rating: {
      average: 4,
      count: 67,
    },
    careInstructions: {
      light: "Bright, indirect light",
      water: "Water when top inch of soil is dry",
      soil: "Well-draining, rich potting mix",
      temperature: "20-27°C",
      humidity: "Moderate to high",
    },
    specifications: {
      height: "150-200 cm",
      spread: "100-120 cm",
      potSize: "14 inch",
      plantType: "Foliage",
      difficulty: "Medium",
    },
    tags: ["monstera", "large", "statement", "split-leaves", "tropical"],
  },
  {
    name: "Monstera Deliciosa Plant",
    description:
      "Medium-sized Monstera with beautiful fenestrated leaves. A must-have for plant enthusiasts.",
    shortDescription: "Medium Monstera with fenestrated leaves",
    price: 1499,
    originalPrice: 2499,
    category: "Indoor Plants",
    images: {
      main: "/assets/monstera/main_image.jpg",
      hover: "/assets/monstera/hover_image.jpg",
    },
    stock: 30,
    sku: "MD001",
    rating: {
      average: 5,
      count: 198,
    },
    badges: ["Trending"],
    careInstructions: {
      light: "Bright, indirect light",
      water: "Water when top inch of soil is dry",
      soil: "Well-draining, rich potting mix",
      temperature: "20-27°C",
      humidity: "Moderate to high",
    },
    specifications: {
      height: "60-100 cm",
      spread: "50-70 cm",
      potSize: "10 inch",
      plantType: "Foliage",
      difficulty: "Medium",
    },
    tags: ["monstera", "medium", "fenestrated", "popular", "tropical"],
  },
  {
    name: "Anthurium Red Plant",
    description:
      "Stunning flowering plant with glossy red heart-shaped blooms. Adds vibrant color to any space.",
    shortDescription: "Stunning red flowering plant",
    price: 799,
    originalPrice: 999,
    category: "Flowering Plants",
    images: {
      main: "/assets/anthrium/main_page.jpg",
      hover: "/assets/anthrium/hover_image.jpg",
    },
    stock: 40,
    sku: "ARP001",
    rating: {
      average: 4,
      count: 112,
    },
    careInstructions: {
      light: "Bright, indirect light",
      water: "Keep soil consistently moist",
      soil: "Well-draining, organic-rich soil",
      temperature: "20-25°C",
      humidity: "High",
    },
    specifications: {
      height: "30-50 cm",
      spread: "25-35 cm",
      potSize: "8 inch",
      plantType: "Flowering",
      bloomTime: "Year-round",
      difficulty: "Medium",
    },
    tags: ["anthurium", "red", "flowering", "colorful", "tropical"],
  },
  {
    name: "Lucky Bamboo Plant - 3 Layer",
    description:
      "Traditional symbol of good fortune and prosperity. Easy to care for and grows in water or soil.",
    shortDescription: "Traditional symbol of good fortune",
    price: 349,
    originalPrice: 499,
    category: "Indoor Plants",
    images: {
      main: "/assets/lucky-bamboo/main_image.jpg",
      hover: "/assets/lucky-bamboo/hover_image.webp",
    },
    stock: 75,
    sku: "LBP003",
    rating: {
      average: 5,
      count: 289,
    },
    careInstructions: {
      light: "Bright, indirect light",
      water: "Change water weekly or keep soil moist",
      soil: "Can grow in water or well-draining soil",
      temperature: "18-25°C",
      humidity: "Moderate",
    },
    specifications: {
      height: "25-35 cm",
      spread: "10-15 cm",
      potSize: "6 inch",
      plantType: "Bamboo",
      difficulty: "Easy",
    },
    tags: ["bamboo", "lucky", "good-fortune", "water-plant", "easy-care"],
  },
  {
    name: "Broken Heart Plant",
    description:
      "One of the most popular houseplants, and our all-time bestseller, this easy-growing plant with its heart-shaped leaves is loved for its beautiful fenestrations. Quick to grow with delicate trailing vines that can be styled for every space, the Philodendron broken heart is the monstera charm you want to add to your home if you don't have the space for the huge monstera. Scientifically known as the Monstera adansonii, this broken heart plant thrives indoors in bright indirect light and with very little care.",
    shortDescription: "Popular houseplant with heart-shaped leaves",
    price: 299,
    originalPrice: 399,
    category: "Indoor Plants",
    images: {
      main: "/assets/broken-heart-plant/main_image.webp",
      hover: "/assets/broken-heart-plant/hover_image.webp",
    },
    stock: 28,
    sku: "BHP001",
    rating: {
      average: 5,
      count: 345,
    },
    badges: ["Bestseller"],
    careInstructions: {
      light: "Bright, indirect light",
      water: "Water when top inch of soil is dry",
      soil: "Well-draining, rich potting mix",
      temperature: "20-27°C",
      humidity: "Moderate to high",
    },
    specifications: {
      height: "30-50 cm",
      spread: "20-30 cm",
      potSize: "8 inch",
      plantType: "Foliage",
      difficulty: "Easy",
    },
    tags: [
      "broken-heart",
      "popular",
      "heart-shaped",
      "low-maintenance",
      "tropical",
    ],
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log("🌱 Sample products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedProducts();
}

module.exports = { seedProducts, sampleProducts };
