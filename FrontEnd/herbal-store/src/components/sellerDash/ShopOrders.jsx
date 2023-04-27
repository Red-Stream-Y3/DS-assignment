import React from 'react'


export default function ShopOrders() {
  return (
    <div className="p-1 shadow-md text-white">
      <div className="overflow-x-auto" 
        style={{ maxHeight: "30rem", minHeight: "20rem", }}>
        <h1 className="text-gray-200 text-center text-2xl font-bold py-4">Shop Orders</h1>

        <div>
        <table className="w-full border-collapse text-left text-grey-400">
          <thead className="text-sm uppercase bg-gray-700 text-gray-400">
            <tr>
                <th className="px-6 py-3 w-2/12">Order Date</th>
                <th className="px-6 py-3 w-2/12">Order ID</th>
                <th className="px-6 py-3 w-2/12">Products</th>
                <th className="px-6 py-3 w-2/12">Order Status</th>
                <th className="px-6 py-3 w-4/12">Confirmation</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>

        </div>
      </div>
    </div>
  )
}
