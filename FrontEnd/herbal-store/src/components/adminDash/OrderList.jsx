import React, { useEffect, useState } from "react";

import OrderFilter from "./OrderFilter";
import ConfirmOrderPopup from "./popups/ConfirmOrderPopup";
import RejectOrderPopup from "./popups/RejectOrderPopup";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import { getOrderById, getUserById } from "../../actions/adminActions";

const OrderList = (props) => {

    const [orders, setOrders] = useState(props.orders);
    const [orderFilter, setOrderFilter] = useState("all");
    const [filterDate, setFilterDate] = useState("");
    const [selectOrder, setSelectOrder] = useState(null);
    const [selectOrderUser, setSelectOrderUser] = useState(null);

    //filter orders based on orderFilter and date
    //TODO: migrate filters to DB queries
    useEffect(() => {

        if (filterDate === "") {
            //if date is not selected
            if (orderFilter === "all") {
                //if all is selected
                setOrders(props.orders);
            } else if (orderFilter === "unpaid") {
                setOrders(
                    props.orders.filter(
                        (order) => !order.isPaid
                    )
                );
            } else if (orderFilter === "pending") {
                setOrders(
                    props.orders.filter(
                        (order) =>
                            order.isPaid &&
                            !order.isConfirmed &&
                            !order.isRejected
                    )
                );
            } else if (orderFilter === "confirmed") {
                setOrders(
                    props.orders.filter(
                        (order) =>
                            order.isConfirmed &&
                            !order.isRejected &&
                            !order.isDelivered
                    )
                );
            } else if (orderFilter === "delivered") {
                setOrders(
                    props.orders.filter(
                        (order) =>
                            !order.isRejected &&
                            order.isDelivered
                    )
                );
            } else if (orderFilter === "rejected") {
                setOrders(props.orders.filter((order) => order.isRejected));
            }
        } else {
            //if date is selected
            if (orderFilter === "all") {
                //if all is selected
                setOrders(
                    props.orders.filter(
                        (order) => order.createdAt.split("T")[0] === filterDate
                    )
                );
            } else if (orderFilter === "unpaid") {
                setOrders(
                    props.orders.filter(
                        (order) =>
                            !order.isPaid &&
                            order.createdAt.split("T")[0] === filterDate
                    )
                );
            } else if (orderFilter === "pending") {
                setOrders(
                    props.orders.filter(
                        (order) =>
                            order.isPaid &&
                            !order.isConfirmed &&
                            !order.isRejected &&
                            order.createdAt.split("T")[0] === filterDate
                    )
                );
            } else if (orderFilter === "confirmed") {
                setOrders(
                    props.orders.filter(
                        (order) =>
                            order.isConfirmed &&
                            order.createdAt.split("T")[0] === filterDate
                    )
                );
            } else if (orderFilter === "delivered") {
                setOrders(
                    props.orders.filter(
                        (order) =>
                            !order.isRejected &&
                            order.isDelivered &&
                            order.createdAt.split("T")[0] === filterDate
                    )
                );
            } else if (orderFilter === "rejected") {
                setOrders(
                    props.orders.filter(
                        (order) =>
                            order.isRejected &&
                            order.createdAt.split("T")[0] === filterDate
                    )
                );
            }
        }

    }, [orderFilter, filterDate, props.orders]);

    //unhide popup when confirm button is clicked
    const handleConfirmOrderClick = async (e, index) => {
        const element = document.getElementById("adminConfirmOrderPopup");

        //reveal popup
        element.classList.remove("hidden");

        //get selected order and user
        await getOrderById(orders[index]._id, setSelectOrder);
        await getUserById(orders[index].user, setSelectOrderUser);

    }

    //hide popup when clicked outside of popup content or cancel button
    const handleConfirmOrderCancel = (e) => {
        const element = document.getElementById("adminConfirmOrderPopup");
        element.classList.add("hidden");

        //clear selected order and user
        setSelectOrder(null);
        setSelectOrderUser(null);
    }

    //unhide popup when reject button is clicked
    const handleRejectOrderClick = async (e, index) => {
        const element = document.getElementById("adminRejectOrderPopup");
        element.classList.remove("hidden");

        //get selected order and user
        await getOrderById(orders[index]._id, setSelectOrder);
        await getUserById(orders[index].user, setSelectOrderUser);
    }

    //hide popup when clicked outside of popup content or cancel button
    const handleRejectOrderCancel = (e) => {
        const element = document.getElementById("adminRejectOrderPopup");
        element.classList.add("hidden");

        //clear selected order and user
        setSelectOrder(null);
        setSelectOrderUser(null);
    }

    const tableHeaderClasses = props.tableHeader;

    return (
        <div className="p-1 shadow-md text-white">
            <OrderFilter
                setOrderFilter={setOrderFilter}
                filterButtonClasses={props.filterButtonClasses}
                orderFilter={orderFilter}
                date={filterDate}
                setDate={setFilterDate}
            />
            <div
                className="overflow-x-auto"
                style={{
                    maxHeight: "30rem",
                    minHeight: "20rem",
                }}>
                <table className="w-full border-collapse text-left text-grey-400">
                    <thead>
                        <tr>
                            <th className={tableHeaderClasses}>Order Date</th>
                            <th className={tableHeaderClasses}>User</th>
                            <th className={tableHeaderClasses}>Order Total</th>
                            <th className={tableHeaderClasses}>Order Status</th>
                            <th className={tableHeaderClasses}>Confirmation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={order._id}
                                className="transition-all bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700">
                                <td className="px-6 py-4">
                                    {order.createdAt.split("T")[0]}
                                </td>
                                <td className="px-6 py-4">{order.user.email}</td>
                                <td className="px-6 py-4">
                                    ${order.totalPrice}
                                </td>
                                <td className="px-6 py-4">
                                    {order.isConfirmed && !order.isDelivered && !order.isRejected ? (
                                        <div className="text-primarylight">
                                            confirmed
                                        </div>
                                    ) : null}
                                    {order.isRejected ? (
                                        <div className="text-red-500">
                                            rejected
                                        </div>
                                    ) : null}
                                    {order.isPaid &&
                                    !order.isConfirmed &&
                                    !order.isRejected ? (
                                        <div className="text-xs">pending confirmation</div>
                                    ) : null}
                                    {!order.isPaid && !order.isRejected ? (
                                        <div className="italic text-slate-500">
                                            unpaid
                                        </div>
                                    ) : null}
                                    {order.isDelivered && !order.isRejected ? (
                                        <div className="text-green-700">
                                            delivered
                                        </div>
                                    ) : null}
                                </td>
                                <td className="px-6 py-4 flex">
                                    {!order.isConfirmed && !order.isRejected ? (
                                        <>
                                            <button
                                                onClick={(e) =>
                                                    handleConfirmOrderClick(
                                                        e,
                                                        index
                                                    )
                                                }
                                                className="flex transition-all justify-center w-24 mr-2 px-1 rounded-md bg-slate-600 ring-offset-1 ring-1 hover:bg-slate-500 active:scale-95">
                                                <AiOutlineCheck className="m-1" />
                                                <div className="mr-1">
                                                    Confirm
                                                </div>
                                            </button>
                                            <button
                                                onClick={(e) =>
                                                    handleRejectOrderClick(
                                                        e,
                                                        index
                                                    )
                                                }
                                                className="flex transition-all justify-center w-24 ml-2 px-1 rounded-md bg-slate-400 ring-offset-1 ring-1 hover:bg-slate-500 active:scale-95">
                                                <AiOutlineClose className="m-1" />
                                                <div className="mr-2">
                                                    Reject
                                                </div>
                                            </button>
                                        </>
                                    ) : (
                                        <div className="italic text-slate-500">
                                            {order.isConfirmed &&
                                                `Confirmed ${
                                                    order.confirmedAt !==
                                                    undefined
                                                        ? `on ${
                                                              order.confirmedAt.split(
                                                                  "T"
                                                              )[0]
                                                          }`
                                                        : ""
                                                }`}
                                            {order.isRejected &&
                                                `Rejected ${
                                                    order.rejectedAt !==
                                                    undefined
                                                        ? `on ${
                                                              order.rejectedAt.split(
                                                                  "T"
                                                              )[0]
                                                          }`
                                                        : ""
                                                }`}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div
                id="adminConfirmOrderPopup"
                onClick={({ target }) => {
                    if (
                        target.closest("#adminConfirmOrderPopupContent") ===
                        null
                    ) {
                        handleConfirmOrderCancel();
                    }
                }}
                className={props.popupBgClasses}
                style={{
                    backdropFilter: "blur(5px)",
                }}>
                <div
                    id="adminConfirmOrderPopupContent"
                    className="bg-slate-700 w-fit z-20 translate-y-1/3 p-6 m-auto rounded-md">
                    <ConfirmOrderPopup
                        handleCancel={handleConfirmOrderCancel}
                        setOrderList={props.setOrderList}
                        order={selectOrder}
                        user={selectOrderUser}
                        toast={props.toast}
                    />
                </div>
            </div>
            <div
                id="adminRejectOrderPopup"
                onClick={({ target }) => {
                    if (
                        target.closest("#adminRejectOrderPopupContent") === null
                    ) {
                        handleRejectOrderCancel();
                    }
                }}
                className={props.popupBgClasses}>
                <div
                    id="adminRejectOrderPopupContent"
                    className="bg-slate-700 w-fit z-20 translate-y-1/3 p-6 m-auto rounded-md">
                    <RejectOrderPopup
                        handleCancel={handleRejectOrderCancel}
                        setOrderList={props.setOrderList}
                        order={selectOrder}
                        user={selectOrderUser}
                        toast={props.toast}
                    />
                </div>
            </div>
        </div>
    );
}

export default OrderList;