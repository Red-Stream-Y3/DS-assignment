/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/common/Navbar";
import axios from "axios";

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
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
  const navigateTo = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userId = userInfo._id;

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:9121/api/products/${id}`);
      const product = await response.json();
      setProduct(product);
      setName(product.name);
      setBrand(product.brand);
      setDetail(product.detail);
      setCategory(product.category);
      setIngredients(product.ingredients);
      setPrice(product.price);
      setDescription(product.description);
      setUses(product.uses);
      setCountInStock(product.countInStock);
      setProImages(product.images);
      console.log(product);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProduct = {
      name,
      proImages,
      brand,
      category,
      ingredients,
      price,
      countInStock,
      uses,
      detail,
      description,
    };

    try {
      const result = await axios.put(
        `http://localhost:9121/api/products/${id}`,
        updatedProduct
      );
      alert("Product updated!");
      console.log(result);
    } catch (error) {
      alert("Error Occured!");
      console.log(error);
      navigateTo(`/seller`);
    }
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

  const Container = ({ children }) => {
    return (
      <div className="mx-auto max-w-3xl w-3/4 bg-gray-700 border border-gray-900 my-4">
        {children}
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <Container>
        <div className="rounded-lg text-white">
          <h2 className="text-2xl text-gray-200 text-center font-bold my-4">
            Update Product
          </h2>

          <form className="max-w-md mx-auto my-8">
            <div className="py-3 mb-4">
              <label htmlFor="name" className="block  mb-2">
                Name of the Product
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
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
                value={brand}
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
                value={category}
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
                value={ingredients}
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
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
                className="text-black rounded-lg border border-gray-400 p-2 w-full"
                // required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="countInStock" className="block  mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="countInStock"
                id="countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                placeholder="Enter product quantity"
                className="text-black rounded-lg border border-gray-400 p-2 w-full"
                // required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="uses" className="block  mb-2">
                Uses
              </label>
              <input
                type="text"
                name="uses"
                id="uses"
                value={uses}
                onChange={(e) => setUses(e.target.value)}
                placeholder="Enter instructions for how to use the product"
                className="text-black rounded-lg border border-gray-400 p-2 w-full"
                // required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="detail" className="block  mb-2">
                Detail
              </label>
              <input
                type="text"
                name="detail"
                id="detail"
                value={detail}
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
                value={description}
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
      </Container>
    </>
  );
}
