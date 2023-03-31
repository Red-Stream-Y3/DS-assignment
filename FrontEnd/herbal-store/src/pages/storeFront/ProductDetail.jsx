import React, { useState } from 'react';
import productImage1 from '../../assets/hero1.jpg';
import productImage2 from '../../assets/hero2.jpg';
import productImage3 from '../../assets/hero3.jpg';
import productImage4 from '../../assets/hero4.jpg';
import NavBar from '../../components/common/Navbar';
import Rating from '../../components/storeFront/Rating';

const ProductDetail = () => {
  const product = {
    name: 'Natural Honey Bottle',
    vendor: 'Vendor Name',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. consectetur adipisicing elit. Quisquam, quod. consectetur adipisicing elit. Quisquam, quod. ',
    price: 19.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    images: [productImage1, productImage2, productImage3, productImage4],
  };

  const [mainImage, setMainImage] = useState(productImage1);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center mt-20">
        <div className="md:flex ml-20">
          <div className="md:w-1/3 mx-10">
            <div className="bg-transparent shadow-md rounded-xl overflow-hidden w-120 h-120">
              <img
                src={mainImage}
                alt="Productmain"
                className="w-full h-full"
              />
            </div>
            <div className="mt-10 my-4 flex justify-center gap-8 rounded-xl">
              {product.images.slice(0, 4).map((image) => (
                <img
                  src={image}
                  alt="image"
                  className="w-20 h-20 rounded-xl cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="bg-white shadow-md rounded-md overflow-hidden p-2 md:p-8 ml-20 mr-40">
              <h1 className="text-3xl font-bold mb-1">{product.name}</h1>
              <h3 className="text-2l font-semi-bold mb-4">
                by {product.vendor}
              </h3>
              <Rating value={product.rating} text={`${product.numReviews}`} />
              <h2 className="text-xl font-medium mt-6 mb-6">
                ${product.price.toFixed(2)}
              </h2>
              <p className="text-black text-base mb-4">{product.description}</p>
              <h3 className="text-2l font-semi-bold mb-4">
                Status :{' '}
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </h3>
              <div className="flex items-center">
                <div>
                  {product.countInStock > 0 && (
                    <div className="border-t border-gray-200 py-3">
                      <label className="text-black text-sm font-bold">
                        Quantity
                      </label>
                      <div className="flex items-center justify-between">
                        <div className="relative">
                          <select
                            id="quantity"
                            name="quantity"
                            // value={qty}
                            // onChange={(e) => setQty(e.target.value)}
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
                    className="bg-secondary text-white py-3 px-10 rounded-md shadow-lg hover:bg-primarylight transition duration-150 ease-in-out"
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
  );
};

export default ProductDetail;
