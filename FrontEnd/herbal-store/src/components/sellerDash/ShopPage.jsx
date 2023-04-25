import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCard } from '../../components';

export default function ShopPage() {

  const [myShop, setMyShop ] = useState([]);
  const [products, setProducts] = useState([]);

  //fetching user info from redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userId = userInfo._id;

  //get seller's shop by seller id
  const getShopbySellerId = async () => {
    try{
      const response = await fetch(`http://localhost:9120/api/shops/user/${userId}`);
      const data = await response.json();
      setMyShop(data);
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //get seller's products by user id
  const getProductbySellerId = async () => {
    try{
      const response = await fetch(`http://localhost:9121/api/products/user/${userId}`);
      const data = await response.json();
      setProducts(data);
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect to fetch shop by user id
  useEffect(() => {
    if (userInfo && userInfo._id){
      getShopbySellerId();
      getProductbySellerId();
    }
  }, []);

  return (
    <div className="bg-gray-800 text-gray-400 rounded-lg">
      <div 
                className="overflow-x-auto" 
                style={{
                    maxHeight: "30rem", 
                    minHeight: "20rem",
                    }}>
      <div 
        className="overflow-x-auto" 
        style={{ maxHeight: "30rem", minHeight: "20rem", }}>

        <div>
          {myShop.map((shop) => (
            <div key={shop._id}>
              <h1 className="text-center text-4xl font-bold py-2">{shop.shopDetails.shopName}</h1>
              <h2 className="text-center text-xl  py-2">{shop.shopDetails.shopAddress}</h2>
              <h2 className="text-center text-xl  py-2">{shop.shopDetails.shopEmail}</h2>
              <h2 className="text-center text-xl  py-2">{shop.shopDetails.shopPhone}</h2>
            </div>
          ))}
        </div>
        
      </div>

        <div>
          <h1 className="text-left text-2xl font-bold ml-8">My Products</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 px-8 py-4 lg:grid-cols-4 gap-4'>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
        </div>
        </div>
    </div>

  )
}
