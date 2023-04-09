import React from "react";

import { AiOutlineSetting } from "react-icons/ai";
import CommissionPopup from "./CommissionPopup";

const AdminConfigButtons = (props) => {
    
        //handle click methods for commission popup 
        const handleCommissionClick = () => {
            const element = document.getElementById("adminCommissionPopup");
            element.classList.remove("hidden");
        }

        //hide popup when clicked outside of popup content or cancel button
        const handleCommissionCancel = (e) => {
            const element = document.getElementById("adminCommissionPopup");
            const closest = e.target.closest("#adminCommissionPopupContent");

            if(!closest || e.target.id === "adminCommissionPopupCancel"){
                element.classList.add("hidden");
            }
        }

        const handleCommissionConfirm = () => {
            const element = document.getElementById("adminCommissionPopup");
            element.classList.add("hidden");
        }
    
        //TODO:handle click methods for email popup
        const handleEmailClick = () => {
            props.toast.default("Feature will be coming soon!");
        }
    
        //TODO:handle click methods for application settings popup
        const handleApplicationClick = () => {
            props.toast.default("Feature will be coming soon!");
        }

        const buttonClasses = "transition-all flex ml-2 my-5 w-fit p-1 bg-slate-600 rounded-md ring-1 ring-slate-400 text-slate-400 hover:bg-slate-500 hover:cursor-pointer"

        return (
            <div className="w-fit">
                <div>
                    <button 
                        className={buttonClasses} 
                        onClick={handleCommissionClick}>
                        <AiOutlineSetting className="inline-block m-1" />
                        <div className="mr-1">CONFIGURE ORDER COMMISSION</div>
                    </button>
                    <button 
                        className={buttonClasses} 
                        onClick={handleEmailClick}>
                        <AiOutlineSetting className="inline-block m-1" />
                        <div className="mr-1">CONFIGURE EMAIL RECEIPTS</div>
                    </button>
                    <button 
                        className={buttonClasses}  
                        onClick={handleApplicationClick}>
                        <AiOutlineSetting className="inline-block m-1" />
                        <div className="mr-1">CONFIGURE APPLICATION</div>
                    </button>
                </div>
                <div
                    id="adminCommissionPopup"
                    onClick={handleCommissionCancel}
                    className={props.popupBgClasses} >
                    <div
                        id="adminCommissionPopupContent"
                        className="bg-slate-700 w-fit z-20 translate-y-2/3 p-6 m-auto rounded-md">
                        <CommissionPopup 
                            handleCancel={handleCommissionCancel}
                            handleConfirm={handleCommissionConfirm}
                            toast={props.toast}
                            backPort={props.backPort} />
                    </div>
                </div>
            </div>
        );
}

export default AdminConfigButtons;