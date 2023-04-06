import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard, Hero } from '../../components';
import { listProducts } from '../../actions/productActions';

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
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <Hero />
          <div className="container mx-auto p-10 bg-lightbg max-w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeProducts;
