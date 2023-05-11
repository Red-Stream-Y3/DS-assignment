/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/productActions";

const NewProduct = () => {
  //const [product, setProduct] = useState({ name: "",quantity: "", images: "", brand: "", category: "", ingredients: "", price: "", description: "" });

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [uses, setUses] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [proImages, setProImages] = useState([]);

  const productAdd = useSelector((state) => state.productAdd);
  const { success } = productAdd;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userId = userInfo._id;
  console.log(userId);

  useEffect(() => {
    if (success) {
      window.location.href = "/seller";
    }
  }, [success]);

  //handle submit button
  const handleSubmit = () => {
    const imageUrls = proImages.map((img) => img.url);
    dispatch(
      addProduct({
        user: userId,
        name: name,
        images: imageUrls.map((url) => ({ url })),
        brand: brand,
        detail: detail,
        category: category,
        ingredients: ingredients,
        price: price,
        description: description,
        uses: [uses],
        countInStock: countInStock,
      })
    );
  };

  const handleOpenWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dqyue23nj",
        uploadPreset: "redstream",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setProImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    myWidget.open();
  };

  return (
    <div className="rounded-lg">
      <h2 className="text-2xl text-gray-200 text-center font-bold mb-4">
        Add New Product to Shop
      </h2>

      <div
        className="overflow-x-auto bg-gray-800 text-gray-200"
        style={{
          maxHeight: "40rem",
          minHeight: "40rem",
        }}
      >
        <form className="max-w-md mx-auto my-8">
          <div className="py-3 mb-4">
            <label htmlFor="name" className="block  mb-2">
              Name of the Product
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="text-black rounded-lg border border-gray-400 p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="images" className="block  mb-2">
              Images
            </label>

            {/* <input
              type="text"
              name="images"
              id="images"
              //value={product.images}
              onChange={(e) => setImages(e.target.value)}
              placeholder="Enter product images"
              className="text-black rounded-lg border border-gray-400 p-2 w-full"
              // required
            /> */}

            <div
              id="upload-widget"
              className="text-white border border-gray-400 p-2 w-full text-center"
              onClick={handleOpenWidget}
            >
              Upload product images
            </div>

            <div
              className="image-preview-container"
              style={{ display: "flex" }}
            >
              {proImages.map((img) => (
                <div
                  key={img.public_id}
                  className="image-preview"
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    margin: "5px",
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.url}
                    style={{
                      objectFit: "cover",
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="brand" className="block  mb-2">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              //value={product.brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Enter the product brand"
              className="text-black rounded-lg border border-gray-400 p-2 w-full"
              // required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block  mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              //value={product.category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter product category"
              className="text-black rounded-lg border border-gray-400 p-2 w-full"
              // required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ingredients" className="block  mb-2">
              Ingredients
            </label>
            <input
              type="text"
              name="ingredients"
              id="ingredients"
              //value={product.ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter product ingredients"
              className="text-black rounded-lg border border-gray-400 p-2 w-full"
              // required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block  mb-2">
              Unit Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              //value={product.price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              className="text-black rounded-lg border border-gray-400 p-2 w-full"
              // required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block  mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="price"
              //value={product.quantity}
              onChange={(e) => setCountInStock(e.target.value)}
              placeholder="Enter product quantity"
              className="text-black rounded-lg border border-gray-400 p-2 w-full"
              // required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block  mb-2">
              Uses
            </label>
            <input
              type="text"
              name="quantity"
              id="uses"
              //value={product.quantity}
              onChange={(e) => setUses(e.target.value)}
              placeholder="Enter product quantity"
              className="text-black rounded-lg border border-gray-400 p-2 w-full"
              // required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block  mb-2">
              Detail
            </label>
            <input
              type="text"
              name="detail"
              id="detail"
              //value={product.quantity}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Enter using instructions"
              className="text-black rounded-lg border border-gray-400 p-2 w-full"
              // required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block  mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              //value={product.description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="text-black rounded-lg border border-gray-400 p-2 w-full"
              rows="4"
              // required
            />
          </div>
        </form>

        <div className="text-center mb-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
