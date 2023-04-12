import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { saveShippingDetails } from '../../actions/cartActions';
import NavBar from '../../components/common/Navbar';

const Shipping = () => {
  const { sId } = useParams();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const { shippingDetails } = cart;

  const [firstName, setFirstName] = useState(shippingDetails.firstName);
  const [lastName, setLastName] = useState(shippingDetails.lastName);
  const [address, setAddress] = useState(shippingDetails.address);
  const [apartment, setApartment] = useState(shippingDetails.apartment);
  const [city, setCity] = useState(shippingDetails.city);
  const [phone, setPhone] = useState(shippingDetails.phone);
  const [country, setCountry] = useState(shippingDetails.country);
  const [postalCode, setPostalCode] = useState(shippingDetails.postalCode);
  const [state, setState] = useState(shippingDetails.state);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingDetails({
        firstName,
        lastName,
        address,
        apartment,
        state,
        city,
        phone,
        country,
        postalCode,
      })
    );
    navigate('/confirm');
  };

  const location = useLocation();
  const quantity = new URLSearchParams(location.search).get('quantity');

  useEffect(() => {
    if (sId) {
      dispatch(addToCart(sId, quantity));
    }
  }, [dispatch, sId, quantity]);

  const removeFromCartHandler = (sId) => {
    dispatch(removeFromCart(sId));
  };

  return (
    <>
      <NavBar />

      <div className="mx-auto grid max-w-screen-1xl grid-cols-1 md:grid-cols-2">
        <div className="my-10">
          <div className="mx-10">
            <form
              className="bg-darkbg grid grid-cols-6 gap-4 p-10 rounded-2xl"
              onSubmit={submitHandler}
            >
              <div className="col-span-6">
                <h1 className="text-2xl font-bold text-white">
                  Shipping Information
                </h1>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-md font-medium text-white"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  placeholder="First Name"
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-md font-medium text-white"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  placeholder="Last Name"
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Address"
                  className="block text-md font-medium text-white"
                >
                  Address
                </label>

                <input
                  type="text"
                  id="Address"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  placeholder="Address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Apartment"
                  className="block text-md font-medium text-white"
                >
                  Apartment, suite, etc. (optional)
                </label>

                <input
                  type="text"
                  id="Apartment"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                />
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="State"
                  className="block text-md font-medium text-white"
                >
                  State
                </label>

                <input
                  type="text"
                  id="State"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  placeholder="State"
                  value={state}
                  required
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="City"
                  className="block text-md font-medium text-white"
                >
                  City
                </label>

                <input
                  type="text"
                  id="City"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  placeholder="City"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Phone"
                  className="block text-md font-medium text-white"
                >
                  Phone
                </label>

                <input
                  type="tel"
                  id="Phone"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  placeholder="Phone"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="Country"
                  className="block text-md font-medium text-white"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="Country"
                  placeholder="Country"
                  className="relative w-full rounded-md border-gray-200 focus:z-10 sm:text-sm"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="Country"
                  className="block text-md font-medium text-white"
                >
                  ZIP/Post Code
                </label>
                <input
                  type="text"
                  id="PostalCode"
                  placeholder="ZIP/Post Code"
                  className="relative w-full rounded-md border-gray-200 focus:z-10 sm:text-sm"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <button
                  className="block w-full rounded-lg bg-secondary hover:bg-primarylight text-white hover:text-darkbg p-2.5 text-sm transition hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed mt-10"
                  disabled={cartItems.length === 0}
                  onClick={submitHandler}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center py-10 pr-10">
          <div className="">
            {cartItems.length === 0 ? (
              <div className="bg-gray-100 p-4 mb-4 rounded-md">
                Your cart is empty {'  '}
                <Link to="/" className="text-red-500 pr-10">
                  <button className="bg-secondary text-white rounded-lg py-1 px-4 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <ul
                className="p-5 scrollbar scrollbar-thumb-primarylight scrollbar-track-lightbg overflow-y-auto border-2 border-solid border-primarylight bg-darkbg rounded-xl"
                style={{ height: '50vh' }}
              >
                <li className="py-4 flex items-center border-b-2 border-solid border-primarylight ">
                  <div className="w-3/5">
                    <span className="text-lg font-bold text-white">
                      Products
                    </span>
                  </div>
                  <div className="w-1/5">
                    <span className="text-lg font-bold text-white">
                      Quantity
                    </span>
                  </div>
                  <div className="w-1/5">
                    <span className="text-lg font-bold text-white">Price</span>
                  </div>
                  <div className="w-1/5">
                    <span className="text-lg font-bold text-white">Remove</span>
                  </div>
                </li>
                {cartItems.map((item) => (
                  <li
                    key={item.product}
                    className="py-4 flex items-center border-b-2 border-solid border-primarylight"
                  >
                    <div className="w-1/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-50 h-25 rounded-xl object-cover"
                      />
                    </div>
                    <div className="w-2/5 px-5">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-lg font-medium text-white hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <div className="py-2 text-s font-medium text-white">
                        Sold by:{' '}
                        <Link
                          to={`/product/${item.product}`}
                          className="text-lg font-medium text-white hover:text-primary"
                        >
                          {item.vendor}
                        </Link>
                      </div>
                    </div>

                    <div className="w-1/5 pb-10">
                      <select
                        className="block w-35 py-3 px-4 pr-10 text-base border-gray-300 focus:outline-none focus:ring-primarylight focus:border-primary sm:text-sm rounded-md mt-5"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/5 pb-8">
                      <span className="text-xl text-white">${item.price}</span>
                    </div>
                    <div className="w-1/5 pb-8 px-10">
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash text-red-500"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-between py-4">
              <span className="text-md font-medium text-white">
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </span>
              <span className="text-md font-medium text-white">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-md font-medium text-white">
                Commission (10 % order)
              </span>
              <span className="text-md font-medium text-white">
                $
                {cartItems
                  .reduce(
                    (acc, item) => acc + item.quantity * item.price * 0.1,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-md font-medium text-white">Shipping</span>
              <span className="text-md text-white">
                Calculated at the next step
              </span>
            </div>
            <div className="flex justify-between py-4 border-t-2 border-solid border-primarylight">
              <span className="text-lg font-medium text-white">Total</span>
              <span className="text-lg font-medium text-white">
                ${' '}
                {(
                  parseFloat(
                    cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)
                  ) +
                  parseFloat(
                    cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price * 0.1,
                        0
                      )
                      .toFixed(2)
                  )
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
