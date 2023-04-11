import React from "react";

const AdminBreadCrumb = ({ selectedTab, breadcrumbClasses, selectedSubTab }) => {
    return (
        <h1
            id="adminBreadCrumb"
            className="pl-8 italic text-slate-500 my-2 transition-all">
            {selectedTab === "statistics" && (
                <div className="flex">
                    <div className={breadcrumbClasses}>Admin Dashboard</div>
                    <div className="font-black text-slate-300 mx-2">{" > "}</div>
                    <div className={breadcrumbClasses}>Statistics</div> 
                    <div className="font-black text-slate-300 mx-2">{" > "}</div>
                    {selectedSubTab === "sales" && (
                        <div className={breadcrumbClasses}>Sales</div>
                    )}
                    {selectedSubTab === "orders" && (
                        <div className={breadcrumbClasses}>Orders</div>
                    )}
                    {selectedSubTab === "conversion" && (
                        <div className={breadcrumbClasses}>Conversion</div>
                    )}
                    {selectedSubTab === "demographics" && (
                        <div className={breadcrumbClasses}>Demographics</div>
                    )}
                    {selectedSubTab === "products" && (
                        <div className={breadcrumbClasses}>Products</div>
                    )}
                </div>
            )}
            {selectedTab === "orders" && (
                <div className="flex">
                    <div className={breadcrumbClasses}>Admin Dashboard</div>
                    <div className="font-black text-slate-300 mx-2">{" > "}</div>
                    <div className={breadcrumbClasses}>Orders</div>
                </div>
            )}
            {selectedTab === "products" && (
                <div className="flex">
                    <div className={breadcrumbClasses}>Admin Dashboard</div>
                    <div className="font-black text-slate-300 mx-2">{" > "}</div>
                    <div className={breadcrumbClasses}>Products</div>
                </div>
            )}
            {selectedTab === "users" && (
                <div className="flex">
                    <div className={breadcrumbClasses}>Admin Dashboard</div>
                    <div className="font-black text-slate-300 mx-2">{" > "}</div>
                    <div className={breadcrumbClasses}>Users</div>
                </div>
            )}
            {selectedTab === "configurations" && (
                <div className="flex">
                    <div className={breadcrumbClasses}>Admin Dashboard</div>
                    <div className="font-black text-slate-300 mx-2">{" > "}</div>
                    <div className={breadcrumbClasses}>Configurations</div>
                </div>
            )}
        </h1>
    );
};

export default AdminBreadCrumb;