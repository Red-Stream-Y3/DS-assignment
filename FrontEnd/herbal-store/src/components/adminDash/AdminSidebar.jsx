import React from "react";
import {AiOutlineDown} from "react-icons/ai";

const AdminSidebar = (props) => {

    const handleListClick = ({target}) => {
        const listItems = document.querySelectorAll("li");

        listItems.forEach(item => {
            item.classList.remove("bg-slate-700");
        });
        target.classList.add("bg-slate-700");

        if(target.id === "admin-side-statistics") {
            handleDropDown();
        } else {
            props.selector(target.id.split("-")[2]);
        }
    };

    const handleDropDown = () => {
        const subList = document.getElementById("adminSidebarStatDropdown");
        if (subList.classList.contains("hidden")) {
            subList.classList.remove("hidden");
        } else {
            subList.classList.add("hidden");
        }
    };

    const handleSubListClick = ({target}) => {
        const listItems = document.querySelectorAll("li");

        listItems.forEach(item => {
            item.classList.remove("bg-slate-700");
        });
        target.classList.add("bg-slate-700");
        props.selector("statistics");
        props.subSelector(target.id.split("-")[3]);
    };

    const listClasses = "pl-10 border-b-2 border-slate-800 p-3 pt-4 active:bg-slate-700 hover:bg-slate-800 transition-all ease-in  hover:cursor-pointer";

    const menuItems = ["orders", "products", "users", "configurations"];
    const dashboardSubItems = ["sales", "orders", "conversion", "products", "demographics"];
    
    return(
        <div className="w-62 text-gray-200">
            <ul style={{listStyleType:"none"}}>
                <li 
                    key={"dash"}
                    id={"admin-side-statistics"}
                    className={listClasses}
                    onClick={handleListClick} >
                    <div className="flex justify-between pointer-events-none">
                        <div>
                            Statistics
                        </div>
                        <div className="mr-3 p-1">
                           <AiOutlineDown /> 
                        </div>
                    </div>
                </li>
                <div id="adminSidebarStatDropdown" className="hidden">
                    {dashboardSubItems.map(item => (
                        <li
                            key={item}
                            id={`admin-stat-sub-${item}`}
                            className={listClasses+"pl-5"}
                            onClick={handleSubListClick}>
                            - {String.prototype.charAt.call(item, 0).toUpperCase() + item.slice(1)}
                        </li>
                    ))}
                </div>
                {menuItems.map(item => (
                    <li
                        key={item}
                        id={`admin-side-${item}`}
                        className={listClasses}
                        onClick={handleListClick}>
                        {String.prototype.charAt.call(item, 0).toUpperCase() + item.slice(1)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminSidebar;