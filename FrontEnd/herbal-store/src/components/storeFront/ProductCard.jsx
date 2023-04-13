import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../actions/cartActions';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, 1));
    toast.success(`${product.name} added to cart!`, {
      hideProgressBar: false,
      closeOnClick: true,
      autoClose: 1500,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
          onClick={addToCartHandler}
          className="bg-secondary hover:bg-primarylight text-white hover:text-darkbg font-bold py-2 px-4 rounded mt-2 w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
