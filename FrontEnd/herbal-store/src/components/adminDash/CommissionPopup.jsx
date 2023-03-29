import React from "react";

const CommissionPopup = (props) => {

    //get current commission from database

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
            <div className="mt-2 w-fit m-auto">
                <button 
                    id="adminCommissionPopupCancel"
                    onClick={props.handleCancel}
                    className="transition-all mt-2 mx-5 w-20 p-1 bg-slate-600 rounded-md ring-1 ring-slate-400 text-slate-400 hover:bg-slate-500 hover:cursor-pointer">
                    Cancel
                </button>
                <button
                    className="transition-all mt-2 mx-5 w-20 p-1 bg-slate-400 rounded-md ring-1 ring-slate-600 text-slate-600 hover:bg-slate-500 hover:cursor-pointer">
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default CommissionPopup;