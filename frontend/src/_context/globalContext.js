import { createContext, useContext } from "react";
import products from "./products";

const AppContext = createContext();

const AppProvider = ({ children }) => {

    return (
        <AppContext.Provider value={{products}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppProvider, useGlobalContext };