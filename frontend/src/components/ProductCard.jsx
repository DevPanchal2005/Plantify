import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Handle both transformed (homepage) and raw API (product detail) data formats
  const id = product.id || product._id;
  const name = product.name;
  const mainImage = product.mainImage || product.images?.main;
  const hoverImage = product.hoverImage || product.images?.hover;
  const originalPrice = product.originalPrice;
  const currentPrice = product.currentPrice || product.price;
  const priceRange = product.priceRange;

  // Handle discount - use provided discount or calculate it
  const discount =
    product.discount ||
    (originalPrice && currentPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : null);

  // Handle rating - use provided rating or extract from rating object
  const rating = product.rating || product.rating?.average;
  const ratingCount = product.rating?.count;

  // Handle badges - can be string, array, or single badge
  const badges = product.badges
    ? Array.isArray(product.badges)
      ? product.badges
      : [product.badges]
    : product.badge
    ? [product.badge]
    : [];
  const badge = badges.length > 0 ? badges[0] : null;

  // Derived properties
  const isNew = badges.includes("New");
  const isTrending = badges.includes("Trending");
  const isBestseller = badges.includes("Bestseller");

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Trending":
        return "bg-yellow-400 text-black";
      case "Bestseller":
        return "bg-yellow-400 text-black";
      case "New":
        return "bg-green-500 text-white";
      default:
        return "bg-yellow-400 text-black";
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  const handleViewProduct = (e) => {
    e.stopPropagation(); // Prevent double navigation
    navigate(`/product/${id}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition relative cursor-pointer flex flex-col h-full">
      <div onClick={handleProductClick} className="flex-grow">
        {/* Discount Badge */}
        {discount && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 text-sm font-bold rounded z-10">
            {discount}%
          </span>
        )}

        {/* Status Badge */}
        {badge && (
          <span
            className={`absolute top-3 right-3 px-2 py-1 text-sm font-bold rounded z-10 ${getBadgeColor(
              badge
            )}`}
          >
            {badge}
          </span>
        )}

        {/* Product Image */}
        <div
          className="relative w-full h-60 overflow-hidden rounded-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={mainImage}
            alt={name}
            className={`w-full h-full object-cover rounded-lg transition duration-300 ease-in-out ${
              isHovered && hoverImage ? "opacity-0" : "opacity-100"
            }`}
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt={`${name} Hover`}
              className={`w-full h-full object-cover rounded-lg absolute top-0 left-0 transition duration-300 ease-in-out ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>

        {/* Product Info */}
        <h3 className="text-2xl font-semibold mt-4 text-green-800">{name}</h3>

        {/* Pricing */}
        <div className="mt-2">
          {originalPrice && (
            <p className="text-gray-600 line-through">₹{originalPrice}</p>
          )}
          {priceRange ? (
            <p className="text-green-700 text-lg font-bold">{priceRange}</p>
          ) : (
            <p className="text-green-700 text-lg font-bold">₹{currentPrice}</p>
          )}
        </div>

        {/* Rating */}
        {rating && (
          <div className="text-yellow-500 text-lg mt-1">
            {renderStars(rating)}
          </div>
        )}
      </div>

      {/* View Product Button - Fixed at bottom */}
      <button
        onClick={handleViewProduct}
        className="mt-4 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition w-full flex items-center justify-center font-medium"
      >
        View Product
        <svg
          className="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProductCard;
