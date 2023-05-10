import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navbar, RateProduct } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { createProductReview } from '../../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants';
import { toast } from 'react-toastify';

const Review = () => {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const orderId = useParams().id;

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;


  useEffect(() => {
    axios
      .get(`http://localhost:9124/api/orders/${orderId}`)
      .then((res) => {
        setOrder(res.data);
        setProducts(res.data.orderItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createdAt = new Date(order.createdAt).toLocaleDateString();

  return (
    <div>
      <Navbar />
      <div className=" w-3/4 mx-auto bg-gray-900 rounded-xl shadow-md overflow-hidden text-white m-10">
        <div className="bg-secondary flex items-center h-20">
          <h2 className="text-xl font-semibold px-5 text-white">
            Order Details
          </h2>
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
            <p className="text-lg font-semibold text-white">
              {order.isDelivered ? 'Delivered' : 'Not Delivered'}
            </p>
          </div>
        </div>
      </div>

      <div className="orderDetails text-white">
        <div className="bg-darkbg rounded-lg shadow-lg p-6 w-1/2 mx-auto my-5 ">
          <h2 className="text-lg font-semibold mb-4">Order Items : </h2>
          {products.map((product) => (
            <RateProduct product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
