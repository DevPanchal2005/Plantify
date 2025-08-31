import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);

  if (!isOpen) return null;

  const handleSwitchToLogin = () => setMode("login");
  const handleSwitchToRegister = () => setMode("register");
  const handleSwitchToForgotPassword = () => setMode("forgot-password");

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="relative max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 text-2xl bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
          >
            ×
          </button>

          {/* Auth Forms */}
          {mode === "login" ? (
            <Login
              onClose={onClose}
              onSwitchToRegister={handleSwitchToRegister}
              onSwitchToForgotPassword={handleSwitchToForgotPassword}
            />
          ) : mode === "register" ? (
            <Register onClose={onClose} onSwitchToLogin={handleSwitchToLogin} />
          ) : mode === "forgot-password" ? (
            <ForgotPassword
              onClose={onClose}
              onBackToLogin={handleSwitchToLogin}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AuthModal;
