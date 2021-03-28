import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loader, Message } from "../reuseable";
import { getTopProducts } from "../../manager";

import "../../manager/styling/carousel.css";

function ProductCarousel() {
    const dispatch = useDispatch();

    const carousel = useSelector(state => state.carousel);
    const { loading, error, topList } = carousel;

    useEffect(() => {
        dispatch(getTopProducts());
    }, [dispatch]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Message variant="danger">{error}</Message>
    }

    return (
        <Carousel pause="hover">
            {topList.map((product) => {
                const { _id, name, image, price } = product;

                return (
                    <Carousel.Item key={_id}>
                        <Link to={`/product/${_id}`}>
                            <Image src={image} alt={name} fluid />
                            <Carousel.Caption className="carousel-caption">
                                <h2>{name} ({price})</h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}

export default ProductCarousel
