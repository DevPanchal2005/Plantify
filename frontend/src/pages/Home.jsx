import { useState, useEffect, useCallback } from "react";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import { productAPI } from "../services/api";
import { useSearch } from "../contexts/SearchContext";

// Debounce utility function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({});

  const { globalSearchQuery, clearGlobalSearch } = useSearch();

  // Fetch products from API
  const fetchProducts = async (
    sortOption = sortBy,
    searchTerm = searchQuery
  ) => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (sortOption && sortOption !== "popular") {
        params.sort = sortOption;
      }
      if (searchTerm && searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      const response = await productAPI.getAll(params);

      if (response.data.success) {
        // Transform API data to match component expectations
        const transformedProducts = response.data.data.map((product) => ({
          id: product._id,
          name: product.name,
          mainImage: product.images.main,
          hoverImage: product.images.hover,
          originalPrice: product.originalPrice,
          currentPrice: product.price,
          discount:
            product.discount ||
            Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            ),
          rating: Math.round(product.rating.average),
          badge: product.badges?.[0],
          priceRange: product.originalPrice
            ? `From ₹${product.price}`
            : `₹${product.price}`,
        }));

        setProducts(transformedProducts);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again.");
      // Fallback to empty array on error
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle global search from navigation
  useEffect(() => {
    if (globalSearchQuery) {
      setSearchQuery(globalSearchQuery);
      handleInstantSearch(globalSearchQuery);
      clearGlobalSearch(); // Clear after using
    }
  }, [globalSearchQuery]);

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    fetchProducts(sortOption, searchQuery);
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      fetchProducts(sortBy, searchTerm);
    }, 300),
    [sortBy]
  );

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    if (searchTerm.trim().length >= 2 || searchTerm.trim().length === 0) {
      debouncedSearch(searchTerm);
    }
  };

  const handleInstantSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    fetchProducts(sortBy, searchTerm);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Banner />
        <section className="p-10">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading plants...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Banner />
        <section className="p-10">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => fetchProducts()}
                className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner Section */}
      <Banner />

      {/* Product Section */}
      <section className="p-10">
        <h2 className="text-4xl font-bold text-green-900 mb-4">Plants</h2>
        <p className="text-gray-700 text-lg mb-6">
          Plants make for the best house companions, suitable for all your moods
          and every aesthetic.
        </p>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for plants, seeds... (min 2 characters)"
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                // Auto-search as user types (debounced)
                handleSearch(value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleInstantSearch(e.target.value);
                }
              }}
              className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <button
              onClick={() => handleInstantSearch(searchQuery)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition"
            >
              🔍
            </button>
          </div>
          {searchQuery && (
            <div className="text-center mt-2">
              <span className="text-sm text-gray-600">
                {searchQuery.length < 2 && searchQuery.length > 0
                  ? "Type at least 2 characters to search..."
                  : `Searching for: "${searchQuery}"`}
                {products.length > 0 && searchQuery.length >= 2 && (
                  <span className="text-green-600 ml-2">
                    ({products.length} result{products.length !== 1 ? "s" : ""}{" "}
                    found)
                  </span>
                )}
              </span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleInstantSearch("");
                }}
                className="ml-2 text-sm text-green-600 hover:text-green-700 underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition appearance-none cursor-pointer pr-10"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg mb-2">
              {searchQuery
                ? `No plants found for "${searchQuery}"`
                : "No products found."}
            </p>
            {searchQuery && (
              <div className="text-sm text-gray-500 space-y-1">
                <p>Try searching for:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {[
                    "Monstera",
                    "Peace Lily",
                    "Bamboo",
                    "Jade",
                    "Indoor Plants",
                    "Flowering",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleInstantSearch(suggestion)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {pagination.pages > 1 && (
          <div className="text-center mt-8">
            <button className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition">
              Load More Products ({pagination.page} of {pagination.pages})
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
