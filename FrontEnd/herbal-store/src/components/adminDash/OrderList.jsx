import React, { useEffect, useState } from "react";

import OrderFilter from "./OrderFilter";

const OrderList = (props) => {

    const [orders, setOrders] = useState(props.orders);
    const [orderFilter, setOrderFilter] = useState("all");
    const [filterDate, setFilterDate] = useState("");

    //filter orders based on orderFilter
    useEffect(() => {
        if(orderFilter==="all"){
            setOrders(props.orders);
        } else if(orderFilter==="pending"){
            setOrders(props.orders.filter(order => order.orderStatus==="pending"));
        } else if(orderFilter==="confirmed"){
            setOrders(props.orders.filter(order => order.orderStatus==="confirmed"));
        } else if(orderFilter==="rejected"){
            setOrders(props.orders.filter(order => order.orderStatus==="rejected"));
        }
    }, [orderFilter, props.orders]);

    //filter orders based on date
    useEffect(() => {
        if(filterDate===""){
            setOrders(props.orders);
        } else {
            setOrders(props.orders.filter(order => order.orderDate===filterDate));
        }
    }, [filterDate, props.orders]);

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
                    <thead className="text-sm uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Order Date</th>
                            <th scope="col" className="px-6 py-3">Order ID</th>
                            <th scope="col" className="px-6 py-3">Order Total</th>
                            <th scope="col" className="px-6 py-3">Order Status</th>
                            <th scope="col" className="px-6 py-3">Confirmation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr 
                                key={order.orderID} 
                                className="bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700">
                                <td className="px-6 py-4">{order.orderDate}</td>
                                <td className="px-6 py-4">{order.orderID}</td>
                                <td className="px-6 py-4">${order.orderTotal}</td>
                                <td className="px-6 py-4">
                                    {order.orderStatus==="confirmed" ? <div className="text-primarylight">confirmed</div> : null}
                                    {order.orderStatus==="rejected" ? <div className="text-red-500">rejected</div> : null}
                                    {order.orderStatus==="pending" ? <div>pending</div> : null}
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        order.orderStatus==="pending" ?
                                        <>
                                            <button className="w-20 mr-2 px-1  rounded-md bg-slate-600 ring-offset-1 ring-1 hover:bg-slate-500 active:scale-95">
                                                confirm
                                            </button>
                                            <button className="w-20 ml-2 px-1 rounded-md bg-slate-400 ring-offset-1 ring-1 hover:bg-slate-500 active:scale-95">
                                                reject
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
        </div>
    );
}

export default OrderList;