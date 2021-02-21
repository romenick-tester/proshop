import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from ".."

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.productList);

    useEffect(() => {
        dispatch(getProductList());
    }, [dispatch])

    return (
        <ProductsContext.Provider value={{...state}}>
            {children}
        </ProductsContext.Provider>
    )
}

const useProductsContext = () => {
    return useContext(ProductsContext);
}

export { ProductsProvider, useProductsContext };