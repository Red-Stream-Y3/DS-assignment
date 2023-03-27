import React from "react";

import { Navbar, Footer } from "../components";
import { OrderList } from "../components";

const AdminDash = () => {

    //list of dummy data
    const tempOrders = [{
        orderID: "1001",
        orderDate: "2023-03-31",
        orderStatus: "pending",
        orderTotal: "100.00"
    },{
        orderID: "1002",
        orderDate: "2023-03-31",
        orderStatus: "pending",
        orderTotal: "200.00"
    },{
        orderID: "1003",
        orderDate: "2023-03-31",
        orderStatus: "pending",
        orderTotal: "300.00"
    },{
        orderID: "1004",
        orderDate: "2023-04-01",
        orderStatus: "pending",
        orderTotal: "400.00"
    },{
        orderID: "1005",
        orderDate: "2023-04-01",
        orderStatus: "rejected",
        orderTotal: "500.00"
    },{
        orderID: "1006",
        orderDate: "2023-04-01",
        orderStatus: "confirmed",
        orderTotal: "600.00"
    }];

    return (
        <div className="bg-darkbg">
            <Navbar />
            <h1 className="pl-8 italic text-slate-500">Admin Dashboard</h1>
            <div className="ml-2 mr-2 mb-2 max-w-5xl">
                <OrderList orders={tempOrders} />
            </div>
            <Footer />
        </div>
    );
}

export default AdminDash;