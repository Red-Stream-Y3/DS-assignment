import React from 'react';
import Rating from './Rating';

const Review = ({ userImage, userName, rating, description }) => {
  return (
    <div className="pt-10">
      <div className="flex items-start mb-8">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={userImage}
          alt={userImage}
        />
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium text-white mr-2">{userName}</h3>
            <Rating value={rating} text={rating} />
          </div>
          <p className="text-white text-sm mb-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
