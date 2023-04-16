import React, { useEffect } from "react";

const StatFilter = (props) => {
    const filters = ["Daily", "Monthly", "Yearly"];

    useEffect(() => {
        const addClasses = ["underline"];
        const removeClasses = ["text-slate-500"];
        let elements = [];

        //get all button elements
        filters.forEach((filter) => {
            elements.push(document.getElementById(`statFilter${filter}`));
        });

        //reset text to initial state
        elements.forEach((element) => {
            element.classList.remove(addClasses);   //remove all underline classes
            element.classList.add(removeClasses);   //add all text-slate-500 classes
        });

        //add underline class to selected button
        switch(props.filterSelect){
            case "daily":
                elements[0].classList.add(addClasses);
                elements[0].classList.remove(removeClasses);
                break;
            case "monthly":
                elements[1].classList.add(addClasses);
                elements[1].classList.remove(removeClasses);
                break;
            case "yearly":
                elements[2].classList.add(addClasses);
                elements[2].classList.remove(removeClasses);
                break;
            default:
                break;
        }
    }, [props.filterSelect]);

    //filter button on click method
    const handleFilterClick = ({target}) => {
        props.setFilterSelect(target.value.toLowerCase());
    };

    //date input on change method
    const handleDateChange = ({target}) => {
        props.setFilterDate(target.value);
    };

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="text-2xl mr-5">Statistics</div>
                <input  
                    type="button"
                    className="mx-2 transition-all p-1 bg-slate-600 rounded-md ring-1 ring-slate-400 text-slate-400 active:scale-95"	
                    value="Refresh"
                    onClick={props.refreshStats} />
                <input  
                    type="button"
                    className="mx-2 transition-all p-1 bg-slate-600 rounded-md ring-1 ring-slate-400 text-slate-400 active:scale-95"	
                    value="Re-Calculate"
                    onClick={props.calculateStats} />
            </div>
            
            <div className="flex flex-wrap pr-3">
                <div className={`flex ${props.statSelect==="orders" && "hidden"}`}>
                   {
                    filters.map((filter, index) => {
                        return (
                            <input
                                key={index}
                                id={`statFilter${filter}`}
                                type="button"
                                className={props.filterButtonClasses}
                                value={filter}
                                onClick={handleFilterClick}
                            />
                        );
                    })
                } 
                </div>
                
                <input 
                    type="date"
                    className="ml-10 w-48 p-1 bg-slate-600 rounded-md ring-1 ring-slate-400 text-slate-400" 
                    value={props.filterDate}
                    onChange={handleDateChange} />
            </div>
        </div>
    );
};

export default StatFilter;