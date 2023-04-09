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
} from "../components";

const AdminDash = () => {

    const [orderList, setOrderList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [selectedTab, setSelectedTab] = useState("dashboard"); //dash, orders, users, statistics

    const backPort = "9122";
    //TODO: Admin statistics

    //request orders, users, products from server
    useEffect(() => {
        axios
            .get(`http://localhost:${backPort}/v1/order-list`)
            .then((res) => {
                setOrderList(res.data);
            })
            .catch((err) => console.log(err));

        axios
            .get(`http://localhost:${backPort}/v1/user-list`)
            .then((res) => {
                setUserList(res.data);
            })
            .catch((err) => console.log(err));

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
        "hidden transition-all ease-in fixed left-0 top-0 right-0 z-10 w-full h-full p-4 bg-black bg-opacity-50";
    const cardClasses = "bg-darkbg rounded-lg px-10 py-8 m-auto";
    const tableHeaderClasses =
        "sticky top-0 px-6 py-3 w-2/12 text-sm uppercase bg-gray-700 text-gray-400";
    const breadcrumbClasses = "transition-all hover:cursor-pointer hover:underline";

    //TODO: make breadcrumb clickable
    return (
        <>
            <div
                className="bg-lightbg w-full"
                style={{ height: "calc(100vh - 53px)" }}>
                <Navbar />
                <h1
                    id="adminBreadCrumb"
                    className="pl-8 italic text-slate-500 my-2 transition-all">
                    {selectedTab === "dashboard" && (
                        <div className={breadcrumbClasses}>Admin Dashboard</div>
                    )}
                    {selectedTab === "orders" && (
                        <div className="flex">
                            <div className={breadcrumbClasses}>Admin Dashboard</div>
                            <div className="font-black text-slate-300 mx-2">{" > "}</div>
                            <div className={breadcrumbClasses}>Orders</div>
                        </div>
                    )}
                    {selectedTab === "products" && (
                        <div className="flex">
                            <div className={breadcrumbClasses}>Admin Dashboard</div>
                            <div className="font-black text-slate-300 mx-2">{" > "}</div>
                            <div className={breadcrumbClasses}>Products</div>
                        </div>
                    )}
                    {selectedTab === "users" && (
                        <div className="flex">
                            <div className={breadcrumbClasses}>Admin Dashboard</div>
                            <div className="font-black text-slate-300 mx-2">{" > "}</div>
                            <div className={breadcrumbClasses}>Users</div>
                        </div>
                    )}
                    {selectedTab === "configurations" && (
                        <div className="flex">
                            <div className={breadcrumbClasses}>Admin Dashboard</div>
                            <div className="font-black text-slate-300 mx-2">{" > "}</div>
                            <div className={breadcrumbClasses}>Configurations</div>
                        </div>
                    )}
                </h1>

                <div className="flex">
                    <div
                        className="mx-5 mb-2 w-2/12 inline-block top-56 rounded-lg bg-darkbg"
                        style={{ height: "calc(100vh - 170px)" }}>
                        <AdminSidebar selector={setSelectedTab} />
                    </div>

                    {/* main component container */}
                    <div className="w-9/12 m-auto justify-center my-3">
                        <div className={cardClasses}>
                            {selectedTab === "dashboard" && (
                                <h1 className="text-gray-200">Satistics</h1>
                            )}
                            {selectedTab === "orders" && (
                                <OrderList
                                    tableHeader={tableHeaderClasses}
                                    orders={orderList}
                                    popupBgClasses={popupBackgroundClasses}
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

            <Footer />
        </>
    );
};

export default AdminDash;
