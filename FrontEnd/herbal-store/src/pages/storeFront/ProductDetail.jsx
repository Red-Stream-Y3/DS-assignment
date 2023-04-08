import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/common/Navbar';
import Rating from '../../components/storeFront/Rating';
import Breadcrumb from '../../components/storeFront/Breadcrumb';
import Review from '../../components/storeFront/ReviewTab';
import SellerTab from '../../components/storeFront/SellerTab';
import SideProducts from '../../components/storeFront/SideProducts';
import Footer from '../../components/common/Footer';
import { listProductDetails, listProducts } from '../../actions/productActions';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';

const ProductDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  // TODO: first image not showing
  const [mainImage, setMainImage] = useState('https://picsum.photos/500');

  const [activeTab, setActiveTab] = useState('description');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const addToCartHandler = () => {
    navigate(`/cart/${id}?quantity=${quantity}`);
  };

  useEffect(() => {
    dispatch(listProductDetails(id));
    dispatch(listProducts());
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <NavBar />
          <Breadcrumb key={product._id} product={product.name} />
          <div className="flex justify-center items-center py-10 bg-lightbg">
            <div className="md:flex ml-20">
              <div className="md:w-1/3 mx-10 pt-5">
                <div className="bg-transparent shadow-md rounded-xl overflow-hidden w-120 h-80 flex justify-center items-center">
                  <img
                    src={mainImage}
                    alt={mainImage}
                    className="w-120 h-80 object-cover"
                  />
                </div>
                <div className="mt-10 my-4 flex justify-center gap-8 rounded-xl">
                  {product.images.slice(0, 4).map((image) => (
                    <img
                      key={image._id}
                      src={image.url}
                      alt={image._id}
                      className="w-20 h-20 rounded-xl cursor-pointer border-2 border-transparent hover:border-primary "
                      onClick={() => handleImageClick(image.url)}
                    />
                  ))}
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="bg-darkbg shadow-md rounded-md overflow-hidden p-2 md:p-8 ml-20 mr-40">
                  <h1 className="text-3xl font-bold mb-1 text-white">
                    {product.name}
                  </h1>
                  <h3 className="text-2l font-semi-bold mt-2 mb-4 text-white">
                    by {product.vendor}
                  </h3>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                  <h2 className="text-xl font-medium mt-6 mb-6 text-white">
                    {product && product.price && `$${product.price.toFixed(2)}`}
                  </h2>
                  <p className="text-white text-base mb-4">{product.detail}</p>
                  <h3 className="text-2l font-semi-bold mb-4 text-white">
                    Status :{' '}
                    {product.countInStock > 0 ? (
                      <span className="text-primarylight">In Stock</span>
                    ) : (
                      <span className="text-red-500">Out Of Stock</span>
                    )}
                  </h3>
                  <div className="flex items-center">
                    <div>
                      {product.countInStock > 0 && (
                        <div className="py-3">
                          <label className="text-white text-sm font-bold">
                            Quantity
                          </label>
                          <div className="flex items-center justify-between">
                            <div className="relative">
                              <select
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="block w-full py-3 px-4 pr-10 text-base border-gray-300 focus:outline-none focus:ring-primarylight focus:border-primary sm:text-sm rounded-md mt-5"
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ml-10 mt-11">
                      <button
                        onClick={addToCartHandler}
                        className="bg-secondary text-white py-3 px-10 rounded-md shadow-lg hover:bg-primarylight hover:text-darkbg font-bold transition duration-150 ease-in-out"
                        disabled={product.countInStock === 0}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Description, Reviews, Seller */}
      <div className="flex">
        <div
          className="w-3/4 bg-darkbg mx-10 my-5 p-10 border-2 border-solid border-primarylight rounded-xl"
          style={{ height: 'auto' }}
        >
          <div className="">
            <button
              className={`mr-4 ${
                activeTab === 'description'
                  ? 'bg-secondary text-white'
                  : 'bg-white text-gray-700'
              } py-2 px-4 rounded-lg focus:outline-none`}
              onClick={() => handleTabClick('description')}
            >
              Description
            </button>

            <button
              className={`mr-4 ${
                activeTab === 'reviews'
                  ? 'bg-secondary text-white'
                  : 'bg-white text-gray-700'
              } py-2 px-4 rounded-lg focus:outline-none`}
              onClick={() => handleTabClick('reviews')}
            >
              Reviews
            </button>
            <button
              className={`mr-4 ${
                activeTab === 'seller'
                  ? 'bg-secondary text-white'
                  : 'bg-white text-gray-700'
              } py-2 px-4 rounded-lg focus:outline-none`}
              onClick={() => handleTabClick('seller')}
            >
              Seller
            </button>
          </div>
          <div className="flex-1 pt-10" style={{ height: 'auto' }}>
            {activeTab === 'description' && (
              <div>
                <p className="text-lg text-white">{product.description}</p>
                <p className="text-lg font-semibold text-white pt-8 pb-2">
                  Recommended Uses
                </p>
                <ul className="list-disc list-inside">
                  {product.uses.map((uses, index) => (
                    <li key={index} className="text-white text-md">
                      {uses}
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-semibold text-white pt-8 pb-2">
                  Ingredients
                </p>
                <p className="text-md text-white">{product.ingredients}</p>
              </div>
            )}
            {activeTab === 'ingredients' && (
              <div style={{ height: '300px' }}></div>
            )}
            {activeTab === 'reviews' && (
              <>
                {product.reviews.map((review) => (
                  <Review
                    key={review._id}
                    name={review.name}
                    userImage={review.userImage}
                    rating={review.rating}
                    comment={review.comment}
                  />
                ))}
              </>
            )}
            {activeTab === 'seller' && (
              <div style={{ height: '300px' }}>
                <SellerTab productImage={product.vendorImage} />
              </div>
            )}
          </div>
        </div>

        {/* New Products */}
        <div
          className="w-1/4 bg-darkbg mr-10 my-5 p-10 border-2 border-solid border-primarylight rounded-xl"
          style={{ height: 'auto' }}
        >
          <div>
            <h1 className="text-2xl font-bold text-white">New Products</h1>
            <div className="bg-gray-300 h-1 relative my-5">
              <hr className="absolute top-0 h-full border-none bg-green-300 w-1/3" />
            </div>
            {products.slice(0, 3).map((product) => (
              <Link to={`/product/${product._id}`}>
                <SideProducts
                  key={product._id}
                  productImage={product.images[0].url}
                  name={product.name}
                  rating={product.rating}
                  price={product.price}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mx-10 my-5 p-10 border-2 border-solid border-primarylight rounded-xl">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-white">Related Products</h1>
            <div className="mx-auto py-5 bg-lightbg max-w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {products.map(
                  (product, index) =>
                    product._id !== id && (
                      <div
                        className={`max-w-xs rounded-md overflow-hidden shadow-md ${
                          index > 3 ? 'justify-self-center' : ''
                        }`}
                      >
                        <Link to={`/product/${product._id}`}>
                          <img
                            className="w-full h-48 object-cover"
                            src={product.images[0].url}
                            alt={product.name}
                          />
                        </Link>
                        <div className="bg-darkbg text-white p-4">
                          <div className="font-semibold text-lg h-16">
                            <Link to={`/product/${product._id}`}>
                              {' '}
                              {product.name}
                            </Link>
                          </div>

                          <div className="text-primarylight font-bold text-xl mt-2">
                            ${product.price}
                          </div>
                          <button
                            // onClick={addToCart}
                            className="bg-secondary hover:bg-primarylight text-white hover:text-darkbg font-bold py-2 px-4 rounded mt-2 w-full"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductDetail;
