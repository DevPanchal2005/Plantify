import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import CartDrawer from "./CartDrawer";
import AuthModal from "./AuthModal";
import UserMenu from "./UserMenu";
import { useAuth } from "../contexts/AuthContext";
import { useSearch } from "../contexts/SearchContext";

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [navSearchQuery, setNavSearchQuery] = useState("");

  const { isAuthenticated, user, loading } = useAuth();
  const { updateGlobalSearch } = useSearch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const openAuthModal = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleNavSearch = (searchTerm) => {
    updateGlobalSearch(searchTerm);
    navigate("/");
  };

  const navigationItems = [
    {
      name: "PLANTS",
      items: [
        "Indoor Plants",
        "Flowering Plants",
        "Low Maintenance Plants",
        "Air Purifying Plants",
        "Low Light Plants",
        "Cacti & Succulents",
        "Hanging Plants",
        "Medicinal & Aromatic Plants",
        "Pet-Friendly Plants",
        "Fruit Plants",
        "Bundles",
        "New Arrivals",
        "Shop by Location",
        "Subscriptions",
      ],
    },
    {
      name: "SEEDS",
      items: [
        "Flower Seeds",
        "Vegetable Seeds",
        "Microgreen Seeds",
        "Herb Seeds",
        "Flower Bulbs",
        "Fruit Seeds",
        "Tree & Grass Seeds",
      ],
    },
    {
      name: "POTS & PLANTERS",
      items: [
        "Plastic Pots",
        "Ceramic Pots",
        "Metal Planters",
        "Wooden Planters",
        "Hanging Planters",
        "Plant Stands",
        "Seedling Trays",
      ],
    },
    {
      name: "Plant Care",
      items: [
        "Potting Mix & Fertilizers",
        "Garden Tools",
        "Watering Tools & Accessories",
        "Garden Decor & Accessories",
        "Pest Control",
        "Video Consultation - Doctor Green",
      ],
    },
    {
      name: "GIFTING",
      items: ["Corporate/Bulk Gifting", "Personalised Gifting", "Gift Cards"],
    },
  ];

  return (
    <>
      <nav className="bg-[var(--nav-color)] shadow-md px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-green-700 text-2xl font-bold flex items-center space-x-2"
          >
            <span className="font-pacifico text-3xl">Plantify</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <ul className="hidden lg:flex space-x-6 text-gray-800 font-medium">
            {navigationItems.map((item) => (
              <li key={item.name} className="relative group">
                <a
                  href="#"
                  className="text-green-800 transition group-hover:text-green-600 font-bold font-montserrat"
                >
                  {item.name}
                </a>
                {/* Dropdown Menu */}
                <ul className="absolute left-0 w-60 bg-[var(--nav-color)] shadow-lg rounded-md p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                  {item.items.map((subItem) => (
                    <li
                      key={subItem}
                      className="px-4 py-2 text-green-900 hover:bg-green-100 rounded-md"
                    >
                      <a href="#">{subItem}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li className="text-green-800 hover:text-green-600 transition font-bold font-montserrat">
              <a href="#">BLOG</a>
            </li>
            <li className="text-green-800 hover:text-green-600 transition font-bold font-montserrat">
              <a href="#">OFFERS</a>
            </li>
          </ul>

          {/* Search Bar & Icons */}
          <div className="flex items-center space-x-4">
            <div className="relative md:block">
              <input
                type="text"
                placeholder="Search for plants, seeds..."
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleNavSearch(e.target.value);
                  }
                }}
                className="w-60 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button
                onClick={() => handleNavSearch(navSearchQuery)}
                className="absolute right-3 top-2 text-gray-400 hover:text-green-600 transition"
              >
                🔍
              </button>
            </div>
            {/* Authentication Section */}
            {loading ? (
              <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
            ) : isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openAuthModal("login")}
                  className="text-gray-800 hover:text-green-600 transition text-sm font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal("register")}
                  className="bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-600 transition text-sm font-medium"
                >
                  Sign Up
                </button>
              </div>
            )}
            <CartIcon onClick={toggleCart} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden flex items-center text-gray-800 text-2xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed left-0 top-0 w-64 h-full bg-[var(--nav-color)] shadow-lg transform transition-transform duration-300 lg:hidden z-50 overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-800 text-2xl"
        >
          ×
        </button>

        <ul className="mt-16 space-y-4 px-6 text-gray-800 font-medium">
          {navigationItems.map((item) => (
            <li key={item.name} className="relative">
              <button
                className="w-full text-left text-green-800 hover:text-green-600 font-bold flex justify-between items-center"
                onClick={() => toggleDropdown(item.name)}
              >
                {item.name} ▼
              </button>
              <ul
                className={`mt-2 space-y-2 pl-4 ${
                  openDropdown === item.name ? "block" : "hidden"
                }`}
              >
                {item.items.map((subItem) => (
                  <li
                    key={subItem}
                    className="px-4 py-2 text-green-900 hover:bg-green-100 rounded-md"
                  >
                    <a href="#">{subItem}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className="text-green-800 hover:text-green-600 transition font-bold">
            <a href="#">BLOG</a>
          </li>
          <li className="text-green-800 hover:text-green-600 transition font-bold">
            <a href="#">OFFERS</a>
          </li>
        </ul>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authMode}
      />
    </>
  );
};

export default Navigation;
