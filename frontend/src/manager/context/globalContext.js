import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchProducts = async() => {
        setLoading(true);
        try {
            const res = await fetch("/api/products");
            const data = await res.json();

            if(data) {
                setLoading(false);
                setProducts(data);
            } else {
                setLoading(false);
                console.log("failed to fetch data!");
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const values = { value: { products, loading } }

    return (
        <AppContext.Provider {...values}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppProvider, useGlobalContext };