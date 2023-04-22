import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { getAllUsers, grantAdmin } from "../../../actions/adminActions";

const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const AdminGrantPopup = (props) => {

    const [loading, setLoading] = useState(false);

    const handleAction = async () => {
        setLoading(true);

        if(props.user.name === user.name){
            props.toast.error("You cannot grant or revoke admin access to yourself!");
            setLoading(false);
            return;
        }

        let res;
        if(props.user.isAdmin){
            res = await grantAdmin(props.user, false);
        } else {
            res = await grantAdmin(props.user, true);
        }

        if(res){
            getAllUsers(props.setUserList);
            props.handleCancel();
            props.toast.success("Action Successful!");
        } else {
            props.toast.error("Something went wrong!");
        }
        setLoading(false);
    };

    return (
        <div className="text-slate-300">
            {props.user === null ? (
                <div className="p-10">
                    <FaSpinner className="animate-spin text-4xl" />
                </div>
            ) : (
                <>
                    <div className="text-center font-bold text-lg">
                        Grant Admin Access
                        <hr className="opacity-50" />
                    </div>
                    <div className="my-2 text-sm text-center text-slate-400">
                        Note: User {props.user.name} will be notified of this
                        action.
                    </div>
                    {!props.user.isAdmin && (
                        <>
                            <div className="my-2 text-sm text-center text-slate-400">
                                Note: User {props.user.name} will be granted
                                admin access.
                            </div>
                            <div className="my-2 text-sm text-center text-slate-400">
                                Note: User {props.user.name} will be able to
                                access the admin dashboard.
                            </div>
                        </>
                    )}
                    <button
                        className={
                            "w-full my-2 p-2 text-sm font-bold text-center text-white rounded-md" +
                            (props.user.isAdmin
                                ? " bg-red-500 hover:bg-red-600"
                                : " bg-green-500 hover:bg-green-600")
                        }
                        onClick={handleAction}>
                        {loading ? (
                            <div className="m-auto w-fit">
                                <FaSpinner className="animate-spin" />
                            </div>
                        ) : (
                            <>
                                {props.user.isAdmin
                                    ? "Revoke Admin Access"
                                    : "Grant Admin Access"}
                            </>
                        )}
                    </button>
                    <button
                        className="w-full my-2 p-2 text-sm font-bold text-center text-white bg-slate-500 rounded-md hover:bg-slate-600"
                        onClick={props.handleCancel}>
                        Cancel
                    </button>
                </>
            )}
        </div>
    );
};

export default AdminGrantPopup;