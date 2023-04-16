import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from 'react-icons/fa';
import { getCommission } from "../../../actions/adminActions";

const CommissionPopup = (props) => {

    const [commission, setCommission] = useState(0);
    const [loading, setLoading] = useState(false);
    const [commissionInput, setCommissionInput] = useState("");

    //get current commission from database
    useEffect(() => {
        getCommission(setCommission);
    }, []);

    //send new commission to database
    const handleConfirm = async () => {
        if(
            commissionInput === "" || 
            commissionInput === null || 
            commissionInput === undefined ){
            props.toast.error("Please enter a commission rate.");
        } else if(commissionInput == commission){
            props.toast.error("Commission rate is the same as the current rate.");
        } else {
            setLoading(true);
            await axios.post(`http://localhost:${props.backPort}/v1/commission`, {
                commission: commissionInput
            }).then((res) => {
                setCommission(res.data.commission);
                props.toast.success(`Commission updated!`);
                props.handleConfirm();
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });
        }
    }

    //handle input change
    const handleCommissionInput = ({target}) => {
        if(target.value >= 0 && target.value <= 100){
            setCommissionInput(target.value);
        }
    }

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
                Current Commission: {commission}%
            </div>
            <input 
                id="adminCommissionInput" 
                type="number" 
                value={commissionInput}
                onChange={handleCommissionInput}
                placeholder="New commission rate"
                className="text-slate-300 bg-slate-600 rounded-md" />
            <div className="mt-2 flex justify-end">
                <button 
                    onClick={handleConfirm}
                    className="transition-all mt-3 bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded mx-2 hover:cursor-pointer">
                    {
                        loading ? 
                        <FaSpinner className="animate-spin text-4xl" /> 
                        : 
                        "Confirm"
                    }
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