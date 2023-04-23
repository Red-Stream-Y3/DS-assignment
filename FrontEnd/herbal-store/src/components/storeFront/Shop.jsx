import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShopCard } from '../../components';
// import { listShops } from '../../actions/shopActions';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';


function Shop () {
  const dispatch = useDispatch();
  const shopList = useSelector((state) => state.shopList);
  const { loading, error, shops } = shopList;

  useEffect(() => {
    dispatch(listShops());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="container mx-auto p-10 bg-lightbg max-w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {shops.map((shop) => (
                <ShopCard key={shop._id} shop={shop} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}


export default Shop