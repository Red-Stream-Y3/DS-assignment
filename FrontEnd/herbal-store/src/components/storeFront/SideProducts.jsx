import React from 'react';
import Rating from './Rating';

const SideProducts = ({ productImage, name, rating, price }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <img
            src={productImage}
            alt={productImage}
            className="w-20 h-20 mt-2 rounded-xl cursor-pointer border-2 border-transparent hover:border-primary "
          />
          <div className="flex flex-col ml-4">
            <h1 className="text-md font-semibold text-white">{name}</h1>
            <h1 className="text-lg font-semibold text-white pb-2">
              ${price.toFixed(2)}
            </h1>

            <div className="flex flex-row">
              <Rating value={rating} />
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-300 my-4" />
      </div>
    </>
  );
};

export default SideProducts;
