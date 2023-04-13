import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Navbar } from '../../components';
import { createOrder } from '../../actions/orderActions';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import { USER_DETAILS_RESET } from '../../constants/userConstants';
import axios from 'axios';

const OrderConfirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [shipmentData, setShipmentData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const [shippingMethod, setShippingMethod] = useState('');
  const [shippingPrice, setShippingPrice] = useState(0);

  if (!cart.shippingDetails.address) {
    navigate('/checkout');
  } else if (!shippingMethod) {
    navigate('/confirm');
  }

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  // cart.shippingPrice = Number(cart.shippingPrice).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const createShipment = useCallback(async () => {
    const { data: SHIPPO_API_KEY } = await axios.get(
      'http://localhost:9124/api/config/shippo'
    );

    const shippoAddressFrom = {
      name: 'Red Stream',
      street1: '215 Clayton St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94117',
      country: 'US',
      phone: '+1 555 341 9393',
      email: 'admin@redstream.com',
    };

    const shippoAddressTo = {
      name:
        cart.shippingDetails.firstName + ' ' + cart.shippingDetails.lastName,
      company: 'Red Stream',
      street1: cart.shippingDetails.address,
      city: cart.shippingDetails.city,
      state: cart.shippingDetails.state,
      zip: cart.shippingDetails.postalCode,
      country: cart.shippingDetails.country,
      phone: cart.shippingDetails.phone,
      email: 'user@redstream.com',
    };

    const shippoParcel = {
      length: '20',
      width: '10',
      height: '6',
      distance_unit: 'in',
      weight: '2',
      mass_unit: 'lb',
    };

    const shipmentData = {
      address_from: shippoAddressFrom,
      address_to: shippoAddressTo,
      parcels: [shippoParcel],
      provider: 'shippo',
      extra: {
        servicelevel_token: 'shippo_priority',
      },
    };

    try {
      const response = await axios.post(
        'https://api.goshippo.com/shipments/',
        shipmentData,
        {
          headers: {
            Authorization: `ShippoToken ${SHIPPO_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // console.log('shipment : %s', JSON.stringify(response.data));
      setShipmentData(response.data);
    } catch (error) {
      console.error(error);
      // alert(`Error creating shipment: ${error.message}`);
    }
  }, [
    cart.shippingDetails.address,
    cart.shippingDetails.city,
    cart.shippingDetails.country,
    cart.shippingDetails.firstName,
    cart.shippingDetails.lastName,
    cart.shippingDetails.phone,
    cart.shippingDetails.postalCode,
    cart.shippingDetails.state,
  ]);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const handleShippingMethodSelect = (rate) => {
    setShippingMethod(rate.provider);
    setShippingPrice(rate.amount);
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }

    if (!shipmentData) {
      createShipment();
    }
  }, [navigate, success, order, dispatch, shipmentData, createShipment]);

  const orderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingDetails: cart.shippingDetails,
        shippingMethod: shippingMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: Number(shippingPrice),
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

              <div className="mx-auto max-w-2xl">
                <h1 className="text-xl font-bold text-white py-5">
                  Shipping Methods
                </h1>
                <p className="block text-md font-medium text-white border-2 border-solid border-primarylight bg-darkbg">
                  <form className="grid">
                    {!shipmentData ? (
                      <Loader />
                    ) : (
                      shipmentData?.rates
                        ?.sort((a, b) => a.amount - b.amount)
                        ?.map((rate) => (
                          <div className="relative" key={rate.object_id}>
                            <input
                              className="peer hidden"
                              type="radio"
                              name="radio"
                              id={`radio_${rate.object_id}`}
                              onChange={() => {
                                handleOptionSelect(rate.object_id);
                                handleShippingMethodSelect(rate);
                              }}
                              checked={selectedOption === rate.object_id}
                            />
                            <label
                              className={`peer-checked:border-2 peer-checked:border-green-500 flex cursor-pointer select-none border border-gray-300 p-4 ${
                                selectedOption === rate.object_id
                                  ? 'bg-lightbg text-green-500'
                                  : 'text-white'
                              }`}
                              htmlFor={`radio_${rate.object_id}`}
                            >
                              <img
                                className="w-14 object-contain"
                                src={rate.provider_image_200}
                                alt=""
                              />
                              <div className="ml-5">
                                <span className="mt-2 font-bold">
                                  {rate.provider} - {rate.servicelevel.name}
                                </span>
                                <p className=" text-sm font-bold leading-6">
                                  {rate.duration_terms ||
                                    'Delivery in 2 to 3 business days.'}
                                </p>
                                <p className="text-sm font-bold leading-6">
                                  $ {rate.amount}
                                </p>
                              </div>
                            </label>
                          </div>
                        ))
                    )}
                  </form>
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-2xl lg:px-2 my-10">
              <h1 className="text-xl font-bold text-white">Order Summary</h1>
              <p className="block text-md font-medium text-white mt-5 p-5 border-2 border-solid border-primarylight bg-darkbg rounded-xl">
                <div className="flex justify-between py-4">
                  <span className="text-md font-medium text-white">
                    Subtotal (
                    {cart.cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
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
                  {shippingPrice === 0 ? (
                    <span className="text-md font-medium text-white">
                      Select shipping method{' '}
                    </span>
                  ) : (
                    <span className="text-md font-medium text-white">
                      ${shippingPrice}
                    </span>
                  )}
                </div>
                <div className="flex justify-between py-4 border-t-2 border-solid border-primarylight">
                  <span className="text-lg font-medium text-white">Total</span>
                  <span className="text-lg font-medium text-white">
                    ${' '}
                    {
                      (cart.totalPrice = (
                        Number(cart.itemsPrice) + Number(shippingPrice)
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
                disabled={cart.length === 0 && !selectedOption}
                onClick={orderHandler}
              >
                Place Order{' '}
                <i class="fa-solid fa-right-from-bracket fa-fade px-4"></i>
              </button>
            </div>
          </div>

          <div className="md:flex-row md:items-center py-10 pr-10 mt-12">
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
                <ul className="p-5 scrollbar scrollbar-thumb-primarylight scrollbar-track-lightbg overflow-y-auto border-2 border-solid border-primarylight bg-darkbg rounded-xl">
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

export default OrderConfirm;
