import React from 'react';

function ProductCard({ name, price, imageUrl, addToCart }) {
  return (
    <div className="max-w-xs rounded-md overflow-hidden shadow-md ">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className=" bg-darkbg text-white p-4">
        <div className="font-semibold text-lg h-16">{name}</div>
        <div className="text-primarylight font-bold text-xl mt-2">${price}</div>
        <button onClick={addToCart} className="bg-secondary hover:bg-primarylight text-white hover:text-darkbg font-bold py-2 px-4 rounded mt-2 w-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
