import React from "react";

const ConfirmOrderPopup = (props) => {

    //get commission from database

    //method calculate commission
    const getCommission = (rate) => {
        return props.total * (rate/100);
    };

    //TODO:send confirmation to backend
    const handleConfirm = () => {};

    return (
        <div className="text-slate-300">
            <div className="text-center font-bold text-lg">
                Confirm Order {props.orderID}
                <hr className="opacity-50" />
            </div>
            <div className="my-2 text-sm">
                Note: This action cannot be undone.
            </div>
            <table className="text-right">
                <tbody>
                    <tr>
                        <td>
                            <div className="my-2 mx-3">
                                Order ID: {props.orderID}
                            </div>
                        </td>
                        <td>
                            <div className="my-2 mx-3">
                                Date: {props.date}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="my-2 mx-3">
                                Customer: {props.customer}
                            </div>
                        </td>
                        <td>
                            <div className="my-2 mx-3">
                                Seller: {props.seller}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className="my-2 mx-3">
                                Total: ${props.total}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className="my-2 mx-3">
                                Commission: ${getCommission(10)}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <hr className="opacity-50" />
                            <div className="my-2 mx-3">
                                <div className="font-bold">
                                    Sub Total: ${props.total + getCommission(10)}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mt-2 flex justify-end">
                <button id="adminConfirmOrderPopupConfirm"
                    onClick={handleConfirm}
                    className="transition-all mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-2 hover:cursor-pointer">
                    Confirm
                </button>
                <button
                    id="adminConfirmOrderPopupCancel"
                    onClick={props.handleCancel}
                    className="transition-all mt-3 bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded mx-2 hover:cursor-pointer">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default ConfirmOrderPopup;