import React, { useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";

const OrderFilter = (props) => {

    //classes for filter buttons
    const filterButtonClasses = "transition-all ml-2 w-24 w-auto inline-block text-slate-500 hover:cursor-pointer hover:underline";
    
    useEffect(() => {
        const addClasses = ["underline"];
        const removeClasses = ["text-slate-500"];
        let all, pending, confirmed, rejected;

        //get all button elements
        all = document.getElementById("orderFilterAll");
        pending = document.getElementById("orderFilterPending");
        confirmed = document.getElementById("orderFilterConfirmed");
        rejected = document.getElementById("orderFilterRejected");

        //reset text to initial state
        //remove all underline classes
        all.classList.remove(addClasses);
        pending.classList.remove(addClasses);
        confirmed.classList.remove(addClasses);
        rejected.classList.remove(addClasses);

        //add all text-slate-500 classes
        all.classList.add(removeClasses);
        pending.classList.add(removeClasses);
        confirmed.classList.add(removeClasses);
        rejected.classList.add(removeClasses);

        //add underline class to selected button
        if(props.orderFilter==="all"){
            all.classList.add(addClasses);
            all.classList.remove(removeClasses);
        }else if(props.orderFilter==="pending"){
            pending.classList.add(addClasses);
            pending.classList.remove(removeClasses);
        }else if(props.orderFilter==="confirmed"){
            confirmed.classList.add(addClasses);
            confirmed.classList.remove(removeClasses);
        }else if(props.orderFilter==="rejected"){
            rejected.classList.add(addClasses);
            rejected.classList.remove(removeClasses);
        }

    }, [props.orderFilter]);

    //filter button on click method
    const handleFilterClick = ({target}) => {
        if(target.id==="orderFilterAll"){
            props.setOrderFilter("all");
        } else if(target.id==="orderFilterPending"){
            props.setOrderFilter("pending");
        } else if(target.id==="orderFilterConfirmed"){
            props.setOrderFilter("confirmed");
        } else if(target.id==="orderFilterRejected"){
            props.setOrderFilter("rejected");
        }
    }

    const handleDateChange = ({target}) => {
        props.setDate(target.value);
    }

    const clearDate = () => {
        props.setDate("");
    }

    return (
        <div className="w-full flex justify-between my-2">
            <div className="text-2xl">Order List</div>
            <div className="flex flex-wrap pr-3">
                <input 
                    id="orderFilterAll" 
                    type="button" 
                    className={filterButtonClasses} 
                    value="All" 
                    onClick={handleFilterClick} />
                <input 
                    id="orderFilterPending" 
                    type="button" 
                    className={filterButtonClasses}
                    value="Pending" 
                    onClick={handleFilterClick} />
                <input 
                    id="orderFilterConfirmed" 
                    type="button" 
                    className={filterButtonClasses}
                    value="Confirmed"  
                    onClick={handleFilterClick} />
                <input 
                    id="orderFilterRejected" 
                    type="button" 
                    className={filterButtonClasses}
                    value="Rejected"  
                    onClick={handleFilterClick} />
                <input 
                    id="orderFilterDate" 
                    className="ml-10 w-48 p-1 bg-slate-600 rounded-md ring-1 ring-slate-400 text-slate-400" 
                    type="date"
                    value={props.date}
                    onChange={handleDateChange} />
                <button 
                    className="ml-2 w-9 p-1 bg-slate-600 rounded-full text-slate-400 active:scale-95 hover:bg-slate-500"
                    onClick={clearDate} >
                        <AiOutlineClose className="m-1.5" />
                    </button>
            </div>
        </div>
    );
}

export default OrderFilter;