import React, { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Navbar,
    Footer,
    OrderList,
    UserList,
    AdminConfigButtons,
    AdminSidebar,
    ProductList,
    Statistics,
    AdminBreadCrumb,
} from "../components";

import { getAllOrders, getAllUsers, getDailySales, getMonthlySales } from "../actions/adminActions";

const AdminDash = () => {

    //data lists
    const [orderList, setOrderList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [productList, setProductList] = useState([]);
    
    //sidebar
    const [selectedTab, setSelectedTab] = useState("statistics"); //dash, orders, users, statistics
    const [statSelect, setStatSelect] = useState("sales");

    //statistics
    const [statDate, setStatDate] = useState(new Date().toISOString().split("T")[0]);
    const [statDateItems, setStatDateItems] = useState({
        month: 4,   //to get daily stats
        year: 2023,    //to get monthly stats
    });
    const [statData, setStatData] = useState({
        sales: {
            daily: [],
            monthly: [],
            yearly: [],
        },
        orders: {
            daily: [],
            monthly: [],
            yearly: [],
        },
    });

    const backPort = "9122";
    //TODO: Admin statistics

    //get date, month, year from statistics date selector
    useEffect(() => {
        const date = new Date(statDate);
        setStatDateItems({
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        });

        getDailySales(statDateItems.year, statDateItems.month, setStatData);
        getMonthlySales(statDateItems.year, setStatData);

    }, [statDate]);

    //request orders, users, products from server
    useEffect(() => {
        getAllOrders(setOrderList);
        getAllUsers(setUserList);

        axios
            .get(`http://localhost:${backPort}/v1/product-list`)
            .then((res) => {
                setProductList(res.data);
            })
            .catch((err) => console.log(err));

    }, []);

    //react-toastify toast method
    const notify = {
        default: (message) => toast(message),
        error: (message) => toast.error(message),
        success: (message) => toast.success(message),
    };

    const popupBackgroundClasses =
        "hidden transition-all ease-in fixed left-0 top-0 right-0 z-10 w-screen h-screen p-4 bg-black bg-opacity-50";
    const cardClasses = "bg-darkbg rounded-lg px-10 py-8 m-auto";
    const tableHeaderClasses =
        "sticky top-0 px-6 py-3 w-2/12 text-sm uppercase bg-gray-700 text-gray-400";
    const breadcrumbClasses = "transition-all hover:cursor-pointer hover:underline";
    const filterButtonClasses = "transition-all ml-2 w-24 w-auto inline-block text-slate-500 hover:cursor-pointer hover:underline";

    //TODO: make breadcrumb clickable
    return (
        <>
            <div
                className="bg-lightbg w-full"
                style={{ height: "calc(100vh - 53px)" }}>
                <Navbar />
                
                <AdminBreadCrumb 
                    breadcrumbClasses={breadcrumbClasses} 
                    selectedTab={selectedTab}
                    selectedSubTab={statSelect} />

                <div 
                    className="flex p-1">
                    <div
                        className="mx-5 w-2/12 inline-block top-56 rounded-lg bg-darkbg">
                        <AdminSidebar 
                            selected={selectedTab}
                            subSelected={statSelect}
                            selector={setSelectedTab}
                            subSelector={setStatSelect} />
                    </div>

                    {/* main component container */}
                    <div className="w-9/12 m-auto">
                        <div className={cardClasses}>
                            {selectedTab === "statistics" && (
                                <Statistics
                                    popupBgClasses={popupBackgroundClasses}
                                    filterButtonClasses={filterButtonClasses}
                                    statDate={statDate}
                                    dateItems={statDateItems}
                                    setStatDate={setStatDate}
                                    statDateItems={statDateItems}
                                    statData={statData}
                                    setStatData={setStatData}
                                    toast={notify}
                                    statSelect={statSelect} />
                            )}
                            {selectedTab === "orders" && (
                                <OrderList
                                    tableHeader={tableHeaderClasses}
                                    orders={orderList}
                                    setOrderList={setOrderList}
                                    popupBgClasses={popupBackgroundClasses}
                                    filterButtonClasses={filterButtonClasses}
                                    toast={notify}
                                />
                            )}
                            {selectedTab === "products" && (
                                <ProductList
                                    tableHeader={tableHeaderClasses}
                                    products={productList}
                                    toast={notify}
                                    popupBgClasses={popupBackgroundClasses} />
                            )}
                            {selectedTab === "users" && (
                                <UserList
                                    tableHeader={tableHeaderClasses}
                                    users={userList}
                                    setUserList={setUserList}
                                    toast={notify}
                                    popupBgClasses={popupBackgroundClasses} />
                            )}
                            {selectedTab === "configurations" && (
                                <AdminConfigButtons
                                    popupBgClasses={popupBackgroundClasses}
                                    toast={notify}
                                    backPort={backPort} />
                            )}
                        </div>
                    </div>
                </div>

                <ToastContainer />
            </div>
        </>
    );
};

export default AdminDash;
