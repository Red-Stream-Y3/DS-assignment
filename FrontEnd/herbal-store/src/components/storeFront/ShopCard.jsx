import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ShopCard = ({shop}) => {
  
  
  return (
    <div>
      <div className="max-w-xs rounded-md overflow-hidden shadow-md ">
        <Link to={`/shops/${shop._id}`}>
            <img
            className="w-full h-48 object-cover"
            src={shop.shopDetails.shopImage}
            alt={shop.shopDetails.shopName}
            />
        </Link>
        <div className=" bg-darkbg text-white p-4">
            <Link to={`/shops/${shop._id}`}>
                <div className="font-semibold text-lg h-24">{shop.shopDetails.shopName}</div>
            </Link>
            <Link to={`/shops/${shop._id}`}>
                <button
                className="bg-secondary hover:bg-primarylight text-white hover:text-darkbg font-bold py-2 px-4 rounded mt-2 w-full"
                >
                Go to Shop
                </button>
            </Link>
        </div>
      </div>  
    </div>
  )
}

export default ShopCard