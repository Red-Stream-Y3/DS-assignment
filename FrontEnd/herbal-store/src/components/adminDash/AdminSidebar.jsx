import React, { useEffect } from "react";
import {AiOutlineDown} from "react-icons/ai";

const AdminSidebar = (props) => {

    const menuItems = ["orders", "products", "users", "configurations"];
    const dashboardSubItems = ["sales", "orders", "products", "demographics"];

    const elementList = [
        document.getElementById("admin-side-statistics"),
        document.getElementById("admin-side-orders"),
        document.getElementById("admin-side-products"),
        document.getElementById("admin-side-users"),
        document.getElementById("admin-side-configurations"),
    ];
    const subElementList = [
        document.getElementById("admin-stat-sub-sales"),
        document.getElementById("admin-stat-sub-orders"),
        document.getElementById("admin-stat-sub-products"),
        document.getElementById("admin-stat-sub-demographics"),
    ];

    useEffect(() => {
        try{
            elementList.forEach(item => {
                item.classList.remove("bg-slate-700");
            });
        } catch (e) {
            console.log(e);
        }
        document.getElementById(`admin-side-${props.selected}`).classList.add("bg-slate-700");
    }, [props.selected]);

    useEffect(() => {
        try{
            subElementList.forEach(item => {
                item.classList.remove("bg-slate-700");
            });
        } catch (e) {
            console.log(e);
        }
        document.getElementById(`admin-stat-sub-${props.subSelected}`).classList.add("bg-slate-700");
    }, [props.subSelected]);

    const handleListClick = ({target}) => {
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
        props.selector("statistics");
        props.subSelector(target.id.split("-")[3]);
    };

    const listClasses = "pl-10 border-b-2 border-slate-800 p-3 pt-4 active:bg-slate-700 hover:bg-slate-800 transition-all ease-in  hover:cursor-pointer";

    
    
    return (
        <div className="w-62 text-gray-200">
            <ul style={{ listStyleType: "none" }}>
                <li
                    key={"stat"}
                    id={"admin-side-statistics"}
                    className={listClasses}
                    onClick={handleListClick}>
                    <div className="flex justify-between pointer-events-none">
                        <div>Statistics</div>
                        <div className="mr-3 p-1">
                            <AiOutlineDown />
                        </div>
                    </div>
                </li>
                <div id="adminSidebarStatDropdown" className="hidden">
                    {dashboardSubItems.map((item) => (
                        <li
                            key={item}
                            id={`admin-stat-sub-${item}`}
                            className={listClasses + "pl-5"}
                            onClick={handleSubListClick}>
                            -{" "}
                            {String.prototype.charAt
                                .call(item, 0)
                                .toUpperCase() + item.slice(1)}
                        </li>
                    ))}
                </div>
                {menuItems.map((item) => (
                    <li
                        key={item}
                        id={`admin-side-${item}`}
                        className={listClasses}
                        onClick={handleListClick}>
                        {String.prototype.charAt.call(item, 0).toUpperCase() +
                            item.slice(1)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminSidebar;