import React from 'react';

const ShopTab = ({
  shopImage,
  shopName,
  shopEmail,
  shopAddress,
  shopPhone,
}) => {
  return (
    <div className="flex items-center p-10">
      <div className="w-full md:w-1/4 flex-shrink-0">
        <img
          className="w-30 h-30 rounded-full border-2 border-white"
          src="https://m.media-amazon.com/images/I/111pigi1ylL.png"
          alt=""
        />
      </div>
      <div className="w-full md:w-3/4 pl-10">
        <h2 className="text-lg font-semibold mb-6 text-white">{shopName}</h2>
        <p className="text-lg text-white mb-2">Email: {shopEmail}</p>
        <p className="text-lg text-white mb-2">Address: {shopAddress}</p>
        <p className="text-lg text-white mb-2">Contact Seller: {shopPhone}</p>
      </div>
    </div>
  );
};

export default ShopTab;
