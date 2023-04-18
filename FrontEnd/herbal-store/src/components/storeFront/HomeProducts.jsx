import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard, Hero } from '../../components';
import { listProducts } from '../../actions/productActions';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';

const HomeProducts = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Hero />
          <div className="container mx-auto p-10 bg-lightbg max-w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeProducts;
