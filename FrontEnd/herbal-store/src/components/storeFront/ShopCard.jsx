import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ShopCard = ({shop}) => {
  
  const dispatch = useDispatch();
  
  return (
    <div>
      <div className="max-w-xs rounded-md overflow-hidden shadow-md ">
        <Link to={`/shops/${shop._id}`}>
            <img
            className="w-full h-48 object-cover"
            src={shop.images[0].url}
            alt={shop.name}
            />
        </Link>
        <div className=" bg-darkbg text-white p-4">
            <Link to={`/shops/${shop._id}`}>
                <div className="font-semibold text-lg h-16">{shop.name}</div>
            </Link>
            <div className="text-primarylight font-bold text-xl mt-2">
            ${product.price}
            </div>
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