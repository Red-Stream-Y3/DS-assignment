import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Navbar } from '../../components'
import { useSelector } from 'react-redux'

const Review = () => {
  const [order, setOrder] = useState({})
  const [products, setProducts] = useState([])
  const orderId = useParams().id;
  console.log('orderId: ', orderId);

  const user = useSelector(state => state.userLogin)
  const { userInfo } = user

  const userId = userInfo._id;

  useEffect(() => {
    axios.get(`http://localhost:9124/api/orders/${orderId}`)
      .then((res) => {
        setOrder(res.data)
        setProducts(res.data.orderItems)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const createdAt = new Date(order.createdAt).toLocaleDateString();

  const submitReview = (e) => {
    e.preventDefault();
    const rating = e.target.rating.value;
    const review = e.target.review.value;
    const productId = e.target.product._id;
    console.log('rating: ', rating);
    console.log('review: ', review);
    console.log('productId: ', productId);
    axios.post(`http://localhost:9124/api/reviews/${userId}/${productId}`, {rating, review})
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Navbar />
      <div className=" w-3/4 mx-auto bg-gray-900 rounded-xl shadow-md overflow-hidden text-white m-10">
      <div className="bg-secondary flex items-center h-20">
        <h2 className="text-xl font-semibold px-5 text-white">Order Details</h2>
      </div>
        <div className="p-8">
          <div className="flex justify-between mb-2">
            <p className="text-lg font-semibold text-gray-500">Order ID:</p>
            <p className="text-lg text-white">{orderId}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-lg font-semibold text-gray-500">Date Placed:</p>
            <p className="text-lg text-white">{createdAt}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-lg font-semibold text-gray-500">Total Price:</p>
            <p className="text-lg text-white">$ {order.totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-gray-500">Order Status:</p>
            <p className="text-lg font-semibold text-white">{order.isDelivered ? "Delivered" : "Not Delivered"}</p>
          </div>
        </div>
      </div>

      <div className="orderDetails text-white">
        <div className="bg-darkbg rounded-lg shadow-lg p-6 w-1/2 mx-auto my-5 ">
          <h2 className="text-lg font-semibold mb-4">Order Items : </h2>
          {products.map(product => (
            <div className="max-w-md mx-auto bg-lightbg rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img className="h-48 w-full object-cover md:w-48" src={product.image} alt={product.name} />
              </div>
              <div className="p-8">
                <h2 className="text-lg font-medium text-primarylight mb-2">{product.name}</h2>
                <p className="text-white">${product.price}</p>
                <p className="text-white">{product.quantity} items bought</p>
                <form className="mt-4">
                  <label for="rating" className="block text-sm font-medium text-primarylight mb-2">Rating:</label>
                  <select id="rating" name="rating" className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-primarylight">
                    <option value="1">1 </option>
                    <option value="2">2 </option>
                    <option value="3">3 </option>
                    <option value="4">4 </option>
                    <option value="5">5 </option>
                  </select>
                  <label for="review" className="block text-sm font-medium text-primarylight mb-2">Product Review:</label>
                  <textarea id="review" name="review" className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-primarylight" rows="4"></textarea>
                  <button 
                    type="submit" className="bg-primary hover:bg-primarylight text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                    onClick={submitReview}
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          ))}
        </div>
      </div>
    </div>
    
  )
}

export default Review