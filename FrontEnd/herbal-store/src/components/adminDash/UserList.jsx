import React, { useState, useEffect } from "react";

import UserFilter from "./UserFilter";
import AdminGrantPopup from "./popups/AdminGrantPopup";
import { elements } from "chart.js";
import { getUserById } from "../../actions/adminActions";

const UserList = (props) => {

    const [users, setUsers] = useState(props.users);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    //filter users based on search
    //TODO: migrate filter to DB queries
    useEffect(() => {
        if(search===""){
            setUsers(props.users);
        } else {
            setUsers(props.users.filter(user => 
                user.name.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search, props.users]);

    const handleButtonClick = async (e, index) => {
        const element = document.getElementById("adminUserPriviledgePopupBackground");
        element.classList.remove("hidden");

        await getUserById(users[index]._id, setSelectedUser);
    };

    const handlePopupCancel = () => {
        const element = document.getElementById("adminUserPriviledgePopupBackground");
        element.classList.add("hidden");

        setSelectedUser(null);
    };

    const tableHeaderClasses = props.tableHeader;

    return (
        <div className="p-1 shadow-md text-white">
            <UserFilter search={search} setSearch={setSearch} />
            <div
                className="overflow-x-auto"
                style={{
                    maxHeight: "30rem",
                    minHeight: "20rem",
                }}>
                <table className="w-full border-collapse text-left text-grey-400">
                    <thead>
                        <tr>
                            <th scope="col" className={tableHeaderClasses}>
                                Username
                            </th>
                            <th scope="col" className={tableHeaderClasses}>
                                Email
                            </th>
                            <th scope="col" className={tableHeaderClasses}>
                                Role
                            </th>
                            <th scope="col" className={tableHeaderClasses}>
                                Priviledges
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className="transition-all bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700">
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    {user.isSeller === true && (
                                        <div className="mx-1 inline">Seller</div>
                                    )}
                                    {user.isAdmin === true && (
                                        <div className="mx-1 inline">[Admin]</div>
                                    )}
                                    {user.isSeller === false &&
                                        user.isAdmin === false && (
                                            <div className="mx-1 inline">Customer</div>
                                        )}
                                </td>
                                <td>
                                    {user.isAdmin === true && (
                                        <button
                                            className="flex transition-all justify-center w-24 mr-2 px-1 rounded-md bg-slate-600 ring-offset-1 ring-1 hover:bg-slate-500 active:scale-95"
                                            onClick={(e) =>
                                                handleButtonClick(e, index)
                                            }>
                                            <div className="mr-1">Revoke</div>
                                        </button>
                                    )}
                                    {user.isAdmin === false && (
                                        <button
                                            className="flex transition-all justify-center w-24 mr-2 px-1 rounded-md bg-slate-600 ring-offset-1 ring-1 hover:bg-slate-500 active:scale-95"
                                            onClick={(e) =>
                                                handleButtonClick(e, index)
                                            }>
                                            <div className="mr-1">Grant</div>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div
                id="adminUserPriviledgePopupBackground"
                className={props.popupBgClasses}
                onClick={({ target }) => {
                    if (
                        target.closest("#adminUserPriviledgePopupContent") ===
                        null
                    ) {
                        handlePopupCancel();
                    }
                }}
                style={{
                    backdropFilter: "blur(5px)",
                }}>
                <div
                    id="adminUserPriviledgePopupContent"
                    className="bg-slate-700 w-fit z-20 translate-y-2/3 p-6 m-auto rounded-md">
                    <AdminGrantPopup
                        user={selectedUser}
                        handleCancel={handlePopupCancel}
                        setUserList={props.setUserList}
                        toast={props.toast}
                    />
                </div>
            </div>
        </div>
    );
}

export default UserList;