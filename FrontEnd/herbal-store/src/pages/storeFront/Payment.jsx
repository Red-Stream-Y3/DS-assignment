import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../components';
import { createOrder } from '../../actions/orderActions';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import { USER_DETAILS_RESET } from '../../constants/userConstants';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  cart.paymentMethod = 'PayPal';

  if (!cart.shippingDetails.address) {
    navigate('/checkout');
  } else if (!cart.paymentMethod) {
    navigate('/payment');
  }

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  cart.shippingPrice = '100';
  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [navigate, success, order, dispatch]);

  const orderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingDetails: cart.shippingDetails,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Navbar />

      <section>
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
          <div className="my-10">
            <div className="mx-auto max-w-2xl lg:px-2">
              <h1 className="text-xl font-bold text-white">
                Shipping Information
              </h1>
              <p className="block text-md font-medium text-white mt-5 p-5 border-2 border-solid border-primarylight bg-darkbg rounded-xl">
                <div className="pb-2">
                  Name: {cart.shippingDetails.firstName},{' '}
                  {cart.shippingDetails.lastName}{' '}
                </div>
                <div className="pb-2">
                  Address: {cart.shippingDetails.address},{' '}
                  {cart.shippingDetails.city} {cart.shippingDetails.postalCode},{' '}
                  {cart.shippingDetails.country}{' '}
                </div>
                <div className="pb-2">Phone: {cart.shippingDetails.phone}</div>
              </p>
            </div>
            <div className="mx-auto max-w-2xl lg:px-2 my-10">
              <h1 className="text-xl font-bold text-white">Order Summary</h1>
              <p className="block text-md font-medium text-white mt-5 p-5 border-2 border-solid border-primarylight bg-darkbg rounded-xl">
                <div className="flex justify-between py-4">
                  <span className="text-md font-medium text-white">
                    Subtotal (
                    {cart.cartItems.reduce(
                      (acc, item) => acc + item.quantity,
                      0
                    )}
                    ) items
                  </span>
                  <span className="text-md font-medium text-white">
                    $
                    {cart.cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-md font-medium text-white">
                    Commission (10 % order)
                  </span>
                  <span className="text-md font-medium text-white">
                    $
                    {cart.cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price * 0.1,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-md font-medium text-white">
                    Shipping
                  </span>
                  <span className="text-md text-white">
                    ${cart.shippingPrice}
                  </span>
                </div>
                <div className="flex justify-between py-4 border-t-2 border-solid border-primarylight">
                  <span className="text-lg font-medium text-white">Total</span>
                  <span className="text-lg font-medium text-white">
                    ${' '}
                    {
                      (cart.totalPrice = (
                        Number(cart.itemsPrice) + Number(cart.shippingPrice)
                      ).toFixed(2))
                    }
                  </span>
                </div>
              </p>
            </div>
            <div className="flex justify-between mx-auto max-w-2xl lg:px-2 my-10">
              <Link to="/checkout">
                <button
                  type="button"
                  className="w-20 mt-5 bg-secondary hover:bg-primarylight text-white hover:text-darkbg rounded-lg py-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={cart.length === 0}
                >
                  <i class="fa-sharp fa-solid fa-chevron-left"></i> Back
                </button>
              </Link>
              <button
                type="button"
                className="mt-5 bg-secondary hover:bg-primarylight text-white hover:text-darkbg rounded-lg py-2 px-4 w-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={cart.length === 0}
                onClick={orderHandler}
              >
                Place Order{' '}
                <i class="fa-solid fa-right-from-bracket fa-fade px-4"></i>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center py-10 pr-10">
            <div className="">
              {cart.length === 0 ? (
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
                  className="p-5 scrollbar scrollbar-thumb-primarylight scrollbar-track-lightbg overflow-y-auto border-2 border-solid border-primarylight bg-darkbg rounded-xl"
                  style={{ height: '80vh' }}
                >
                  <div className="w-3/5">
                    <h1 className="text-xl font-bold text-white pb-5">
                      Order Items
                    </h1>
                  </div>

                  {cart.cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="py-4 flex items-center border-y-2 border-solid border-primarylight"
                    >
                      <div className="w-1/5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-50 h-25 rounded-xl object-cover"
                        />
                      </div>
                      <div className="w-3/5 px-5">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-lg font-medium text-white hover:text-primarylight"
                        >
                          {item.name}
                        </Link>
                        <div className="py-2 text-s font-medium text-white">
                          Sold by:{' '}
                          <Link
                            to={`/product/${item.product}`}
                            className="text-lg font-medium text-white hover:text-primarylight"
                          >
                            {item.vendor}
                          </Link>
                        </div>
                      </div>

                      <div className="w-2/5 pb-10 text-right pr-5">
                        <span className="text-xl text-white">
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
