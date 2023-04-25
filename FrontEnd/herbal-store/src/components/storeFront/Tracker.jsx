import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function Tracker () {

  const user = useSelector(state => state.userLogin)
  const { userInfo } = user

  const userId = userInfo._id;
  console.log('userId form tracker: ', userId)

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9124/api/orders/user/${userId}`)
        setOrders(data)
        console.log('orders from tracker: ', orders)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrders()
  }, [userId]);

  return (
    // table with order id, date, price, status, review
    <div class="p-6 text-white">
    <h1 class="text-3xl font-bold mb-6">Order Tracker</h1>
    <div class="overflow-x-auto">
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr class="bg-darkbg">
            <th class="px-4 py-2 text-center">Order ID</th>
            <th class="px-4 py-2 text-center">Date</th>
            <th class="px-4 py-2 text-center">Price</th>
            <th class="px-4 py-2 text-center">Status</th>
            <th class="px-4 py-2 text-center">Review</th>
          </tr>
        </thead>
        <tbody class=" bg-lightbg">
          {orders.map(order => (
            <tr class="border-b border-gray-200 text-center">
              <td class="px-4 py-2">{order._id}</td>
              <td class="px-4 py-2">{order.date.substring(0, 10)}</td>
              <td class="px-4 py-2">{order.amount}</td>
              <td class="px-4 py-2">
              {order.isDelivered ? "Delivered" : ""}
              {order.isConfirmed ? "Confirmed" : ""}
              {order.isRejected ? "Rejected" : ""}
              {order.isPaid ? "Paid" : ""}
              </td>
              <td class="px-4 py-2">
                {/* activate button if delivered */}
                {order.isDelivered ? (
                  <Link to={`/review/${order._id}`}>
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Review
                    </button>
                  </Link>
                ) : (
                  <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" disabled>
                    Can't be reviewed yet
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  )
}


export default Tracker