import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { AiOutlineStar } from "react-icons/ai";

const Rating = ({ stars, className }) => {
    const star = Array.from({ length: 5 }, (e, index) => {
        const number = index + 0.5;
        return (
            <span key={index} className="text-yellow-500 mr-1 text-xl">
                {stars >= index + 1 ? (
                    <FaStar className="icon" />
                ) : stars >= number ? (
                    <FaStarHalfAlt className="icon" />
                ) : (
                    <AiOutlineStar className="icon" />
                )}
            </span>
        );
    });

    return (
        <div className={className}>
            <p className="">Rating <span className="font-normal text-lg">(<span>23</span> member)</span></p>
            <div className="flex">
                {star}
            </div>
        </div>

    );
};

export default Rating;