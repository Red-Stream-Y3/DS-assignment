import React, { useEffect, useState } from "react";

import StatFilter from "./statistics/StatFilter";
import { calculateSales, queryOrderStats } from "../../actions/adminActions";
import SalesStats from "./statistics/SalesStats";
import { FaSpinner } from "react-icons/fa";
import OrderStats from "./statistics/OrderStats";

const Statistics = (props) => {

    const [filterSelect, setFilterSelect] = useState("daily");

    //calculate stats
    const calculateStats = async () => {
        props.setLoading(true);

        let success = false;

        if(props.statSelect === "sales"){
            success = await calculateSales(filterSelect, props.statDateItems);

            if(success) {
                props.toast.success(`${filterSelect} statistics calculated successfully!`);
            }
        } else if(props.statSelect === "orders"){
            success = await calculateSales(props.statSelect, props.statDateItems);

            if(success) {
                props.toast.success(`${props.statSelect} statistics calculated successfully!`);
            }

        }

        if(!success) {
            props.toast.error("Error calculating statistics!");
        }

        props.setLoading(false);
    };

    //refresh stats
    const refreshStats = async () => {
        props.setLoading(true);
        
        props.getAllStats().then(() => {
            props.setLoading(false);
        }).catch(() => {
            props.toast.error("Error reloading statistics!");
            props.setLoading(false);
        });
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const temp = [234, 212, 4523, 5323, 234, 235, 254, 234, 2134, 934, 234, 734];

    return (
        <div
            className="p-1 shadow-md text-slate-200 overflow-y-scroll"
            style={{ height: "calc(100vh - 250px)" }}>
            <StatFilter
                filterSelect={filterSelect}
                statSelect={props.statSelect}
                setFilterSelect={setFilterSelect}
                filterDate={props.statDate}
                calculateStats={calculateStats}
                refreshStats={refreshStats}
                setFilterDate={props.setStatDate}
                filterButtonClasses={props.filterButtonClasses}
            />

            <div className="m-auto" style={{ width: 900, height: 500 }}>
                {props.loading ? (
                    <div className="mt-32">
                        <FaSpinner className="animate-spin m-auto" size={50} />
                    </div>
                ) : (
                    <>
                        {props.statSelect === "sales" && (
                            <SalesStats
                                dailyData={props.statData.sales.daily}
                                monthlyData={props.statData.sales.monthly}
                                yearlyData={props.statData.sales.yearly}
                                statDateItems={props.statDateItems}
                                months={months}
                                filter={filterSelect}
                            />
                        )}
                        {props.statSelect === "orders" && (
                            <OrderStats
                                monthlyData={props.statData.orders.monthly}
                                 />
                            
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Statistics;