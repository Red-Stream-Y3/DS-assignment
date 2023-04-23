import React from 'react' 

export default function ShopPage() {
  return (
    <div className="p-1 shadow-md text-white">
      <div 
        className="overflow-x-auto" 
        style={{ maxHeight: "30rem", minHeight: "20rem", }}>
        <h1 className="text-gray-200 text-center text-2xl font-bold py-4">Shop Name</h1>
        <h2 className="text-gray-200 text-center text-xl font-bold py-4">Shop Email Address</h2>
        <h2 className="text-gray-200 text-center text-xl font-bold py-4">Shop Phone No.</h2>
        <h2 className="text-gray-200 text-center text-xl font-bold py-4">Shop Descrption</h2>
        </div>

        <div>
          <h1 className="text-gray-200 text-left text-2xl font-bold py-4">My Products</h1>
        </div>
    </div>

  )
}
