import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { saveShippingAddress } from '../../actions/cartActions';
import NavBar from '../../components/common/Navbar';

const ShippingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [firstName, setFirstName] = useState(shippingAddress.firstName);
  const [lastName, setLastName] = useState(shippingAddress.lastName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [apartment, setApartment] = useState(shippingAddress.apartment);
  const [city, setCity] = useState(shippingAddress.city);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        firstName,
        lastName,
        address,
        apartment,
        city,
        phone,
        country,
        postalCode,
      })
    );
    navigate('/payment');
  };

  const location = useLocation();
  const quantity = new URLSearchParams(location.search).get('quantity');

  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [dispatch, id, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <NavBar />

      <section>
        <div class="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
          <div class="my-10">
            <div class="mx-auto max-w-2xl lg:px-2">
              <form
                class="bg-darkbg grid grid-cols-6 gap-4 p-10 rounded-2xl"
                onSubmit={submitHandler}
              >
                <div className="col-span-6">
                  <h1 className="text-2xl font-bold text-white">
                    Shipping Information
                  </h1>
                </div>
                <div class="col-span-3">
                  <label
                    for="FirstName"
                    class="block text-md font-medium text-white"
                  >
                    First Name
                  </label>

                  <input
                    type="text"
                    id="FirstName"
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    placeholder="First Name"
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div class="col-span-3">
                  <label
                    for="LastName"
                    class="block text-md font-medium text-white"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="LastName"
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    placeholder="Last Name"
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div class="col-span-6">
                  <label
                    for="Address"
                    class="block text-md font-medium text-white"
                  >
                    Address
                  </label>

                  <input
                    type="text"
                    id="Address"
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    placeholder="Address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div class="col-span-6">
                  <label
                    for="Apartment"
                    class="block text-md font-medium text-white"
                  >
                    Apartment, suite, etc. (optional)
                  </label>

                  <input
                    type="text"
                    id="Apartment"
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                  />
                </div>

                <div class="col-span-6">
                  <label
                    for="City"
                    class="block text-md font-medium text-white"
                  >
                    City
                  </label>

                  <input
                    type="text"
                    id="City"
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    placeholder="City"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div class="col-span-6">
                  <label
                    for="Phone"
                    class="block text-md font-medium text-white"
                  >
                    Phone
                  </label>

                  <input
                    type="tel"
                    id="Phone"
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    placeholder="Phone"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div class="col-span-3">
                  <label
                    for="Country"
                    className="block text-md font-medium text-white"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="Country"
                    placeholder="Country"
                    class="relative w-full rounded-md border-gray-200 focus:z-10 sm:text-sm"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div class="col-span-3">
                  <label
                    for="Country"
                    className="block text-md font-medium text-white"
                  >
                    ZIP/Post Code
                  </label>
                  <input
                    type="text"
                    id="PostalCode"
                    placeholder="ZIP/Post Code"
                    class="relative w-full rounded-md border-gray-200 focus:z-10 sm:text-sm"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>

                <div class="col-span-6">
                  <p class="mt-8 text-lg font-medium text-white">
                    Shipping Methods
                  </p>
                  <form class="mt-5 grid gap-6">
                    <div class="relative checked:text-red-500">
                      <input
                        class="peer hidden"
                        id="radio_1"
                        type="radio"
                        name="radio"
                        checked
                      />
                      <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-primarylight"></span>
                      <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_1"
                      >
                        <img
                          class="w-14 object-contain"
                          src="/images/naorrAeygcJzX0SyNI4Y0.png"
                          alt=""
                        />
                        <div class="ml-5">
                          <span class="mt-2 font-bold text-secondary">
                            Fedex Delivery
                          </span>
                          <p class="text-secondary text-sm font-bold leading-6">
                            Delivery: 2-4 Days
                          </p>
                        </div>
                      </label>
                    </div>
                    <div class="relative">
                      <input
                        class="peer hidden"
                        id="radio_2"
                        type="radio"
                        name="radio"
                        checked
                      />
                      <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-primarylight"></span>
                      <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 text-white"
                        for="radio_2"
                      >
                        <img
                          class="w-14 object-contain"
                          src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                          alt=""
                        />
                        <div class="ml-5">
                          <span class="mt-2 font-bold text-secondary">
                            Fedex Delivery
                          </span>
                          <p class="text-secondary text-sm font-bold leading-6">
                            Delivery: 2-4 Days
                          </p>
                        </div>
                      </label>
                    </div>
                  </form>
                  <button
                    class="block w-full rounded-lg bg-secondary hover:bg-primarylight text-white hover:text-darkbg p-2.5 text-sm transition hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed mt-10"
                    disabled={cartItems.length === 0}
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
                  className="p-2 scrollbar scrollbar-thumb-primarylight scrollbar-track-lightbg overflow-y-auto"
                  style={{ height: '80vh' }}
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
                      <span className="text-lg font-bold text-white">
                        Price
                      </span>
                    </div>
                    <div className="w-1/5">
                      <span className="text-lg font-bold text-white">
                        Remove
                      </span>
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
                        <span className="text-xl text-white">
                          ${item.price}
                        </span>
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
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  items
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
                  {' '}
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
                <span className="text-md text-white">Calculating... ⌛</span>
              </div>
              <div className="flex justify-between py-4 border-t-2 border-solid border-primarylight">
                <span className="text-lg font-medium text-white">Total</span>
                <span className="text-lg font-medium text-white">
                  $
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
      </section>
    </>
  );
};

export default ShippingDetails;
