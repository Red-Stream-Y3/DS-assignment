import React, { useState, useEffect } from 'react'

const NewProduct = () => {
    const [product, setProduct] = useState({ name: "",quantity: "", price: "", description: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("New product submitted:", product);
    // Call an API to add the new product to the database here
  };
  return (
    <div className='bg-gray-700 text-gray-400 rounded-lg' > 

    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8">
        <h2 className="text-2xl font-bold py-4">Add New Product</h2>
        <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={product.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="text-black border border-gray-400 p-2 w-full"
                required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">price</label>
            <input
                type="text"
                name="price"
                id="price"
                value={product.price}
                onChange={handleInputChange}
                placeholder="Enter product price"
                className="text-black border border-gray-400 p-2 w-full"
                required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="price" className="block font-bold mb-2">Quantity</label>
            <input
                type="number"
                name="quantity"
                id="price"
                value={product.quantity}
                onChange={handleInputChange}
                placeholder="Enter product quantity"
                className="text-black border border-gray-400 p-2 w-full"
                required
            />
        </div>
        <div className="mb-6">
            <label htmlFor="description" className="block font-bold mb-2">
                Description
            </label>
            <textarea
                name="description"
                id="description"
                value={product.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                className="text-black border border-gray-400 p-2 w-full"
                rows="4"
                required
            />
        </div>
        <div className="text-center">
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Add Product
        </button>
        </div>
  </form>
  </div>
  )
}

export default NewProduct;