import React, { useEffect, useState } from "react";

import ProductFilter from "./ProductFilter";

const ProductList = (props) => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");

    //filter function
    useEffect(() => {
        if(search === "" || search === null || search === undefined){
            setFilteredProducts(props.products);
        } else {
            setFilteredProducts(
                props.products.filter((item) => {
                    return (
                        item.name.toLowerCase().includes(search.toLowerCase()) ||
                        item.brand.toLowerCase().includes(search.toLowerCase()) ||
                        item.category.toLowerCase().includes(search.toLowerCase())
                    );
                })
            );
        }
    }, [search, props.products]);

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
                            <th className={tableHeaderClasses}>Brand</th>
                            <th className={tableHeaderClasses}>Category</th>
                            <th className={tableHeaderClasses}>Price</th>
                            <th className={tableHeaderClasses}>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((item) => (
                            <tr 
                                key={item._id}
                                className="transition-all bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700">
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.brand}</td>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4">{item.rating}</td>
                                <td className="px-6 py-4">{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductList;