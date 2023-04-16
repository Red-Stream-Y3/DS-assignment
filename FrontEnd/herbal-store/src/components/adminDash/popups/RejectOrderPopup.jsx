import React, { useState } from "react";
import { getAllOrders, rejectOrder } from "../../../actions/adminActions";
import { FaSpinner } from "react-icons/fa";

const RejectOrderPopup = (props) => {
    const [rejectNote, setRejectNote] = useState("");
    const [loading, setLoading] = useState(false);

    //handle reject note change
    const handleRejectNoteChance = ({ target }) => {
        setRejectNote(target.value);
    };

    //TODO: send rejectNote to backend
    const handleReject = async () => {
        setLoading(true);
        let res = await rejectOrder(
            props.order._id,
            rejectNote,
            props.user,
            props.order
        );
        if (res) {
            await getAllOrders(props.setOrderList);
            props.handleCancel();
            props.toast.success("Order Rejected!");
        } else {
            props.toast.error("Something went wrong!");
        }
        setLoading(false);
    };

    return (
        <div className="text-slate-300">
            {props.order === null || props.user === null ? (
                <FaSpinner className="animate-spin text-4xl" />
            ) : (
                <>
                    <div className="text-center font-bold text-lg">
                        Reject Order {props.orderID}
                        <hr className="opacity-50" />
                    </div>
                    <div className="my-2 text-sm">
                        Note: This action cannot be undone.
                        <br />
                        Note: User {props.customer} will be notified of this
                        action.
                    </div>
                    <div className="mt-4 text-sm opacity-50">
                        Optional : It is recommended to provide a reason for
                        rejection.
                    </div>
                    <input
                        type="text"
                        placeholder="Reason for rejection"
                        value={rejectNote}
                        onChange={handleRejectNoteChance}
                        className="text-slate-300 bg-slate-600 rounded-md mt-2 w-full"
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            className="bg-red-500 hover:bg-red-600 transition-all mt-3 text-white font-bold py-1 px-2 rounded mx-2 hover:cursor-pointer"
                            onClick={handleReject}>
                            {
                                loading ? (
                                    <FaSpinner className="animate-spin" />
                                ) : (
                                    "Reject"
                                )
                            }
                        </button>
                        <button
                            id="AdminRejectOrderPopupCancel"
                            className="transition-all mt-3 bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded mx-2 hover:cursor-pointer"
                            onClick={props.handleCancel}>
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default RejectOrderPopup;
