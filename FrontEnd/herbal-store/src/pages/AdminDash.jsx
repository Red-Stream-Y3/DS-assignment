import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
    Navbar, 
    Footer, 
    OrderList, 
    UserList,
    AdminTopButtons
} from "../components";

const AdminDash = () => {

    const [orderList, setOrderList] = useState([]);
    const [userList, setUserList] = useState([]);

    //request orders and users from server
    useEffect(() => {
        fetch("http://localhost:3119/api/order-list", {method: "GET"})
        .then(res => res.json())
        .then(data => {
            setOrderList(data);
        })
        .catch(err => console.log(err));

        fetch("http://localhost:3119/api/user-list", {method: "GET"})
        .then(res => res.json())
        .then(data => {
            setUserList(data);
        })
        .catch(err => console.log(err));
    }, []);

    //react-toastify toast method
    const notify = (message) => toast(message);

    const popupBackgroundClasses = "hidden transition-all ease-in fixed left-0 top-0 right-0 z-10 w-full h-full p-4 bg-black bg-opacity-50";

    return (
        <div className="bg-darkbg w-full">
            <Navbar />
            <h1 id="adminBreadCrumb" className="pl-8 italic text-slate-500">Admin Dashboard</h1>
            
            <div className="w-fit m-auto">
                <AdminTopButtons 
                    popupBgClasses={popupBackgroundClasses}
                    toast={notify} />
            </div>

            <div className="flex w-full justify-center my-3">
                <div className="mx-2 mb-2 w-8/12 inline-block">
                    <OrderList 
                        orders={orderList} 
                        popupBgClasses={popupBackgroundClasses}
                        toast={notify} />
                </div>
                <div className="mx-2 mb-2 w-3/12 inline-block">
                    <UserList 
                        users={userList}
                        toast={notify} />
                </div>
            </div>
            
            <ToastContainer />
            
            <Footer />
        </div>
    );
}

export default AdminDash;