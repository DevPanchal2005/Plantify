import { useCart } from '../contexts/CartContext';

const CartIcon = ({ onClick }) => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <button
      onClick={onClick}
      className="relative text-gray-800 hover:text-green-600 transition"
      aria-label="Shopping Cart"
    >
      🛒
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
