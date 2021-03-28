import React from "react";
import PropTypes from "prop-types";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

function RatingStar({ rating, reviews, color }) {

    const props = { style: { color }, className: "star" }

    return (
        <div className="rating">
            <span {...props}>
                {rating >= 1 ? <BsStarFill /> : rating >= 0.5 ? <BsStarHalf /> : <BsStar />}
            </span>
            <span {...props}>
                {rating >= 2 ? <BsStarFill /> : rating >= 1.5 ? <BsStarHalf /> : <BsStar />}
            </span>
            <span {...props}>
                {rating >= 3 ? <BsStarFill /> : rating >= 2.5 ? <BsStarHalf /> : <BsStar />}
            </span>
            <span {...props}>
                {rating >= 4 ? <BsStarFill /> : rating >= 3.5 ? <BsStarHalf /> : <BsStar />}
            </span>
            <span {...props}>
                {rating >= 5 ? <BsStarFill /> : rating >= 4.5 ? <BsStarHalf /> : <BsStar />}
            </span>
            {reviews && (
                <small>
                    {" "} | {" "} <strong> {reviews} review{reviews > 1 && "s"} </strong>
                </small>
            )}
        </div>
    )
}

RatingStar.defaultProps = {
    rating: 1,
    color: "yellow"
}

RatingStar.propTypes = {
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number,
    color: PropTypes.string.isRequired,
}

export default RatingStar;
