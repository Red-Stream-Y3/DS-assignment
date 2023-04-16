import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { deleteProduct } from "../../../actions/adminActions";

const DeleteProductPopup = (props) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        let res = await deleteProduct(props.product._id);
        if (res) {
            props.handleCancel();
            props.toast.success("Product Deleted!");
        } else {
            props.toast.error("Something went wrong!");
        }

        setLoading(false);
    }

    return (
        <>
        {
            props.product === null ? (
                <FaSpinner className="animate-spin text-4xl" />
            ) : (
                <div className="text-slate-300">
                    <div className="text-center font-bold text-lg">
                        Delete Product : {props.product.name}
                        <hr className="opacity-50" />
                    </div>
                    <div className="my-2 text-sm  opacity-50">
                        Note: This action cannot be undone.
                    </div>
                    <div>
                        <div className="mt-4 text-sm">
                            Are you sure you want to delete this product?
                        </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                        <button
                            className="bg-red-500 hover:bg-red-600 transition-all mt-3 text-white font-bold py-1 px-2 rounded mx-2 hover:cursor-pointer"
                            onClick={handleDelete}>
                            {
                                loading ? (
                                    <FaSpinner className="animate-spin" />
                                ) : (
                                    "Delete"
                                )
                            }
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-600 transition-all mt-3 text-white font-bold py-1 px-2 rounded mx-2 hover:cursor-pointer"
                            onClick={props.handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            )
        }
        </>
    );
};

export default DeleteProductPopup;