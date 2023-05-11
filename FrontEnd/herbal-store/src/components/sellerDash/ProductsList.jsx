/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { deleteProduct } from "../../actions/productActions";
import axios from "axios";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  //fetching user info from redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userId = userInfo._id;

  //get products by user id
  const getProductbySellerId = async () => {
    try {
      const response = await fetch(
        `http://localhost:9121/api/products/user/${userId}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect to fetch products by user id
  useEffect(() => {
    if (userInfo && userInfo._id) {
      getProductbySellerId();
    }
  }, []);

  const refreshFunction = async () => {
    setLoading(true);
    let res = await axios.get(
      `http://localhost:9121/api/products/user/${userId}`
    );
    console.log(res.data);
    setOrders(res.data);
    setLoading(false);
  };

  //delete product function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `http://localhost:9121/api/products/${id}`
        );
        alert("Product deleted successfully");
        refreshFunction();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-1 shadow-md text-white">
      <h1 className="text-gray-200 text-center text-2xl font-bold py-4">
        Manage My Products
      </h1>

      <table className="w-full border-collapse text-left text-grey-400">
        <thead className="text-sm uppercase bg-gray-700 text-gray-400">
          <tr>
            <th className="px-6 py-3 w-2/12">Product Name</th>
            <th className="px-6 py-3 w-2/12">Rating</th>
            <th className="px-6 py-3 w-2/12">Price</th>
            <th className="px-6 py-3 w-2/12">Availbe Units</th>
            <th className="px-6 py-3 w-4/12">Manage</th>
          </tr>
        </thead>
        <tbody>
          {products.map((data) => (
            <tr
              key={data._id}
              className="transition-all bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700"
            >
              <td className="px-6 py-4">{data.name}</td>
              <td className="px-6 py-4">{data.rating}</td>
              <td className="px-6 py-4">{data.price}</td>
              <td className="px-6 py-4">{data.countInStock}</td>

              <td>
                <Link to={`/editproduct/${data._id}`}>
                  <button type="button" className="px-6">
                    <AiOutlineEdit />
                  </button>
                </Link>

                <button
                  type="button"
                  className="mr-3"
                  onClick={() => handleDelete(data._id)}
                >
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
