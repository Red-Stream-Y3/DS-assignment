import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

export default function ShopOrders() {
  const [orders, setOrders] = useState([]);

  //fetching user info from redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userId = userInfo._id;

  //get orders by user id
  const getOrdersbySeller = async () => {
    try {
      const response = await axios(
        `http://localhost:9124/api/orders/seller/products/${userId}`
      );
      const order = response.data;
      setOrders(order);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShippedOrder = async (e, orderId) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:9124/api/orders/${orderId}/shipped`,
        { sellerId: userId }
      );
      const order = response.data;
      setOrders(order);
      alert('Order Shipped');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // const handlerejectOrderbySeller = async (e, orderId) => {
  //   e.preventDefault();
  //   try{
  //     const response = await axios.put(`http://localhost:9124/api/orders/${orderId}/rejectbySeller`, { sellerId: userId });
  //     const order =  response.data;
  //     setOrders(order);
  //     alert("Order Rejected");
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getOrders = async () => {
  //   try{
  //     const response = await fetch(`http://localhost:9124/api/orders`);
  //     const order = await response.json();
  //     setOrders(order);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    //getOrders();
    getOrdersbySeller();
  }, []);

  return (
    <div className="p-1 shadow-md text-white">
      <div
        className="overflow-x-auto"
        style={{ maxHeight: 'auto', minHeight: 'auto' }}
      >
        <h1 className="text-gray-200 text-center text-2xl font-bold py-4">
          Shop Orders
        </h1>

        <div>
          <table className="w-full border-collapse text-center text-grey-400">
            <thead className="text-sm uppercase bg-gray-700 text-gray-400">
              <tr>
                <th className="px-6 py-3 w-auto">Order Date</th>
                <th className="px-6 py-3 w-auto">Order ID</th>
                <th className="px-6 py-3 w-auto">Products</th>
                <th className="px-6 py-3 w-auto">Quantity</th>
                <th className="px-6 py-3 w-auto">Order Status</th>
                <th className="px-6 py-3 w-auto">Confirmation</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="transition-all bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {order.orderItems.map((product) => (
                      <ol key={product._id} className="">
                        <li>{product.name}</li>
                      </ol>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {order.orderItems.map((product) => (
                      <ol key={product._id}>
                        <li>{product.quantity}</li>
                      </ol>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.isShipped ? (
                      <div className="text-primarylight">Shipped</div>
                    ) : null}
                  </td>

                  <td className="px-6 py-4 flex">
                    {!order.isShipped ? (
                      <>
                        <button
                          onClick={(e) => handleShippedOrder(e, order._id)}
                          className="flex transition-all justify-center w-24 mr-2 px-1 rounded-md bg-slate-600 ring-offset-1 ring-1 hover:bg-slate-500 active:scale-95"
                        >
                          <AiOutlineCheck className="m-1" />
                          <div className="mr-1">Shipped</div>
                        </button>
                      </>
                    ) : (
                      <div className="italic text-slate-500">
                        {order.isShipped &&
                          `Shipped on ${new Date(
                            order.shippedAt
                          ).toLocaleDateString()}`}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
