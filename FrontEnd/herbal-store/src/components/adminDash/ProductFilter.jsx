import React from "react";

const ProductFilter = (props) => {

    const handleSearchChange = ({target}) => {
        props.setSearch(target.value);
    }

    return (
        <div className="my-2 flex justify-between">
            <div className="text-2xl inline-block">Products</div>
            <input 
                id="adminProductSearch"
                className="ml-10 w-72 p-1 bg-slate-600 rounded-md ring-1 ring-slate-400 text-slate-400" 
                type="text" 
                value={props.search}
                onChange={handleSearchChange}
                placeholder="Search Products" /> 
        </div>
    );
}

export default ProductFilter;