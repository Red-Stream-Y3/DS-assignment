import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";


const ProductsList = () => {

    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const getProducts = async () => {
        try{
            const response = await fetch(`http://localhost:9121/api/products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProductbyId = async (id) => {
        try{
            const response = await fetch(`http://localhost:9121/api/products/${id}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async (id) => {
        await axios ({
            method: "DELETE",
            url: `http://localhost:9121/api/products/${id}`,
        })
        //.delete(`http://localhost:9121/api/products/${id}`)
        .then((res) => {
            getProductbyId();
            alert("Product deleted:", id);
        })
        .catch((err) => {
            console.log(err);
            alert("Error deleting product:", err);
        });
    }
        

//   // Function to handle delete button click
//   const handleDelete = async (productId) => {
//     try {
//       // Send DELETE request to API to delete the product
//       await fetch(`http://localhost:9121/api/products/${id}`, {
//         method: 'DELETE'
//       });

//       // Dispatch the deleteProduct action with the productId to delete the product from Redux store
//       dispatch(deleteProduct(id));
//     } catch (error) {
//       console.error('Failed to delete product:', error);
//     }
//   };

    // const editProduct = async (id) => {
    //     try{
    //         const response = await fetch(`http://localhost:9121/api/products/${id}`, {
    //             method: "PUT",
    //         });
    //         const data = await response.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        getProducts();
    }, []);

    return(
        <div className="p-1 shadow-md text-white">
           <div className="text-2xl inline-block">Products</div>
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
                            <th className="px-6 py-3 w-2/12">Product Name</th>
                            <th className="px-6 py-3 w-2/12">Rating</th>
                            <th className="px-6 py-3 w-2/12">Price</th>
                            <th className="px-6 py-3 w-2/12">Availbe Units</th>
                            <th className="px-6 py-3 w-4/12">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((data) => (
                            <tr
                                key={data._id}
                                className="transition-all bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700">
                                <td className="px-6 py-4">{data.name}</td>
                                <td className="px-6 py-4">{data.rating}</td>
                                <td className="px-6 py-4">{data.price}</td>
                                <td className="px-6 py-4">{data.countInStock}</td>
                            
                                <td >
                                <button
                                    type="button"
                                    className="px-3"
                                    ><AiOutlineEdit /></button>
                               
                                <button
                                     type="button"
                                     className="mr-3"
                                     onClick={() => 
                                        deleteProduct(data._id)}>
                                     <AiOutlineDelete /></button>
                                
                                <button
                                    type="button"
                                    ><AiOutlineDelete /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            </div>
        </div>
    )
}

export default ProductsList;
