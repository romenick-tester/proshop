const formatPrice = (price) => {
    const newPriceFormat = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "gbp"
    }).format(price / 100);

    return newPriceFormat;
};

export default formatPrice;