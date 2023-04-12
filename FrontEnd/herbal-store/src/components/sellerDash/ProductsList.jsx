import React, { useEffect, useState } from "react";



const ProductsList = () => {

    return(
        <div className="p-1 shadow-md text-white">
            <h1>Product List</h1>

            <div 
                className="overflow-x-auto" 
                style={{
                    maxHeight: "30rem", 
                    minHeight: "20rem",
                    }}>
            <table
                    className="w-full border-collapse text-left text-grey-400">
                    <thead className="text-sm uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th className="px-6 py-3 w-2/12">Product ID</th>
                            <th className="px-6 py-3 w-2/12">Product Name</th>
                            <th className="px-6 py-3 w-2/12">Date Added </th>
                            <th className="px-6 py-3 w-2/12">Price</th>
                            <th className="px-6 py-3 w-2/12">Availbe Units</th>
                            <th className="px-6 py-3 w-4/12">Manage</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
            </table>
            </div>
        </div>
    )
}

export default ProductsList;
