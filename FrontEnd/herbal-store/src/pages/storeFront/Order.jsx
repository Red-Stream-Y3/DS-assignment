import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrderDetails } from '../../actions/orderActions';
import { Loader, Message, Navbar } from '../../components';

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
    if (!order) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, navigate, order, userInfo]);

  console.log(order);
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
                    {order.orderItems
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
                    Payment Method
                  </h1>
                  <div className="p-5 scrollbar scrollbar-thumb-primarylight scrollbar-track-lightbg overflow-y-auto border-2 border-solid border-primarylight bg-darkbg rounded-xl"></div>
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
