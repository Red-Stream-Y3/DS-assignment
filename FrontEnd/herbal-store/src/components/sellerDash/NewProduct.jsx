import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../../actions/productActions'

const NewProduct = () => {

    //const [product, setProduct] = useState({ name: "",quantity: "", images: "", brand: "", category: "", ingredients: "", price: "", description: "" });

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [name, setName] = useState("");
    const [images, setImages] = useState("");
    const [brand, setBrand] = useState("");
    const [detail, setDetail] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [uses, setUses] = useState("");
    const [countInStock, setCountInStock] = useState("");

    // const productAdd = useSelector((state) => state.productAdd);
    // const { success } = productAdd;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(addProduct(name, images, brand, category, ingredients, price, description, detail, uses, countInStock));
        //dispatch(addProduct(name, images, brand, category, ingredients, price, description, detail, uses, countInStock));
        // dispatch(addProduct())
    }

  useEffect(() => {
    const e = { preventDefault: () => {}};
    handleSubmit(e);
  }, []);
  
  return (
    
    <div className='bg-gray-700 text-gray-400 rounded-lg' > 

    <div className="overflow-x-auto" 
        style={{
            maxHeight: "30rem", 
            minHeight: "20rem",
            }}>

    <form className="max-w-md mx-auto my-8" onSubmit={handleSubmit}  >

        <h2 className="text-2xl text-center font-bold py-4">Add New Product</h2>
        
        <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="text-black border border-gray-400 p-2 w-full"
                required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="images" className="block font-bold mb-2">Images</label>
            <input
                type="text"
                name="images"
                id="images"
                //value={product.images}
                onChange={(e) => setImages(e.target.value)}
                placeholder="Enter product images"
                className="text-black border border-gray-400 p-2 w-full"
                // required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="brand" className="block font-bold mb-2">Brand</label>
            <input
                type="text"
                name="brand"
                id="brand"
                //value={product.brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter the product brand"
                className="text-black border border-gray-400 p-2 w-full"
                // required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="category" className="block font-bold mb-2">Category</label>
            <input
                type="text"
                name="category"
                id="category"
                //value={product.category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter product category"
                className="text-black border border-gray-400 p-2 w-full"
                // required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="ingredients" className="block font-bold mb-2">Ingredients</label>
            <input
                type="text"
                name="ingredients"
                id="ingredients"
                //value={product.ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter product ingredients"
                className="text-black border border-gray-400 p-2 w-full"
                // required
            />
        </div>
        
        <div className="mb-4">
            <label htmlFor="price" className="block font-bold mb-2">Unit Price</label>
            <input
                type="text"
                name="price"
                id="price"
                //value={product.price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
                className="text-black border border-gray-400 p-2 w-full"
                // required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="price" className="block font-bold mb-2">Quantity</label>
            <input
                type="number"
                name="quantity"
                id="price"
                //value={product.quantity}
                onChange={(e) => setCountInStock(e.target.value)}
                placeholder="Enter product quantity"
                className="text-black border border-gray-400 p-2 w-full"
                // required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="price" className="block font-bold mb-2">Uses</label>
            <input
                type="text"
                name="quantity"
                id="uses"
                //value={product.quantity}
                onChange={(e) => setUses(e.target.value)}
                placeholder="Enter product quantity"
                className="text-black border border-gray-400 p-2 w-full"
                // required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="price" className="block font-bold mb-2">Detail</label>
            <input
                type="text"
                name="detail"
                id="detail"
                //value={product.quantity}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Enter product quantity"
                className="text-black border border-gray-400 p-2 w-full"
                // required
            />
        </div>

        <div className="mb-6">
            <label htmlFor="description" className="block font-bold mb-2">
                Description
            </label>
            <textarea
                name="description"
                id="description"
                //value={product.description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                className="text-black border border-gray-400 p-2 w-full"
                rows="4"
                // required
            />
        </div>

        <div className="text-center">
            <button type="submit" 
            //onClick={handleSubmit}
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Add Product</button>
        </div>
        
  </form>
  </div>
  </div>
  )
}

export default NewProduct;