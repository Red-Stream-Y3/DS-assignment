import React from "react";

const ConfirmOrderPopup = (props) => {

    //get commission from database

    const getCommission = (total, rate) => {
        return total * (rate/100);
    };

    const handleConfirm = () => {};

    return (
        <div className="text-slate-300">
            <div className="text-center font-bold text-lg">
                Confirm Order
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
                                Commission: ${getCommission(props.total, 10)}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <hr className="opacity-50" />
                            <div className="my-2 mx-3">
                                <div className="font-bold">
                                    Sub Total: ${props.total + getCommission(props.total, 10)}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mt-2 w-fit m-auto">
                <button 
                    id="adminConfirmOrderPopupCancel"
                    onClick={props.handleCancel}
                    className="transition-all mt-2 mx-5 w-20 p-1 bg-slate-600 rounded-md ring-1 ring-slate-400 text-slate-400 hover:bg-slate-500 hover:cursor-pointer">
                    Cancel
                </button>
                <button
                    id="adminConfirmOrderPopupConfirm"
                    onClick={handleConfirm}
                    className="transition-all mt-2 mx-5 w-20 p-1 bg-slate-400 rounded-md ring-1 ring-slate-600 text-slate-600 hover:bg-slate-500 hover:cursor-pointer">
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default ConfirmOrderPopup;