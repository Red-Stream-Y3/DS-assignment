import React, { useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";

const OrderFilter = (props) => {

    //classes for filter buttons
    const filterButtonClasses = "transition-all ml-2 w-24 w-auto inline-block text-slate-500 hover:cursor-pointer hover:underline";
    const filters = ["All", "Unpaid", "Pending", "Confirmed", "Rejected", "Delivered"];

    useEffect(() => {
        const addClasses = ["underline"];
        const removeClasses = ["text-slate-500"];
        let elements = [];

        //get all button elements
        filters.forEach((filter) => {
            elements.push(document.getElementById(`orderFilter${filter}`));
        });

        //reset text to initial state
        elements.forEach((element) => {
            element.classList.remove(addClasses);   //remove all underline classes
            element.classList.add(removeClasses);   //add all text-slate-500 classes
        });

        //add underline class to selected button
        switch(props.orderFilter){
            case "all":
                elements[0].classList.add(addClasses);
                elements[0].classList.remove(removeClasses);
                break;
            case "unpaid":
                elements[1].classList.add(addClasses);
                elements[1].classList.remove(removeClasses);
                break;
            case "pending":
                elements[2].classList.add(addClasses);
                elements[2].classList.remove(removeClasses);
                break;
            case "confirmed":
                elements[3].classList.add(addClasses);
                elements[3].classList.remove(removeClasses);
                break;
            case "rejected":
                elements[4].classList.add(addClasses);
                elements[4].classList.remove(removeClasses);
                break;
            case "delivered":
                elements[5].classList.add(addClasses);
                elements[5].classList.remove(removeClasses);
                break;
            default:
                break;
        }

    }, [props.orderFilter]);

    //filter button on click method
    const handleFilterClick = ({target}) => {
        props.setOrderFilter(target.value.toLowerCase());
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
                {
                    filters.map((filter, index) => {
                        return (
                            <input 
                                key={index}
                                id={`orderFilter${filter}`} 
                                type="button" 
                                className={filterButtonClasses} 
                                value={filter} 
                                onClick={handleFilterClick} />
                        );
                    })
                }
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