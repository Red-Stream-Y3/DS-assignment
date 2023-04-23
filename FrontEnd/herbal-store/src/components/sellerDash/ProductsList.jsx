import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { deleteProduct } from "../../actions/productActions";

const ProductsList = () => {

    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();

    //fetching user info from redux store
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userId = userInfo._id;

    //get products by user id
    const getProductbySellerId = async () => {
        try{
            const response = await fetch(`http://localhost:9121/api/products/user/${userId}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

     //useEffect to fetch products by user id
     useEffect(() => {
        if (userInfo && userInfo._id){
            getProductbySellerId();
        }
    }, []);

    //delete product
    const productDelete = useSelector((state) => state.productDelete);
    const { success: successDelete } = productDelete;

    //delete product function
    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this product?")){
           dispatch(deleteProduct(id));
        }
    };

     //useEffect to delete product
     useEffect(() => {
        if (successDelete) {
            alert("Product deleted successfully");
            window.location.href = '/seller';
        }
     }, [successDelete]);


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
                                    className="px-6"
                                    ><AiOutlineEdit /></button>
                               
                                <button
                                     type="button"
                                     className="mr-3"
                                     onClick={() => 
                                        handleDelete(data._id)}>
                                     <AiOutlineDelete /></button>
                                
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
