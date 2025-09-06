import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { convertUSDtoINR, formatINR } from '../utils/currency';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getCartTotal, getFormattedCartTotalINR } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="font-bold text-3xl mb-6">Your Cart is Empty</h1>
          <p className="mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-bold text-3xl mb-6">Your Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex border-b border-gray-200 py-4">
                <div className="w-24 h-24 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div className="ml-4 flex-grow">
                  <Link to="/details" state={{ data: item }} className="font-semibold hover:text-blue-500 transition-colors">
                    {item.title}
                  </Link>
                  <p className="text-gray-600 mt-1">{formatINR(convertUSDtoINR(item.price))}</p>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l"
                  >
                    -
                  </button>
                  <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => increaseQuantity(item.id)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.title.substring(0, 20)}... × {item.quantity}</span>
                <span>{formatINR(convertUSDtoINR(item.price * item.quantity))}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{getFormattedCartTotalINR()}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')} 
              className="w-full bg-blue-500 text-white py-2 rounded-md mt-6 hover:bg-blue-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;