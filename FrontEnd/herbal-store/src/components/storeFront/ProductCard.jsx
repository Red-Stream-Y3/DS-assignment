import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const addToCart = () => {
    navigate(`/cart/${product._id}?quantity=${1}`);
    toast.success(`${product.name} added to cart!`);
    navigate(-1); // go back to previous page
  };

  return (
    <div className="max-w-xs rounded-md overflow-hidden shadow-md ">
      <Link to={`/product/${product._id}`}>
        <img
          className="w-full h-48 object-cover"
          src={product.images[0].url}
          alt={product.name}
        />
      </Link>
      <div className=" bg-darkbg text-white p-4">
        <Link to={`/product/${product._id}`}>
          <div className="font-semibold text-lg h-16">{product.name}</div>
        </Link>
        <div className="text-primarylight font-bold text-xl mt-2">
          ${product.price}
        </div>
        <button
          onClick={addToCart}
          className="bg-secondary hover:bg-primarylight text-white hover:text-darkbg font-bold py-2 px-4 rounded mt-2 w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
