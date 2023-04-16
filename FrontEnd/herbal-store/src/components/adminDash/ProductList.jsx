import React, { useEffect, useState } from "react";

import ProductFilter from "./ProductFilter";
import DeleteProductPopup from "./popups/DeleteProductPopup";

const ProductList = (props) => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    const handleDeleteProduct = (e, index) => {
        const element = document.getElementById("adminDeleteProductPopupBackground");
        element.classList.remove("hidden");

        setSelectedProduct(filteredProducts[index]);
    };

    const handleDeletePopupCancel = () => {
        const element = document.getElementById("adminDeleteProductPopupBackground");
        element.classList.add("hidden");

        setSelectedProduct(null);
    };

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
                            <th className={tableHeaderClasses}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((item, index) => (
                            <tr 
                                key={item._id}
                                className="transition-all bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700">
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.brand}</td>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4">{item.rating}</td>
                                <td className="px-6 py-4">{item.price}</td>
                                <td className="px-6 py-4">
                                    {/* <button
                                        className="transition-all bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded-md"
                                        onClick={() => props.editProduct(item)}>
                                        Edit
                                    </button> */}
                                    <button
                                        className="transition-all bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded-md ml-2"
                                        onClick={(e) => handleDeleteProduct(e, index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div
                id="adminDeleteProductPopupBackground"
                className={props.popupBgClasses}
                onClick={({ target }) => {
                    if (target.closest("#adminDeleteProductPopupContent")===null) {
                        handleDeletePopupCancel();
                    }
                }}
                style={{
                    backdropFilter: "blur(5px)",
                }}>
                <div
                    id="adminDeleteProductPopupContent" 
                    className="bg-slate-700 w-fit z-20 translate-y-2/3 p-6 m-auto rounded-md">
                    <DeleteProductPopup 
                        product={selectedProduct}
                        handleCancel={handleDeletePopupCancel}
                        toast={props.toast} />
                </div>
            </div>
        </div>
    );
}

export default ProductList;