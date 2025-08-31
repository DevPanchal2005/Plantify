import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, fallback = null }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Please sign in to access this page.</p>
        <button
          onClick={() => {
            // This would trigger the auth modal
            // For now, just show an alert
            alert('Please sign in to continue');
          }}
          className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Sign In
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
