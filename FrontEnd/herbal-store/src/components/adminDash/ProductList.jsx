import React, { useState } from "react";

import ProductFilter from "./ProductFilter";

const ProductList = (props) => {

    const [products, setProducts] = useState(props.products);
    const [search, setSearch] = useState("");

    const tableHeaderClasses = props.tableHeader;

    return (
        <div className="p-1 shadow-md text-white">
            <ProductFilter
                search={search}
                setSearch={setSearch} />
            <div 
                className="overflow-x-auto" 
                style={{
                    maxHeight: "30rem", 
                    minHeight: "20rem",
                    }}>
                <table
                    className="w-full border-collapse text-left text-grey-400">
                    <thead>
                        <tr>
                            <th className={tableHeaderClasses}>Product Name</th>
                            <th className={tableHeaderClasses}>Category</th>
                            <th className={tableHeaderClasses}>Rating</th>
                            <th className={tableHeaderClasses}>Price</th>
                            <th className={tableHeaderClasses}>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr 
                                key={item._id}
                                className="transition-all bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700">
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4">{item.rating}</td>
                                <td className="px-6 py-4">{item.price}</td>
                                <td className="px-6 py-4">{item.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductList;