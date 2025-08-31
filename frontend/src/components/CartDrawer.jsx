import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
  const { 
    items, 
    loading, 
    updateCartItem, 
    removeFromCart, 
    clearCart, 
    getCartTotals 
  } = useCart();
  
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const totals = getCartTotals();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 0) return;
    
    setUpdatingItems(prev => new Set(prev).add(productId));
    
    if (newQuantity === 0) {
      await removeFromCart(productId);
    } else {
      await updateCartItem(productId, newQuantity);
    }
    
    setUpdatingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  const handleRemoveItem = async (productId) => {
    setUpdatingItems(prev => new Set(prev).add(productId));
    await removeFromCart(productId);
    setUpdatingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-green-800">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading && (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
              </div>
            )}

            {!loading && items.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Continue Shopping
                </button>
              </div>
            )}

            {!loading && items.length > 0 && (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product._id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    {/* Product Image */}
                    <img
                      src={item.product.images?.main || '/placeholder-plant.jpg'}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.product.name}</h3>
                      <p className="text-green-700 font-bold">₹{item.price}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                          disabled={updatingItems.has(item.product._id)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                          disabled={updatingItems.has(item.product._id)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      disabled={updatingItems.has(item.product._id)}
                      className="text-red-500 hover:text-red-700 disabled:opacity-50"
                    >
                      🗑️
                    </button>
                  </div>
                ))}

                {/* Clear Cart Button */}
                {items.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="w-full text-red-600 hover:text-red-800 text-sm py-2"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{totals.shipping === 0 ? 'Free' : `₹${totals.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%):</span>
                  <span>₹{totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>₹{totals.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-600 transition font-medium"
                onClick={() => {
                  // TODO: Navigate to checkout
                  alert('Checkout functionality coming soon!');
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
