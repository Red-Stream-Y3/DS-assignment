import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { logout } from '../../actions/userActions';

function NavBar() {
  const navigation = [
    { name: 'Home', onClick: 'home' },
    { name: 'Shop', onClick: 'shops' },
    { name: 'Order Tracker', onClick: 'orderTracker' },
  ];

  const location = useLocation();

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState('');

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setShowDropdown(false);
  // };

  const handleLogin = () => {
    setShowDropdown(false);
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search}`);
    } else {
      navigate('/home');
    }
  };

  const cartHandler = () => {
    if (!localStorage.getItem('commission')) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  return (
    <nav className="flex justify-between items-center bg-darkbg text-white py-4 px-8">
      <Link to="/home" className="text-3xl font-bold">
        Herbal Store
      </Link>

      <div className="flex items-center">
        <ul className="flex items-center space-x-5 text-md">
          {navigation.map((navItem) => (
            <li key={navItem.name}>
              <Link
                to={`/${navItem.onClick}`}
                className={
                  location.pathname === `/${navItem.onClick}`
                    ? 'text-primarylight'
                    : 'text-white'
                }
              >
                {navItem.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative ml-6">
          <form onSubmit={handleSearch}>
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
            <input
              type="text"
              placeholder="Search for herbs, supplements, and more"
              value={search}
              className="bg-gray-800 w-96 text-white rounded-full py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primarylight focus:border-transparent"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <div className="relative ml-6">
          <ShoppingBagIcon
            className="h-7 w-7 text-white cursor-pointer"
            aria-hidden="true"
            onClick={cartHandler}
          />
        </div>

        {userInfo && isLoggedIn ? (
          <div className="relative ml-6">
            <button
              onClick={handleProfileClick}
              className="bg-secondary text-white rounded-full h-10 w-10 flex items-center justify-center focus:outline-none"
            >
              <img
                src={userInfo.profilePic}
                alt="User profile"
                className="h-9 w-9 rounded-full"
              />
            </button>
            {showDropdown && (
              <ul className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg z-10">
                {/* link to account with user id */}
                <Link to={`/account/${userInfo._id}`}>
                  <li className="px-3 py-2 hover:bg-secondary rounded-lg cursor-pointer">
                    Account Settings
                  </li>
                </Link>
                <li
                  className="px-3 py-2 hover:bg-secondary rounded-lg cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="relative">
            <Link to="/register">
              <button
                className="ml-6 bg-secondary hover:bg-primarylight hover:text-gray-900 text-white rounded-lg py-2 px-4"
                onClick={handleLogin}
              >
                Register
              </button>
            </Link>
            <Link to="/login">
              <button
                className="ml-4 bg-secondary hover:bg-primarylight hover:text-gray-900 text-white rounded-lg py-2 px-4"
                onClick={handleLogin}
              >
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
