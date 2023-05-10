import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { createProductReview } from '../../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants';
import { toast } from 'react-toastify';

const RateProduct = ({product}) => {
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('');
    const [pid, setPid] = useState('');

    const dispatch = useDispatch();
  
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { success: successProductReview } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
          toast.success('Review Submitted', {
            hideProgressBar: false,
            closeOnClick: true,
            autoClose: 1500,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setRating(0);
          setComment('');
          dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
      }, [dispatch, successProductReview]);

      const submitReview = (e) => {
        e.preventDefault();
    
        console.log('submit review', pid, rating, comment);
        dispatch(
          createProductReview(pid, {
            rating,
            comment,
          })
        );
      };
 
  
  return (
    <div>
        <div
              className="max-w-md mx-auto bg-lightbg rounded-xl shadow-md overflow-hidden md:max-w-2xl"
              key={product._id}
              onChange={(e) => setPid(product.product)}
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="p-8">
                  <h2 className="text-lg font-medium text-primarylight mb-2">
                    {product.name}
                  </h2>
                  <p className="text-white">${product.price}</p>
                  <p className="text-white">{product.quantity} items bought</p>
                  <form className="mt-4">
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-primarylight mb-2"
                    >
                      Rating:
                    </label>
                    <select
                      id="rating"
                      name="rating"
                      className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-primarylight"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="1">1 </option>
                      <option value="2">2 </option>
                      <option value="3">3 </option>
                      <option value="4">4 </option>
                      <option value="5">5 </option>
                    </select>
                    <label
                      htmlFor="review"
                      className="block text-sm font-medium text-primarylight mb-2"
                    >
                      Product Review:
                    </label>
                    <textarea
                      id="review"
                      name="review"
                      className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:border-primarylight"
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primarylight text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                      onClick={submitReview}
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            </div>
    </div>
  )
}

export default RateProduct