import { Link } from 'react-router-dom';
import Footer from './Footer';

const CheckoutSuccess = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="mb-6 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-bold text-3xl mb-6">Order Placed Successfully!</h1>
          <p className="mb-6 text-gray-600 max-w-md mx-auto">
            Thank you for your purchase. Your order has been received and is being processed.
            You will receive an email confirmation shortly.
          </p>
          <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutSuccess;