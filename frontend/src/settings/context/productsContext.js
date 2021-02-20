import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const fetchProducts = async() => {
        setLoading(true);
        try {
            const res = await fetch("/api/products");
            const data = await res.json();

            if(data) {
                setProducts(data);
                setLoading(false);
            } else {
                setProducts([]);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <ProductsContext.Provider value={{products, loading}}>
            {children}
        </ProductsContext.Provider>
    )
}

const useProductsContext = () => {
    return useContext(ProductsContext);
}

export { ProductsProvider, useProductsContext };