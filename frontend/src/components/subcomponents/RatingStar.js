import React from "react";
import PropTypes from "prop-types";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

function RatingStar({ values, color }) {
    const { rating, numReviews } = values;

    const props = { style: { color }, className: "star" }
    
    return (
        <div className="rating">
            <span {...props}>
                {rating >= 1 ? <BsStarFill/> : rating >= 0.5 ? <BsStarHalf/> : <BsStar/>}
            </span>
            <span {...props}>
                {rating >= 2 ? <BsStarFill/> : rating >= 1.5 ? <BsStarHalf/> : <BsStar/>}
            </span>
            <span {...props}>
                {rating >= 3 ? <BsStarFill/> : rating >= 2.5 ? <BsStarHalf/> : <BsStar/>}
            </span>
            <span {...props}>
                {rating >= 4 ? <BsStarFill/> : rating >= 3.5 ? <BsStarHalf/> : <BsStar/>}
            </span>
            <span {...props}>
                {rating >= 5 ? <BsStarFill/> : rating >= 4.5 ? <BsStarHalf/> : <BsStar/>}
            </span>
            <small>
                {" "} | {" "} from <strong> {numReviews} reviews </strong> 
            </small>
        </div>
    )
}

RatingStar.defaultProps = {
    values: { rating: 1, numReviews: 1 },
    color: "yellow"
}

RatingStar.propTypes = {
    values: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
}

export default RatingStar;
