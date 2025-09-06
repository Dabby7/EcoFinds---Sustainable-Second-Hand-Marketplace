import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { storage, db } from '../Firebase/setup';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';
import { convertUSDtoINR } from '../utils/currency';

const AddProduct = () => {
    const navigate = useNavigate();
    const [productTitle, setProductTitle] = useState<string>('');
    const [productPrice, setProductPrice] = useState<number | string>('');
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageURL = '';
            if (image) {
                const imageRef = ref(storage, `products/${uuidv4()}`);
                const uploadSnapshot = await uploadBytes(imageRef, image);
                imageURL = await getDownloadURL(uploadSnapshot.ref);
                console.log('Image URL:', imageURL);
            }

            const productCollectionRef = collection(db, 'products');
            // Convert INR price back to USD for storage
            const priceInUSD = Number(productPrice) / 83.5;
            
            await addDoc(productCollectionRef, {
                productTitle,
                productPrice: priceInUSD,
                category,
                description,
                imageURL,
            });
            console.log('Product added successfully!');
            setSuccess(true);
            setShowModal(true);
            
            // Reset form after user closes modal or after 3 seconds
            setTimeout(() => {
                if (showModal) {
                    setProductTitle('');
                    setProductPrice('');
                    setCategory('');
                    setDescription('');
                    setImage(null);
                    setSuccess(false);
                    setShowModal(false);
                    navigate('/');
                }
            }, 3000);

        } catch (error) {
            console.error('Error storing product in Firestore:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const fileType = file.type.split('/')[0];
            if (fileType === 'image') {
                setImage(file);
            } else {
                alert('Please upload a valid image file');
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setProductTitle('');
        setProductPrice('');
        setCategory('');
        setDescription('');
        setImage(null);
        setSuccess(false);
        navigate('/');
    };

    return (
        <>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50">
                    <div className="relative w-auto max-w-md mx-auto my-6">
                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h3 className="text-2xl font-semibold text-gray-900">Success!</h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={closeModal}
                                >
                                    <span className="text-black h-6 w-6 text-2xl block">×</span>
                                </button>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <div className="flex items-center justify-center mb-4">
                                    <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <p className="my-4 text-lg text-center text-gray-600">
                                    Your product has been listed successfully!
                                </p>
                            </div>
                            <div className="flex items-center justify-center p-6 border-t border-solid border-gray-300 rounded-b">
                                <button
                                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    onClick={closeModal}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
                    <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
                    {success && !showModal && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                            Product added successfully! Redirecting to home page...
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="title">Product Title</label>
                            <input type="text" id="title" className="w-full p-2 border border-gray-300 rounded"
                                value={productTitle} onChange={(e) => setProductTitle(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="price">Price (₹)</label>
                            <input type="number" id="price" className="w-full p-2 border border-gray-300 rounded"
                                value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required 
                                placeholder="Enter price in Indian Rupees" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="category">Category</label>
                            <input type="text" id="category" className="w-full p-2 border border-gray-300 rounded"
                                value={category} onChange={(e) => setCategory(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="description">Description</label>
                            <textarea id="description" className="w-full p-2 border border-gray-300 rounded"
                                value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="image">Product Image</label>
                            <input type="file" id="image" accept="image/*" className="w-full p-2 border border-gray-300 rounded" onChange={handleImageChange} />
                        </div>
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading} >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddProduct;
