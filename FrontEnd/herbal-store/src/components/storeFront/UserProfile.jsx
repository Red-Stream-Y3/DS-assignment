import React from "react";
import { PhotoIcon } from '@heroicons/react/24/solid'

function UserProfile() {
  const user = {
    personalInfo: {
      username: 'johndoe',
      profilePic: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      firstName: 'John',
      lastName: 'Doe',
    },
    securityInfo: {
      email: 'email@gmail.com',
      password: 'password',
      phone: '123-456-7890',
    },
    shippingInfo : {
      number : '123',
      line1 : 'Main St',
      line2 : 'Apt 1',
      city : 'San Francisco',
      state : 'CA',
      country : 'USA',
      zip : '94105'
    },
  }

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
                      value={user.personalInfo.username}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:text-sm sm:leading-6"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-white">
                  Profile Image
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <img className="h-20 w-20 rounded-full" src={user.personalInfo.profilePic} alt="Profile Image" />
                  <div className="flex flex-col gap-y-2">
                    <input type="file" name="photo" id="photo" className="sr-only" />
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
                    value={user.personalInfo.firstName}
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
                    value={user.personalInfo.lastName}
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
                    value={user.securityInfo.email}
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
                    value={user.securityInfo.phone}
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
                    value={user.securityInfo.password}
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
                    value={user.shippingInfo.number}
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
                    value={user.shippingInfo.line1}
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
                    value={user.shippingInfo.line2}
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
                    value={user.shippingInfo.city}
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
                    value={user.shippingInfo.state}
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
                    value={user.shippingInfo.zip}
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
                  <select
                    id="account-type"
                    name="account-type"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primarylight sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option selected>Buyer</option>
                    <option>Seller</option>
                  </select>
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