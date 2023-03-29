import React from "react";

const CommissionPopup = (props) => {

    //TODO:get current commission from database

    //TODO:send new commission to database
    const handleConfirm = () => {}

    return (
        <div className="text-slate-300">
            <div className="text-center font-bold text-lg">
                Order Commission
                <hr className="opacity-50" />
            </div>
            <div className="my-2 text-sm">
                Note: This commission will be applied to all orders.
            </div>
            <div className="my-2">
                Current Commission: 2%
            </div>
            <input 
                id="adminCommissionInput" 
                type="number" 
                placeholder="New commission rate"
                className="text-slate-300 bg-slate-600 rounded-md" />
            <div className="mt-2 flex justify-end">
                <button 
                    onClick={handleConfirm}
                    className="transition-all mt-3 bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded mx-2 hover:cursor-pointer">
                    Confirm
                </button>
                <button
                    id="adminCommissionPopupCancel"
                    onClick={props.handleCancel}
                    className="transition-all mt-3 bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded mx-2 hover:cursor-pointer">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default CommissionPopup;