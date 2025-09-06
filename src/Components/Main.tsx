import { createContext, useEffect, useState } from "react"
import Menubar from "./Menubar"
import Navbar from "./Navbar"
import Home from "./Home"
import Footer from "./Footer"

interface ContextType {
    prod: any[];
    search: string;
    setSearch: (value: string) => void;
    menu: string;
    setMenu: (value: string) => void;
}

export const Context = createContext<ContextType | undefined>(undefined);

const Main = () => {
    const [prod, setProd] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");
    const [menu, setMenu] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const getProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(json => {
                setProd(json);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Context.Provider value={{ prod, search, setSearch, menu, setMenu }}>
            <div>
                <Navbar />
                <Menubar />
                {loading ? <p className="font-bold text-3xl text-center m-56 text-red-950">Loading products...</p> : <Home />}
                <Footer />
            </div>
        </Context.Provider>
    )
}

export default Main