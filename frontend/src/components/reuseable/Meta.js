import React from 'react';
import { Helmet } from "react-helmet";

function Meta({ title, description, keyword }) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keyword} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: "Welcome to ProShop",
    keyword: "electronics, gadgets, technologies",
    description: "We sell good quality cheap electronic cool gadgets!"
}

export default Meta;
