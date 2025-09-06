import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from './main';
import appStore from '../assets/appstore_2x.webp'
import playStore from '../assets/playstore_2x.webp'
import { useCart } from './CartContext';
import { convertUSDtoINR, formatINR } from '../utils/currency';

const Home = () => {
    const context = useContext(Context);
    const { addToCart } = useCart();

    if (!context) {
        throw new Error("Home must be used within a Context.Provider");
    }

    const { prod: products, search, menu } = context;
    
    const handleAddToCart = (e: React.MouseEvent, product: any) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <>
            <div className="grid grid-cols-4">
                {products?.filter((data: any) => data?.title?.includes(search || menu)).map((data: any, index: number) => (
                    <Link to="/details" state={{ data }} key={index}>
                        <div className="border border-spacing-1 p-2 ml-3 mt-3 relative group">
                            <img src={data?.image} alt={data?.title} className="w-60 h-48" />
                            <h1 className="font-bold text-xl">{formatINR(convertUSDtoINR(data?.price))}</h1>
                            <h1>{data?.title}</h1>
                            <h1>{data?.category}</h1>
                            <button 
                                onClick={(e) => handleAddToCart(e, data)}
                                className="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='flex m-10 '>
                <div className='flex flex-col justify-center w-96 ml-10 mr-10'>
                    <h1 className='font-bold text-5xl w-96 '>Try the EcoFinds app</h1>
                    <p className='w-96 mt-6'>Buy, sell and find just about anything using the app on your mobile.</p>
                </div>
                <div className='w-56 flex flex-col justify-center ml-10 '>
                    <h1 className='w-52 mb-5 font-bold'>Get your app today</h1>
                    <div className='flex flex-row '>
                        <img className='w-32' src={appStore} alt="App Store" />
                        <img className='w-32 ml-5' src={playStore} alt="Play Store" />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home