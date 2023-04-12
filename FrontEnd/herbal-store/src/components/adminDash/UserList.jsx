import React, { useState, useEffect } from "react";

import UserFilter from "./UserFilter";

const UserList = (props) => {

    const [users, setUsers] = useState(props.users);
    const [search, setSearch] = useState("");

    //filter users based on search
    //TODO: migrate filter to DB queries
    useEffect(() => {
        if(search===""){
            setUsers(props.users);
        } else {
            setUsers(props.users.filter(user => 
                user.username.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search, props.users]);

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
                                Role
                            </th>
                            <th scope="col" className={tableHeaderClasses}>
                                Priviledges
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="transition-all bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700">
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">
                                    {user.isSeller === true ? "Seller" : null}
                                    {user.isAdmin === true ? "Admin" : null}
                                    {(user.isSeller === false &&
                                        user.isAdmin === false) ? 
                                        "Customer" : null}
                                </td>
                                <td>
                                    {user.isAdmin === true && (
                                        <button className="flex transition-all justify-center w-24 mr-2 px-1 rounded-md bg-slate-600 ring-offset-1 ring-1 hover:bg-slate-500 active:scale-95">
                                            <div className="mr-1">Revoke</div>
                                        </button>
                                    )}
                                    {user.isAdmin === false && (
                                        <button className="flex transition-all justify-center w-24 mr-2 px-1 rounded-md bg-slate-600 ring-offset-1 ring-1 hover:bg-slate-500 active:scale-95">
                                            <div className="mr-1">Grant</div>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;