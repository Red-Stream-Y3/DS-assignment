import React, { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import NavBar from '../../components/common/Navbar';
import { toast } from 'react-toastify';

const Cart = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const quantity = new URLSearchParams(location.search).get('quantity');

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const commissionRate = useSelector((state) => state.commissionRate);
  const { commission } = commissionRate;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [dispatch, id, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.error(`Product removed from cart!`, {
      hideProgressBar: false,
      closeOnClick: true,
      autoClose: 1500,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('userInfo');
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  const checkoutHandler = () => {
    if (isAuthenticated()) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row md:items-center p-10">
        <div className="md:w-8/12">
          <h1 className="text-2xl font-bold text-white">Your cart</h1>
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
            <ul className="p-5 overflow-y-auto" style={{ height: '100vh' }}>
              <li className="py-4 flex items-center border-b-2 border-solid border-primarylight ">
                <div className="w-3/5">
                  <span className="text-lg font-bold text-white">Products</span>
                </div>
                <div className="w-1/5">
                  <span className="text-lg font-bold text-white">Quantity</span>
                </div>
                <div className="w-1/5">
                  <span className="text-lg font-bold text-white">Price</span>
                </div>
                <div className="w-1/5">
                  <span className="text-lg font-bold text-white">Remove</span>
                </div>
              </li>
              {cartItems.map((item) => (
                <li
                  key={item.product}
                  className="py-4 flex items-center border-b-2 border-solid border-primarylight "
                >
                  <div className="w-1/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-50 h-25 rounded-xl object-cover"
                    />
                  </div>
                  <div className="w-2/5 px-5">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-lg font-medium text-white hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <div className="py-2 text-s font-medium text-white">
                      Sold by:{' '}
                      <Link
                        to={`/product/${item.product}`}
                        className="text-lg font-medium text-white hover:text-primary"
                      >
                        {item.vendor}
                      </Link>
                    </div>
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
                  <div className="w-1/5 pb-8">
                    <span className="text-xl text-white">${item.price}</span>
                  </div>
                  <div className="w-1/5 pb-8 px-10">
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
          <div className="text-2xl font-bold text-white pt-10 mb-5">
            Order Summary
          </div>
          <div className="bg-darkbg p-5 rounded-xl">
            <div className="flex justify-between py-4">
              <span className="text-lg font-medium text-white">
                Subtotal (
                {cartItems.reduce(
                  (acc, item) => acc + Number(item.quantity),
                  0
                )}
                ) items
              </span>
              <span className="text-lg font-medium text-white">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-lg font-medium text-white">
                Commission ({Number(commission[0].commission)}% order)
              </span>
              <span className="text-lg font-medium text-white">
                {' '}
                $
                {cartItems
                  .reduce(
                    (acc, item) =>
                      acc +
                      (item.quantity *
                        item.price *
                        Number(commission[0].commission)) /
                        100,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-lg font-medium text-white">Shipping</span>
              <span className="text-md text-white">
                Calculated at the next step
              </span>
            </div>
            <div className="flex justify-between py-4 border-t-2 border-solid border-primarylight">
              <span className="text-lg font-medium text-white">Total</span>
              <span className="text-lg font-medium text-white">
                $
                {(
                  parseFloat(
                    cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)
                  ) +
                  parseFloat(
                    cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price * 0.1,
                        0
                      )
                      .toFixed(2)
                  )
                ).toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              className="mt-5 bg-secondary hover:bg-primarylight text-white hover:text-darkbg rounded-lg py-2 px-4 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
              <i className="fa-solid fa-right-from-bracket fa-beat px-4"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
