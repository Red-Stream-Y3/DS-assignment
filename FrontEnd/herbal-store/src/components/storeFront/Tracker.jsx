import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Tracker() {
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  const userId = userInfo._id;
  // console.log('userId form tracker: ', userId);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      axios
        .get(`http://localhost:9124/api/orders/user/${userId}`)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchOrders();
  }, [setOrders, userId]);

  return (
    // table with order id, date, price, status, review
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Order Tracker</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-darkbg">
              <th className="px-4 py-2 text-center">Order ID</th>
              <th className="px-4 py-2 text-center">Date</th>
              <th className="px-4 py-2 text-center">Price</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Review</th>
            </tr>
          </thead>
          <tbody className=" bg-lightbg">
            {orders.map((order) => (
              <tr
                className="border-b border-gray-200 text-center"
                key={order._id}
              >
                <td className="px-4 py-2">
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">$ {order.amount}</td>
                <td className="px-4 py-2">
                  {order.isDelivered ? 'Delivered ' : ''}
                  {order.isConfirmed ? 'Confirmed ' : ''}
                  {order.isRejected ? 'Rejected ' : ''}
                  {order.isPaid ? 'Paid' : ''}
                </td>
                <td className="px-4 py-2">
                  {/* activate button if delivered */}
                {order.isDelivered ? (
                  <Link to={`/review/${order._id}`}>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Review
                    </button>
                  </Link>
                ) : (
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" disabled>
                    Can't be reviewed yet
                  </button>
                )}
                  {/* {!order.isPaid || !order.isDelivered ? (
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      disabled
                    >
                      {!order.isPaid
                        ? 'Not paid'
                        : !order.isDelivered
                        ? 'Not delivered'
                        : 'Review'}
                    </button>
                  ) : (
                    <Link to={`/review/${order._id}`}>
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Review
                      </button>
                    </Link>
                  )} */}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tracker;
