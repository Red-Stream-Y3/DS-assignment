import React, { useEffect, useState } from "react";

import OrderFilter from "./OrderFilter";
import ConfirmOrderPopup from "./ConfirmOrderPopup";
import RejectOrderPopup from "./RejectOrderPopup";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const OrderList = (props) => {

    const [orders, setOrders] = useState(props.orders);
    const [orderFilter, setOrderFilter] = useState("all");
    const [filterDate, setFilterDate] = useState("");

    //filter orders based on orderFilter and date
    useEffect(() => {

        if(filterDate===""){ //if date is not selected
            if(orderFilter==="all"){//if all is selected
                setOrders(props.orders);
            } else {
                setOrders(props.orders.filter(order => order.orderStatus===orderFilter));
            }
        } else {//if date is selected
                if(orderFilter==="all"){//if all is selected
                    setOrders(props.orders.filter(order => order.orderDate===filterDate));
                } else {
                    setOrders(props.orders.filter(order => order.orderStatus===orderFilter && order.orderDate===filterDate));
                }
        }

    }, [orderFilter, filterDate, props.orders]);

    //unhide popup when confirm button is clicked
    const handleConfirmOrderClick = () => {
        const element = document.getElementById("adminConfirmOrderPopup");
        element.classList.remove("hidden");
    }

    //hide popup when clicked outside of popup content or cancel button
    const handleConfirmOrderCancel = (e) => {
        const element = document.getElementById("adminConfirmOrderPopup");
        const closest = e.target.closest("#adminConfirmOrderPopupContent");

        if(!closest || e.target.id === "adminConfirmOrderPopupCancel"){
            element.classList.add("hidden");
        }
    }

    //unhide popup when reject button is clicked
    const handleRejectOrderClick = () => {
        const element = document.getElementById("adminRejectOrderPopup");
        element.classList.remove("hidden");
    }

    //hide popup when clicked outside of popup content or cancel button
    const handleRejectOrderCancel = (e) => {
        const element = document.getElementById("adminRejectOrderPopup");
        const closest = e.target.closest("#adminRejectOrderPopupContent");

        if(!closest || e.target.id === "AdminRejectOrderPopupCancel"){
            element.classList.add("hidden");
        }
    }

    const tableHeaderClasses = props.tableHeader;

    return (
        <div className="p-1 shadow-md text-white">
            <OrderFilter 
                setOrderFilter={setOrderFilter}
                orderFilter={orderFilter}
                date={filterDate}
                setDate={setFilterDate} />
            <div 
                className="overflow-x-auto" 
                style={{
                    maxHeight: "30rem", 
                    minHeight: "20rem",
                    }}>
                <table
                    className="w-full border-collapse text-left text-grey-400">
                    <thead>
                        <tr>
                            <th className={tableHeaderClasses}>Order Date</th>
                            <th className={tableHeaderClasses}>Order ID</th>
                            <th className={tableHeaderClasses}>Order Total</th>
                            <th className={tableHeaderClasses}>Order Status</th>
                            <th className={tableHeaderClasses}>Confirmation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr 
                                key={order.orderID} 
                                className="transition-all bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700">
                                <td className="px-6 py-4">{order.orderDate}</td>
                                <td className="px-6 py-4">{order.orderID}</td>
                                <td className="px-6 py-4">${order.orderTotal}</td>
                                <td className="px-6 py-4">
                                    {order.orderStatus==="confirmed" ? <div className="text-primarylight">confirmed</div> : null}
                                    {order.orderStatus==="rejected" ? <div className="text-red-500">rejected</div> : null}
                                    {order.orderStatus==="pending" ? <div>pending</div> : null}
                                </td>
                                <td className="px-6 py-4 flex">
                                    {
                                        order.orderStatus==="pending" ?
                                        <>
                                            <button 
                                                onClick={handleConfirmOrderClick}
                                                className="flex transition-all justify-center w-24 mr-2 px-1 rounded-md bg-slate-600 ring-offset-1 ring-1 hover:bg-slate-500 active:scale-95">
                                                <AiOutlineCheck className="m-1" />
                                                <div className="mr-1">confirm</div>
                                            </button>
                                            <button 
                                                onClick={handleRejectOrderClick}
                                                className="flex transition-all justify-center w-24 ml-2 px-1 rounded-md bg-slate-400 ring-offset-1 ring-1 hover:bg-slate-500 active:scale-95">
                                                <AiOutlineClose className="m-1" />
                                                <div className="mr-2">reject</div>
                                            </button>
                                        </>
                                        : <div className="italic text-slate-500">completed</div>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div
                id="adminConfirmOrderPopup"
                onClick={handleConfirmOrderCancel}
                className={props.popupBgClasses} >
                <div
                    id="adminConfirmOrderPopupContent" 
                    className="bg-slate-700 w-fit z-20 translate-y-2/3 p-6 m-auto rounded-md">
                    <ConfirmOrderPopup 
                        handleCancel={handleConfirmOrderCancel}
                        orderID={"1001"}
                        customer={"user1"}
                        date={"2021-05-01"}
                        seller={"seller1"}
                        total={100}
                        toast={props.toast} />
                </div>
            </div>
            <div
                id="adminRejectOrderPopup"
                onClick={handleRejectOrderCancel}
                className={props.popupBgClasses} >
                <div
                    id="adminRejectOrderPopupContent" 
                    className="bg-slate-700 w-fit z-20 translate-y-2/3 p-6 m-auto rounded-md">
                    <RejectOrderPopup 
                        handleCancel={handleRejectOrderCancel}
                        orderID={"1001"}
                        customer={"user1"}
                        toast={props.toast} />
                </div>
            </div>
        </div>
    );
}

export default OrderList;