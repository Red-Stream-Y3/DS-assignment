import React from 'react';
import Rating from './Rating';

const SideProducts = ({ productImage, name, rating, price }) => {
  return (
    <>
      <div className="bg-gray-300 h-1 relative my-5">
        <hr className="absolute top-0 h-full border-none bg-green-300 w-1/3" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <img
            src={productImage}
            alt={productImage}
            className="w-20 h-20 mt-2 rounded-xl cursor-pointer border-2 border-transparent hover:border-primary "
          />
          <div className="flex flex-col ml-4">
            <h1 className="text-md font-bold text-white">{name}</h1>
            <h1 className="text-lg font-bold text-white">
              ${price.toFixed(2)}
            </h1>

            <div className="flex flex-row">
              <Rating value={rating} />
            </div>
          </div>
        </div>
        <hr class="border-t border-gray-300 my-4" />
      </div>
    </>
  );
};

export default SideProducts;
