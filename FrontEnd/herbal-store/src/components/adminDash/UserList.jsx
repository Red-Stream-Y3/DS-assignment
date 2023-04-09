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
            <UserFilter 
                search={search}
                setSearch={setSearch} />
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
                            <th scope="col" className={tableHeaderClasses}>Username</th>
                            <th scope="col" className={tableHeaderClasses}>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr 
                                key={user.username} 
                                className="transition-all bg-slate-800 border-b-2 border-slate-600 m-10 hover:bg-slate-700">
                                <td className="px-6 py-4">{user.username}</td>
                                <td className="px-6 py-4">{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;