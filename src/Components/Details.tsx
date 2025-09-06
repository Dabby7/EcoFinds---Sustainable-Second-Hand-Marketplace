import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useCart } from "./CartContext";
import { convertUSDtoINR, formatINR } from '../utils/currency';

const Details = () => {
    const location = useLocation();
    const data = location.state?.data;
    const { addToCart } = useCart();

    return (
        <>
            <h1 className="font-bold text-7xl m-10 text-center">
                Product Detail Page
            </h1>
            <div className="flex p-4">
                <img src={data.image} alt={data.title} className="w-2/3  mr-10" />
                <div>
                    <h1 className="font-bold text-3xl"> {formatINR(convertUSDtoINR(data.price))}</h1>
                    <h1 className="mt-5"> <span className="font-semibold">Category</span> : {data.category}</h1>
                    <h1 className="mt-5"> <span className="font-semibold">Title</span> : {data.title}</h1>
                    <h1 className="mt-5"> <span className="font-semibold">Description</span> : {data.description}</h1>
                    <button 
                        onClick={() => addToCart(data)}
                        className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Details;
