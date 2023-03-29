import React from "react";

import { 
    Navbar, 
    Footer, 
    OrderList, 
    UserList,
    AdminTopButtons
} from "../components";

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
    },{
        orderID: "1007",
        orderDate: "2023-04-01",
        orderStatus: "confirmed",
        orderTotal: "700.00"
    },{
        orderID: "1008",
        orderDate: "2023-04-01",
        orderStatus: "confirmed",
        orderTotal: "800.00"
    },{
        orderID: "1009",
        orderDate: "2023-04-01",
        orderStatus: "confirmed",
        orderTotal: "900.00"
    },{
        orderID: "1010",
        orderDate: "2023-04-01",
        orderStatus: "confirmed",
        orderTotal: "1000.00"
    }];

    const tempUsers = [{
        username: "user1",
        role: "buyer",
    },{
        username: "user2",
        role: "seller",
    },{
        username: "user3",
        role: "buyer",
    },{
        username: "user4",
        role: "seller",
    },{
        username: "user5",
        role: "buyer",
    },{
        username: "user6",
        role: "seller",
    },{
        username: "user7",
        role: "buyer",
    },{
        username: "user8",
        role: "seller",
    },{
        username: "user9",
        role: "buyer",
    },{
        username: "user10",
        role: "seller",
    }];

    const popupBackgroundClasses = "hidden transition-all ease-in fixed left-0 top-0 right-0 z-10 w-full h-full p-4 bg-black bg-opacity-50";

    return (
        <div className="bg-darkbg w-full">
            <Navbar />
            <h1 id="adminBreadCrumb" className="pl-8 italic text-slate-500">Admin Dashboard</h1>
            
            <div className="w-fit m-auto">
                <AdminTopButtons popupBgClasses={popupBackgroundClasses} />
            </div>

            <div className="flex w-full justify-center my-3">
                <div className="mx-2 mb-2 w-8/12 inline-block">
                    <OrderList orders={tempOrders} popupBgClasses={popupBackgroundClasses} />
                </div>
                <div className="mx-2 mb-2 w-3/12 inline-block">
                    <UserList users={tempUsers} />
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default AdminDash;