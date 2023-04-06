import React from 'react';

function UserProfile() {
  const user = {
    name: 'John Doe',
    avatar: 'C:\Users\johndoe\avatar.png',
    shippingAddress: {
      line1: '123 Main St',
      line2: 'Apt 1',
      city: 'San Francisco',
      state: 'CA',
      zip: '94111',
    }
  }
  return (
    <div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
        <div className="text-sm">{user.shippingAddress.line1}</div>
        <div className="text-sm">{user.shippingAddress.line2}</div>
        <div className="text-sm">{user.shippingAddress.city}, {user.shippingAddress.state} {user.shippingAddress.zip}</div>
      </div>
    </div>
  );
}

export default UserProfile;
