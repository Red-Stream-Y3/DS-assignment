import React from 'react';
import Rating from './Rating';

const Review = ({ userImage, name, rating, comment }) => {
  return (
    <div className="pt-5">
      <div className="flex items-start">
        {/* <img
          className="w-12 h-12 rounded-full mr-4"
          src={userImage}
          alt={userImage}
        /> */}
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium text-white mr-2">{name}</h3>
            <div className="pl-5">
              <Rating value={rating} />
            </div>
          </div>
          <p className="text-white text-sm mb-2">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
