import { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../services/api';

// Cart Context
const CartContext = createContext();

// Cart Actions
const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_CART: 'SET_CART',
  SET_ERROR: 'SET_ERROR',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  SET_ITEM_COUNT: 'SET_ITEM_COUNT'
};

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  loading: false,
  error: null,
  isOpen: false
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null
      };

    case CART_ACTIONS.SET_CART:
      return {
        ...state,
        items: action.payload.items || [],
        totalItems: action.payload.totalItems || 0,
        totalAmount: action.payload.totalAmount || 0,
        loading: false,
        error: null
      };

    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case CART_ACTIONS.SET_ITEM_COUNT:
      return {
        ...state,
        totalItems: action.payload
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalAmount: 0
      };

    default:
      return state;
  }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart on mount (if user is authenticated)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadCart();
    }
  }, []);

  // Load cart from API
  const loadCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      const response = await cartAPI.get();
      
      if (response.data.success) {
        dispatch({ type: CART_ACTIONS.SET_CART, payload: response.data.data });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      // If user is not authenticated, just set empty cart
      if (error.response?.status === 401) {
        dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: [], totalItems: 0, totalAmount: 0 } });
      } else {
        dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to load cart' });
      }
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      const response = await cartAPI.add(productId, quantity);
      
      if (response.data.success) {
        dispatch({ type: CART_ACTIONS.SET_CART, payload: response.data.data });
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      const message = error.response?.data?.message || 'Failed to add item to cart';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: message });
      return { success: false, message };
    }
  };

  // Update cart item quantity
  const updateCartItem = async (productId, quantity) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      const response = await cartAPI.update(productId, quantity);
      
      if (response.data.success) {
        dispatch({ type: CART_ACTIONS.SET_CART, payload: response.data.data });
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      const message = error.response?.data?.message || 'Failed to update cart';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: message });
      return { success: false, message };
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      const response = await cartAPI.remove(productId);
      
      if (response.data.success) {
        dispatch({ type: CART_ACTIONS.SET_CART, payload: response.data.data });
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      const message = error.response?.data?.message || 'Failed to remove item from cart';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: message });
      return { success: false, message };
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      const response = await cartAPI.clear();
      
      if (response.data.success) {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      const message = error.response?.data?.message || 'Failed to clear cart';
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: message });
      return { success: false, message };
    }
  };

  // Get cart item count
  const getCartItemCount = () => {
    return state.totalItems;
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return state.items.some(item => item.product._id === productId);
  };

  // Get cart item by product ID
  const getCartItem = (productId) => {
    return state.items.find(item => item.product._id === productId);
  };

  // Calculate cart totals
  const getCartTotals = () => {
    const subtotal = state.totalAmount;
    const shipping = subtotal >= 1499 ? 0 : 99; // Free shipping above ₹1499
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
      itemCount: state.totalItems
    };
  };

  const value = {
    // State
    ...state,
    
    // Actions
    loadCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    
    // Utilities
    getCartItemCount,
    isInCart,
    getCartItem,
    getCartTotals
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
