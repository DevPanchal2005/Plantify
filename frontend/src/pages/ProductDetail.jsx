import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productAPI } from "../services/api";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import ProductCard from "../components/ProductCard";
import LightGuide from "../components/LightGuide";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("main");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLightGuideOpen, setIsLightGuideOpen] = useState(false);

  const lightGuideRef = useRef(null);

  const { addToCart, isInCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getById(id);

        if (response.data.success) {
          setProduct(response.data.data);
          // Fetch related products
          fetchRelatedProducts(response.data.data.category);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (category) => {
      try {
        const response = await productAPI.getAll();
        if (response.data.success) {
          // Filter products by same category, exclude current product, limit to 4
          const related = response.data.data
            .filter((p) => p.category === category && p._id !== id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to add items to your cart");
      return;
    }

    setIsAddingToCart(true);
    try {
      const result = await addToCart(product._id, quantity);
      if (result.success) {
        alert(`Added ${quantity} ${product.name}(s) to cart!`);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The product you are looking for does not exist."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <button
                onClick={() => navigate("/")}
                className="text-green-700 hover:text-green-600"
              >
                Home
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <button
                onClick={() => navigate("/")}
                className="text-green-700 hover:text-green-600"
              >
                Plants
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-800 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={
                  product.images?.[selectedImage] ||
                  product.images?.main ||
                  "/placeholder-plant.jpg"
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Thumbnails */}
            {product.images && (
              <div className="flex space-x-2">
                {Object.entries(product.images).map(([key, url]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedImage(key)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === key
                        ? "border-green-700"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`${product.name} ${key}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-green-700">
                  ₹{product.price}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
              </div>
            </div>

            {/* Rating and Reviews */}
            {product.rating &&
              (product.rating.average > 0 || product.rating > 0) && (
                <div className="flex items-center space-x-2">
                  <div className="text-yellow-500 text-lg">
                    {renderStars(
                      Math.round(product.rating.average || product.rating)
                    )}
                  </div>
                  <span className="text-gray-600">
                    ({(product.rating.average || product.rating).toFixed(1)}/5)
                    {product.rating.count &&
                      ` • ${product.rating.count} reviews`}
                  </span>
                </div>
              )}

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description ||
                  "No description available for this product."}
              </p>
            </div>

            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Features
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Care Instructions */}
            {product.careInstructions && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Care Instructions
                </h3>
                {typeof product.careInstructions === "string" ? (
                  <p className="text-gray-700">{product.careInstructions}</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.careInstructions.light && (
                      <div className="flex items-start space-x-2 relative">
                        <span className="text-yellow-500">☀️</span>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              Light:
                            </span>
                            <button
                              ref={lightGuideRef}
                              onClick={() =>
                                setIsLightGuideOpen(!isLightGuideOpen)
                              }
                              className="text-green-600 hover:text-green-700 text-md  font-medium underline flex items-center"
                              title="View Light Guide"
                            >
                              View Light Guide     
                            </button>
                          </div>
                          <p className="text-gray-700 text-sm">
                            {product.careInstructions.light}
                          </p>
                          {/* Light Guide Modal */}
                          <LightGuide
                            isOpen={isLightGuideOpen}
                            onClose={() => setIsLightGuideOpen(false)}
                          />
                        </div>
                      </div>
                    )}
                    {product.careInstructions.water && (
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-500">💧</span>
                        <div>
                          <span className="font-medium text-gray-900">
                            Water:
                          </span>
                          <p className="text-gray-700 text-sm">
                            {product.careInstructions.water}
                          </p>
                        </div>
                      </div>
                    )}
                    {product.careInstructions.soil && (
                      <div className="flex items-start space-x-2">
                        <span className="text-amber-600">🌱</span>
                        <div>
                          <span className="font-medium text-gray-900">
                            Soil:
                          </span>
                          <p className="text-gray-700 text-sm">
                            {product.careInstructions.soil}
                          </p>
                        </div>
                      </div>
                    )}
                    {product.careInstructions.temperature && (
                      <div className="flex items-start space-x-2">
                        <span className="text-red-500">🌡️</span>
                        <div>
                          <span className="font-medium text-gray-900">
                            Temperature:
                          </span>
                          <p className="text-gray-700 text-sm">
                            {product.careInstructions.temperature}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Availability:
              </span>
              <span
                className={`text-sm font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity Selector and Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="px-3 py-2 hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="flex-1 bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding...
                      </>
                    ) : isInCart(product._id) ? (
                      "Added to Cart ✓"
                    ) : (
                      "Add to Cart"
                    )}
                  </button>

                  <button className="px-6 py-3 border border-green-700 text-green-700 rounded-lg hover:bg-green-50 transition">
                    ❤️ Wishlist
                  </button>
                </div>
              </div>
            )}

            {/* Product Categories/Tags */}
            {product.category && (
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Category:{" "}
                </span>
                <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct._id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
