import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  getOrderDetails,
  payOrder,
  sendSms,
  sendEmail,
} from '../../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_SMS_RESET,
  ORDER_EMAIL_RESET,
} from '../../constants/orderConstants';
import { CART_CLEAR_ITEMS } from '../../constants/cartConstants';
import { Loader, Message, Navbar } from '../../components';

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const commissionRate = useSelector((state) => state.commissionRate);
  // const { commission } = commissionRate;

  const [paypalSdk, setPaypalSdk] = useState(false);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('push');
    }

    const addPayPalScript = async () => {
      const { data: CLIENT_ID } = await axios.get(
        'http://localhost:9124/api/config/paypal'
      );

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`;
      script.async = true;
      script.onload = () => {
        setPaypalSdk(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: CART_CLEAR_ITEMS });
      dispatch({ type: ORDER_SMS_RESET });
      dispatch({ type: ORDER_EMAIL_RESET });
      // dispatch({ type: COMMISSION_DETAILS_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setPaypalSdk(true);
      }
    }
  }, [dispatch, id, successPay, order, userInfo, navigate]);

  // format date function for payment date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`;
  };

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
    dispatch(sendSms(order.shippingDetails.phone, order.totalPrice));
    dispatch(sendEmail(id));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
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
                  Name: {order.shippingDetails.firstName},{' '}
                  {order.shippingDetails.lastName}{' '}
                </div>
                <div className="pb-2">
                  Address: {order.shippingDetails.address},{' '}
                  {order.shippingDetails.city}{' '}
                  {order.shippingDetails.postalCode},{' '}
                  {order.shippingDetails.country}{' '}
                </div>
                <div className="pb-2">Phone: {order.shippingDetails.phone}</div>
              </p>
            </div>
            <div className="mx-auto max-w-2xl lg:px-2 my-10">
              <h1 className="text-xl font-bold text-white">Order Summary</h1>
              <p className="block text-md font-medium text-white mt-5 p-5 border-2 border-solid border-primarylight bg-darkbg rounded-xl">
                <div className="flex justify-between py-4">
                  <span className="text-md font-medium text-white">
                    Subtotal (
                    {order.orderItems.reduce(
                      (acc, item) => acc + item.quantity,
                      0
                    )}
                    ) items
                  </span>
                  <span className="text-md font-medium text-white">
                    $
                    {order.orderItems
                      .reduce(
                        (acc, item) => acc + Number(item.quantity) * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-md font-medium text-white">
                    Commission ({order.commission}% order)
                  </span>
                  <span className="text-lg font-medium text-white">
                    {' '}
                    $
                    {order.orderItems
                      .reduce(
                        (acc, item) =>
                          acc +
                          (item.quantity * item.price * order.commission) / 100,
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
                    ${order.shippingPrice}
                  </span>
                </div>
                <div className="flex justify-between py-4 border-t-2 border-solid border-primarylight">
                  <span className="text-lg font-medium text-white">Total</span>
                  <span className="text-lg font-medium text-white">
                    $ {order.totalPrice}
                  </span>
                </div>
              </p>
            </div>
            <div className="flex justify-between mx-auto max-w-2xl lg:px-2 my-10">
              <ul className="p-5 scrollbar scrollbar-thumb-primarylight scrollbar-track-lightbg overflow-y-auto border-2 border-solid border-primarylight bg-darkbg rounded-xl">
                <div className="w-3/5">
                  <h1 className="text-xl font-bold text-white pb-5">
                    Order Items
                  </h1>
                </div>

                {order.orderItems.map((item, index) => (
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
                        {/* Sold by:{' '}
                        <Link
                          to={`/product/${item.product}`}
                          className="text-lg font-medium text-white hover:text-primarylight"
                        >
                          {item.vendor}
                        </Link> */}
                      </div>
                    </div>

                    <div className="w-2/5 pb-10 text-right">
                      <span className="text-xl text-white">
                        {item.quantity} x ${item.price} = $
                        {item.quantity * item.price}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:items-center py-10 pr-10">
            <div className="">
              {order.length === 0 ? (
                <div className="bg-gray-100 p-4 mb-4 rounded-md">
                  Your order is empty {'  '}
                  <Link to="/" className="text-red-500 pr-10">
                    <button className="bg-secondary text-white rounded-lg py-1 px-4 disabled:bg-gray-400 disabled:cursor-not-allowed">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <h1 className="text-xl font-bold text-white pb-5">
                    Order Status
                  </h1>
                  <div className="p-5 scrollbar scrollbar-thumb-primarylight scrollbar-track-lightbg overflow-y-auto border-2 border-solid border-primarylight bg-darkbg rounded-xl">
                    <div className="flex justify-between py-4">
                      {order.isDelivered ? (
                        <div
                          variant="danger"
                          className="border-2 border-solid border-green-500 w-full p-2 rounded-md flex justify-between "
                        >
                          <div className="text-md font-medium text-white">
                            Delivered on :
                          </div>
                          <div className="text-md font-medium text-green-500 pr-5">
                            Delivered
                          </div>
                        </div>
                      ) : (
                        <div
                          variant="danger"
                          className="border-2 border-solid border-red-500 w-full p-2 rounded-md flex justify-between"
                        >
                          <div className="text-md font-medium text-white">
                            Delivery :
                          </div>
                          <div className="text-md font-medium text-red-400 pr-5">
                            Pending
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between py-4">
                      {order.isPaid ? (
                        <div className="border-2 border-solid border-green-500 w-full p-2 rounded-md flex justify-between">
                          <div className="text-md font-medium text-white">
                            Paid on :
                          </div>
                          <div className="text-md font-medium text-green-500  pr-5">
                            {formatDate(order.paidAt)}
                          </div>
                        </div>
                      ) : (
                        <div className="border-2 border-solid border-red-500 w-full p-2 rounded-md flex justify-between">
                          <div className="text-md font-medium text-white">
                            Payment :
                          </div>
                          <div className="text-md font-medium text-red-400 pr-5">
                            Not Paid
                          </div>
                        </div>
                      )}
                    </div>

                    {!order.isPaid && (
                      <div className="px-20 mt-10">
                        {loadingPay && <Loader />}
                        {!paypalSdk ? (
                          <Loader />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </div>
                    )}

                    {order.isPaid && (
                      <div className="px-20">
                        <div className="p-6 md:mx-auto">
                          <svg
                            viewBox="0 0 24 24"
                            className="text-green-500 w-16 h-16 mx-auto my-6"
                          >
                            <path
                              fill="currentColor"
                              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                            ></path>
                          </svg>
                          <div className="text-center">
                            <h3 className="md:text-2xl text-base text-white font-semibold text-center">
                              Payment Done!
                            </h3>
                            <p className="text-white my-2">
                              Thank you for completing your secure online
                              payment.
                            </p>
                            <p className="text-white"> Have a great day! </p>
                            <div className="py-10 text-center">
                              <Link
                                to="/home"
                                className="px-12 bg-secondary hover:bg-green-500 text-white hover:text-darkbg font-semibold py-3 rounded-2xl"
                              >
                                Continue Shopping
                                <i className="fas fa-arrow-right ml-3"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;
