import React from "react";
import { useGlobalContext } from "../_context/globalContext";

function SingleProductDisplay({ match }) {
    const { products } = useGlobalContext();
    const productID = match.params.id;

    const product = products.find((item) => item.id === productID);
    
    return (
        <div>
            <h4>{product && product.name}</h4>
        </div>
    )
}

export default SingleProductDisplay;
