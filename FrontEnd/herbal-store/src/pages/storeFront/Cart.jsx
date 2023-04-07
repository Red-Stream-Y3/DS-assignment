import React, { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import NavBar from '../../components/common/Navbar';

const Cart = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const quantity = new URLSearchParams(location.search).get('quantity');
  console.log(quantity);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [dispatch, id, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login');
  };
  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row md:items-center p-10">
        <div className="md:w-8/12">
          <h1 className="text-2xl font-bold mb-4 text-white">Your cart</h1>
          {cartItems.length === 0 ? (
            <div className="bg-gray-100 p-4 mb-4 rounded-md">
              Your cart is empty {'  '}
              <Link to="/" className="text-red-500 pr-10">
                <button className="bg-secondary text-white rounded-lg py-1 px-4 disabled:bg-gray-400 disabled:cursor-not-allowed">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <ul
              className="divide-y-2 divide-gray-200  border-2 border-solid border-primarylight rounded-xl p-10"
              style={{ height: '100vh' }}
            >
              {cartItems.map((item) => (
                <li key={item.product} className="py-4 flex items-center">
                  <div className="w-1/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-50 h-25 rounded-xl object-cover"
                    />
                  </div>
                  <div className="w-2/5 px-5 pb-12">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-lg font-medium text-white hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="w-1/5 pb-10">
                    <span className="text-lg text-white">${item.price}</span>
                  </div>
                  <div className="w-1/5 pb-10">
                    <select
                      className="block w-35 py-3 px-4 pr-10 text-base border-gray-300 focus:outline-none focus:ring-primarylight focus:border-primary sm:text-sm rounded-md mt-5"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/5 pb-5">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash text-red-500"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="md:w-4/12 ml-10" style={{ height: '100vh' }}>
          <div className="text-2xl font-bold text-white pb-5">
            Order Summary
          </div>
          <div className="flex bg-white rounded-lg shadow-lg p-4 mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h2>
            </div>
            <div>
              <span
                className="text-xl font-semibold text-black"
                style={{ paddingLeft: '150px' }}
              >
                $
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="bg-secondary hover:bg-primarylight text-white  hover:text-darkbg  rounded-lg py-2 px-4 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
