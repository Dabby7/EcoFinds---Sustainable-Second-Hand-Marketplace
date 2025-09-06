import { useNavigate, Link } from 'react-router-dom';
import ecofindsLogo from '../assets/ecofinds-logo.svg';
import search from "../assets/search.png";
import arrow from '../assets/arrow.png';
import searchblack from '../assets/searchblack.png';
import Login from './Login';
import { useContext, useState, useEffect } from 'react';
import { Context } from './main';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/setup';
import { useCart } from './CartContext';

// List of major Indian cities for the dropdown
const indianCities = [
    "Select City",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
    "Dhanbad",
    "Amritsar",
    "Allahabad",
    "Ranchi",
    "Coimbatore",
    "Jabalpur",
    "Gwalior",
    "Vijayawada",
    "Jodhpur",
    "Madurai",
    "Raipur",
    "Kota",
    "Chandigarh",
    "Guwahati",
    "Solapur",
    "Hubli-Dharwad",
    "Mysore",
    "Tiruchirappalli",
    "Bareilly",
    "Aligarh",
    "Tiruppur",
    "Gurgaon",
    "Moradabad",
    "Jalandhar",
    "Bhubaneswar",
    "Salem",
    "Warangal",
    "Mira-Bhayandar",
    "Jalgaon",
    "Guntur",
    "Thiruvananthapuram",
    "Bhiwandi",
    "Saharanpur",
    "Gorakhpur",
    "Bikaner",
    "Amravati",
    "Noida",
    "Jamshedpur",
    "Bhilai",
    "Cuttack",
    "Firozabad",
    "Kochi",
    "Nellore",
    "Bhavnagar",
    "Dehradun",
    "Durgapur",
    "Asansol",
    "Rourkela",
    "Nanded",
    "Kolhapur",
    "Ajmer",
    "Akola",
    "Gulbarga",
    "Jamnagar",
    "Ujjain",
    "Loni",
    "Siliguri",
    "Jhansi",
    "Ulhasnagar",
    "Jammu",
    "Sangli-Miraj & Kupwad",
    "Mangalore",
    "Erode",
    "Belgaum",
    "Ambattur",
    "Tirunelveli",
    "Malegaon",
    "Gaya",
    "Udaipur",
    "Kakinada",
];

const Navbar = () => {
    const [loginPop, setLoginPop] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedCity, setSelectedCity] = useState("Select City");
    const context = useContext(Context);
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    
    // Check if user is logged in when component mounts
    useEffect(() => {
        const checkAuthStatus = () => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            });
        };
        
        checkAuthStatus();
    }, []);

    if (!context) {
        throw new Error("Navbar must be used within a Context.Provider");
    }

    const { setSearch } = context;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSellClick = () => {
        if (!isLoggedIn) {
            setLoginPop(true);
        } else {
            navigate('/Addproduct');
        }
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    return (
        <>
            <div className='flex p-4 bg-slate-100 shadow-md'>
                <img src={ecofindsLogo} className='w-16 h-12 ml-4 mr-8' alt="EcoFinds Logo" />
                <div className='flex border border-spacing-1 w-72 p-2 border-black ml-5 mr-8 bg-white'>
                    <img src={search} className='w-6 h-5 mt-1' />
                    <select 
                        value={selectedCity} 
                        onChange={handleCityChange} 
                        className='ml-3 outline-none bg-transparent w-full'
                    >
                        {indianCities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                    <img src={arrow} className='w-8 h-6' />
                </div>
                <div className='flex h-12 ml-8 mr-8 border-2 border-black bg-white'>
                    <input onChange={(e) => setSearch(e.target.value)} placeholder='Find Cars , Moblie Phone and More' className='ml-3 w-96 outline-none' />
                    <img src={searchblack} />
                </div>
                <div className='flex h-12 p-3 ml-10 cursor-pointer'>
                    <h1 className='font-semibold'>English</h1>
                    <img src={arrow} className='w-8 h-7' />
                </div>
                {!isLoggedIn ? (
                    <div onClick={() => { setLoginPop(!loginPop) }} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
                        <h1 className='font-bold text-lg'>Login</h1>
                    </div>
                ) : (
                    <div onClick={handleLogout} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
                        <h1 className='font-bold text-lg'>Logout</h1>
                    </div>
                )}
                <div onClick={handleSellClick} className='w-28 flex h-12 p-2 ml-6 cursor-pointer rounded-full border border-yellow-500'>
                    <h1 className='font-bold text-lg ml-3'>+ Sell</h1>
                </div>
                <Link to="/cart" className='flex h-12 p-3 ml-6 cursor-pointer relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {getCartCount() > 0 && (
                        <span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                            {getCartCount()}
                        </span>
                    )}
                </Link>

            </div>
            {loginPop && <Login setLoginPop={setLoginPop} onLoginSuccess={() => setIsLoggedIn(true)} />}
        </>
    );
};

export default Navbar;
