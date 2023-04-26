import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShopCard } from '../../components';


function Shop () {

  const [shops, setShops] = useState([])

  useEffect(() => {
    const fetchShops = async () => {
      const { data } = await axios.get('http://localhost:9120/api/shops/all')
      setShops(data)
      console.log('data shops', data);
    }
    fetchShops()
  }, [])

  return (
    <div>
        <>
          <div className="container mx-auto p-10 bg-lightbg max-w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {shops.map((shop) => (
                <ShopCard key={shop._id} shop={shop} />
              ))}
            </div>
          </div>
        </>
    </div>
  )
}


export default Shop