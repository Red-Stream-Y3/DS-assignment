import React from "react";

import { AiOutlineSetting } from "react-icons/ai";

const AdminTopButtons = (props) => {
    
        const handleCommissionClick = () => {
            
        }
    
        const handleEmailClick = () => {
            
        }
    
        const handleApplicationClick = () => {
            
        }
    
        return (
            <div className=" w-fit">
                <div className="flex">
                    <button 
                        className="transition-all flex w-fit p-1 bg-slate-600 rounded-md ring-1 ring-slate-400 text-slate-400 hover:bg-slate-500 hover:cursor-pointer" 
                        onClick={handleCommissionClick}>
                        <AiOutlineSetting className="inline-block m-1" />
                        <div className="mr-1">CONFIGURE ORDER COMMISSION</div>
                    </button>
                    <button 
                        className="transition-all flex ml-2 w-fit p-1 bg-slate-600 rounded-md ring-1 ring-slate-400 text-slate-400 hover:bg-slate-500 hover:cursor-pointer" 
                        onClick={handleEmailClick}>
                        <AiOutlineSetting className="inline-block m-1" />
                        <div className="mr-1">CONFIGURE EMAIL RECEIPTS</div>
                    </button>
                    <button 
                        className="transition-all flex ml-2 w-fit p-1 bg-slate-600 rounded-md ring-1 ring-slate-400 text-slate-400 hover:bg-slate-500 hover:cursor-pointer" 
                        onClick={handleApplicationClick}>
                        <AiOutlineSetting className="inline-block m-1" />
                        <div className="mr-1">CONFIGURE APPLICATION</div>
                    </button>
                </div>
            </div>
        );
}

export default AdminTopButtons;