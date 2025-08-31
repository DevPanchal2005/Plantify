import { createContext, useContext, useReducer, useEffect } from "react";
import { userAPI } from "../services/api";
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  hasPersistentLogin,
  getRememberMePreference,
} from "../utils/cookies";

// Auth Context
const AuthContext = createContext();

// Auth Actions
const AUTH_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_USER: "SET_USER",
  SET_ERROR: "SET_ERROR",
  LOGOUT: "LOGOUT",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Initial state
const initialState = {
  user: null,
  token: getAuthToken(),
  isAuthenticated: false,
  loading: true,
  error: null,
  rememberMe: getRememberMePreference(),
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
      };

    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on mount if token exists
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      loadUser();
    } else {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Load user profile
  const loadUser = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const response = await userAPI.getProfile();

      if (response.data.success) {
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: {
            user: response.data.data,
            token: getAuthToken(),
          },
        });
      }
    } catch (error) {
      console.error("Error loading user:", error);
      // If token is invalid, remove it from both localStorage and cookies
      removeAuthToken();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const response = await userAPI.register(userData);

      if (response.data.success) {
        const { user, token } = response.data.data;

        // Store token in localStorage (default for registration)
        setAuthToken(token, false);

        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: { user, token },
        });

        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error("Registration error:", error);
      const message = error.response?.data?.message || "Registration failed";
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: message });
      return { success: false, message };
    }
  };

  // Login user
  const login = async (credentials, rememberMe = false) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const response = await userAPI.login(credentials);

      if (response.data.success) {
        const { user, token } = response.data.data;

        // Store token based on remember me preference
        setAuthToken(token, rememberMe);

        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: { user, token, rememberMe },
        });

        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      const message = error.response?.data?.message || "Login failed";
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: message });
      return { success: false, message };
    }
  };

  // Logout user
  const logout = () => {
    removeAuthToken();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const response = await userAPI.updateProfile(userData);

      if (response.data.success) {
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: {
            user: response.data.data,
            token: state.token,
          },
        });

        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error("Profile update error:", error);
      const message = error.response?.data?.message || "Profile update failed";
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: message });
      return { success: false, message };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    // State
    ...state,

    // Actions
    register,
    login,
    logout,
    loadUser,
    updateProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
