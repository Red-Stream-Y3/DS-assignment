import React from "react";
import { FaSpinner } from "react-icons/fa";
import { confirmOrder, getAllOrders, getCommission } from "../../../actions/adminActions";

const ConfirmOrderPopup = (props) => {

    const [commission, setCommission] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    //get commission from database
    React.useEffect(() => {
        getCommission(setCommission);
    }, []);

    //method calculate commission
    const calcCommission = () => {
        let total;
        try{
            total = parseFloat(props.order.totalPrice);
        } catch(e){
            total = 0;
        }
        return total * (commission/100);
    };

    //send confirmation to backend
    const handleConfirm = async () => {
        setLoading(true);
        
        if(!props.order.isPaid){
            props.toast.error("Order is not paid!");
            setLoading(false);
            return;
        }

        const res = await confirmOrder(props.order._id);
        if(res){
            await getAllOrders(props.setOrderList);
            props.handleCancel();
            props.toast.success("Order Confirmed!");
        } else {
            props.toast.error("Something went wrong!");
        }
        setLoading(false);
    };

    return (
        <div className="text-slate-300">
            {props.order === null || props.user === null ? (
                <div className="p-10">
                    <FaSpinner className="animate-spin text-4xl" />
                </div>
            ) : (
                <>
                    <div className="text-center font-bold text-lg">
                        Confirm Order
                        <hr className="opacity-50" />
                    </div>
                    <div className="my-2 text-sm text-center text-slate-400">
                        Note: This action cannot be undone.
                    </div>
                    <table className="text-right">
                        <tbody>
                            <tr className="text-center">
                                <td colSpan={3}>
                                    <div className="my-2 mx-3">
                                        Order ID: {props.order._id}
                                    </div>
                                </td>
                            </tr>
                            <tr className="text-center">
                                <td>
                                    <div className="my-2 mx-3">
                                        Date:{" "}
                                        {props.order.createdAt.split("T")[0]}
                                    </div>
                                </td>
                                <td>
                                    <div className="my-2 mx-3">
                                        Customer: {props.user.name}
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-slate-500 ">
                                <td className="px-3">Product</td>
                                <td className="px-3">Quantity</td>
                                <td className="px-3">Price</td>
                            </tr>
                        </tbody>
                        <tbody className="max-h-96 overflow-y-scroll">
                            {props.order.orderItems.map((item, index) => (
                                <tr key={index} className="border-collapse border-slate-500 border-y-2">
                                    <td className="px-3">{item.name}</td>
                                    <td className="px-3">{item.quantity}</td>
                                    <td className="px-3">{item.price}</td>
                                </tr>
                            ))} 
                        </tbody>
                        <tbody>
                            <tr>
                                <td colSpan={3}>
                                    <div className="h-2"></div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <div className="my-2 mx-3">
                                        Total: ${props.order.totalPrice}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <div className="my-2 mx-3">
                                        Commission: {commission}%
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <hr className="opacity-50" />
                                    <div className="my-2 mx-3">
                                        <div className="font-bold">
                                            Sub Total: $
                                            {parseFloat(
                                                parseFloat(
                                                    props.order.totalPrice
                                                ) + calcCommission()
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-2 flex justify-end">
                        <button
                            id="adminConfirmOrderPopupConfirm"
                            onClick={handleConfirm}
                            className="transition-all mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-2 hover:cursor-pointer">
                            <div>
                                {loading ? (
                                    <FaSpinner className="animate-spin text-2xl" />
                                ) : (
                                    "Confirm"
                                )}
                            </div>
                        </button>
                        <button
                            id="adminConfirmOrderPopupCancel"
                            onClick={props.handleCancel}
                            className="transition-all mt-3 bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded mx-2 hover:cursor-pointer">
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ConfirmOrderPopup;