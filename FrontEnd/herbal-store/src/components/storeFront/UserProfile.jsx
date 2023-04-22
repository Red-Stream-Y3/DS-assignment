import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, deleteUser } from '../../actions/userActions';
import { PhotoIcon } from '@heroicons/react/24/solid'

function UserProfile() {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [profilePic, setProfilePic] = useState(userInfo.profilePic);
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [phone, setPhone] = useState(userInfo.phone);
  const [number, setNumber] = useState(userInfo.shippingInfo.number);
  const [line1, setLine1] = useState(userInfo.shippingInfo.line1);
  const [line2, setLine2] = useState(userInfo.shippingInfo.line2);
  const [city, setCity] = useState(userInfo.shippingInfo.city);
  const [state, setState] = useState(userInfo.shippingInfo.state);
  const [zip, setZip] = useState(userInfo.shippingInfo.zip);
  const [country, setCountry] = useState(userInfo.shippingInfo.country);
  const [isSeller, setIsSeller] = useState(userInfo.isSeller);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (success) {
      alert('Profile Updated Successfully');
    }
  }, [success]);

  useEffect(() => {
    if (successDelete) {
      alert('Account Deleted Successfully');
      window.location.href = '/home';
    }
  }, [successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        username,
        email,
        profilePic,
        firstName,
        lastName,
        phone,
        number,
        line1,
        line2,
        city,
        state,
        zip,
        country,
        isSeller,
      })
    );
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteUser());
  };

  return (
    <div className="bg-darkbg w-3/4 rounded-lg mx-auto my-10 px-10 py-10">
      <div>
        <form >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10">
            <h2 className=" text-3xl font-semibold leading-7 text-white">Account Settings</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Change your account settings here.
            </p>
            <hr className="border-primarylight mt-3" />

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primarylight sm:max-w-md">
                    <span className="flex pr-3 select-none items-center pl-3 text-gray-400 sm:text-sm">herbalstore.com/</span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                      placeholder="username"
                      value={username}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-white">
                  Profile Image
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <img className="h-20 w-20 rounded-full bg-slate-300" src="" alt="Profile Image" />
                  <div className="flex flex-col gap-y-2">
                    <input type="file" name="photo" src={profilePic} id="photo" className="sr-only" />
                    <label htmlFor="photo" className="cursor-pointer relative bg-gray-900/10 rounded-md py-2 px-3 flex items-center text-sm font-medium text-white hover:bg-gray-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <PhotoIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-2">Change</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-white">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">Change your personal information here.</p>
            <hr className="border-primarylight mt-3" />
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    placeholder="first name"
                    value={firstName}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    placeholder="last name"
                    value={lastName}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email address"
                    value={email}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-white">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="phone number"
                    value={phone}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              
              <div className="col-span-full pt-10">
                <h2 className="text-2xl font-semibold leading-7 text-white">Shipping Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">Use a permanent address where you can receive mail.</p>
                <hr className="border-primarylight mt-3" />
              </div>
              
              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="house-number" className="block text-sm font-medium leading-6 text-white">
                  Apartment / Suite No. etc.
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="house-number"
                    id="house-number"
                    placeholder="apartment / suite no. etc."
                    value={houseNumber}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-5">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-white">
                  Address Line 1
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    placeholder="street address"
                    value={streetAddress}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-5">
                <label htmlFor="street-address2" className="block text-sm font-medium leading-6 text-white">
                  Address Line 2
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street-address2"
                    id="street-address2"
                    placeholder="street address 2"
                    value={streetAddress2}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="city"
                    value={city}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-white">
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    placeholder="state / province"
                    value={region}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-white">
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    placeholder="zip / postal code"
                    value={postalCode}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-white">
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    value={country}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Sri Lanka</option>
                    <option>India</option>
                    <option>Maldives</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-white">Change Account Type</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">Change your account type here.</p>
            <hr className="border-primarylight mt-3" />
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="account-type" className="block text-sm font-medium leading-6 text-white">
                  Account Type
                </label>
                <div className="mt-2">
                  <input 
                    type="checkbox"
                    name="account-type"
                    id="account-type"
                    className="mr-2"
                    value={isSeller}
                  />
                  <label htmlFor="account-type" className="text-sm leading-6 text-gray-400">Change my account type to seller</label>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="rounded-md bg-lightbg px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primarylight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default UserProfile;