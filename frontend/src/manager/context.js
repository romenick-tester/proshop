import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductList, getProductDetails } from ".";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.productList);
    const { loading: load, error: err, product: details } = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(getProductList());
    }, [dispatch])

    function getProductID(id) {
        dispatch(getProductDetails(id));
    }

    const values = { value: { loading, error, products, load, err, details, getProductID } };
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