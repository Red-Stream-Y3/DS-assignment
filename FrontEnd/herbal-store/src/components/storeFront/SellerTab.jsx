import React from 'react';

const SellerTab = ({ sellerImage }) => {
  return (
    <div className="flex items-center p-10">
      <div className="w-full md:w-1/4 flex-shrink-0">
        <img
          className="w-50 h-50 rounded-full border-2 border-white"
          src={sellerImage}
          alt={sellerImage}
        />
      </div>
      <div className="w-full md:w-3/4 pl-10">
        <h2 className="text-lg font-bold mb-4 text-white">John Doe </h2>
        <p className="text-lg text-white">Email: john.doe@example.com</p>
        <p className="text-lg text-white">
          Address: 221B Baker Street, London, England
        </p>
        <p className="text-lg text-white">Contact Seller: +1 234 567 890</p>
      </div>
    </div>
  );
};

export default SellerTab;
