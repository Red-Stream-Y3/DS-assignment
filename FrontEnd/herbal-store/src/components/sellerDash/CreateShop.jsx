import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";

export default function CreateShop() {

    const [myShop, setMyShop ] = useState([]);
    const [ShopName, setShopName] = useState("");
    const [ShopEmail, setShopEmail] = useState("");
    const [ShopAddress, setShopAddress] = useState("");
    const [ShopPhone, setShopPhone] = useState("");
    const [ShopDescription, setShopDescription] = useState("");
    const [shopId, setShopId] = useState(null); // This is used to store shopId prop value if provided

    //fetching user info from redux store
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userId = userInfo._id;

     //get seller's shop by seller id
  // const getShopbySellerId = async () => {
  //   try{
  //     const response = await fetch(`http://localhost:9120/api/shops/user/${userId}`)
  //     .then((response) => response.json())
  //     .then(data => {
  //       setMyShop(data);
  //       console.log(data);
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`http://localhost:9120/api/shops/user/${userId}`)
        .then((res) => {
          setMyShop(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, [setMyShop, userId]);

  // useEffect(() => {
  //   if (userInfo && userInfo._id){
  //     getShopbySellerId();
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   if (myShop) {
    //     const updatedShopData = {
    //       shopName : ShopName,
    //       shopEmail : ShopEmail,
    //       shopAddress : ShopAddress,
    //       shopPhone : ShopPhone,
    //       shopDescription : ShopDescription,
    //     };

    //     // Update existing shop if myShop prop is provided
    //     fetch(`http://localhost:9120/api/shops/${shopId}`, {
    //       method: 'PUT',
    //       headers: {
    //           'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(updatedShopData)
    //     })
    //     .then((response) => response.json())
    //     .then(data => {
    //       console.log(data);
    //       alert(`Shop with ID updated successfully!`);
    //     })
    //     .catch((error) => console.log(error));
        
    //   } else {
    //     const newShopData = {
    //       shopName : ShopName,
    //       shopEmail : ShopEmail,
    //       shopAddress : ShopAddress,
    //       shopPhone : ShopPhone,
    //       shopDescription : ShopDescription,
    //     }

    //     // Create new shop if myShop prop is not provided
    //     fetch(`http://localhost:9120/api/shops`, {
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(newShopData)
    //     })
    //     .then((response) => response.json())
    //     .then(data => {
    //       alert("Your Shop created successfully!")})
    //     .catch((error) => console.log(error))
    //   }
    // } catch (error) {
    //   console.error(error)
    // }
  };

  return (
    <div
        className="flex justify-center items-center h-screen overflow-x-auto bg-gray-800 text-gray-200"
        style={{
          maxHeight: '40rem',
          minHeight: '30rem',
        }}
      >
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-gray-600 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">{myShop ? "Update Shop" : "Create Shop"}</h2>
        
        <div className="mb-4">
          <label htmlFor="shopName" className="block font-semibold mb-2">Shop Name</label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            value={ShopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="shopEmail" className="block font-semibold mb-2">Shop Email</label>
          <input
            id="shopEmail"
            name="shopEmail"
            value={ShopEmail}
            onChange={(e) => setShopEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          ></input>
        </div>

        <div className="mb-4">
          <label htmlFor="shopAddress" className="block font-semibold mb-2">Shop Address</label>
          <input
            id="shopAddress"
            name="shopAddress"
            value={ShopAddress}
            onChange={(e) => setShopAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          ></input>
        </div>

        <div className="mb-4">
          <label htmlFor="shopPhone" className="block font-semibold mb-2">Shop Phone</label>
          <input
            id="shopPhone"
            name="shopPhone"
            value={ShopPhone}
            onChange={(e) => setShopPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          ></input>
        </div>

        <div className="mb-4">
          <label htmlFor="shopDescription" className="block font-semibold mb-2">Shop Description</label>
          <textarea
            id="shopDescription"
            name="shopDescription"
            value={ShopDescription}
            onChange={(e) => setShopDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
        >{myShop ? "Update Shop" : "Create Shop"}
        </button>
      </form>
      </div>

  )
}
