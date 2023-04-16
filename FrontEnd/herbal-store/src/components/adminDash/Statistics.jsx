import React, { useEffect, useState } from "react";
import axios from "axios";

import LineChart from "./statistics/LineChart";
import DoughnutGraph from "./statistics/DoughnutGraph";
import BarGraph from "./statistics/BarGraph";
import StatFilter from "./statistics/StatFilter";
import { calculateSales, queryOrderStats } from "../../actions/adminActions";
import SalesStats from "./statistics/SalesStats";
import { FaSpinner } from "react-icons/fa";

const Statistics = (props) => {

    const [filterSelect, setFilterSelect] = useState("daily");

    //calculate stats
    const calculateStats = async () => {
        props.setLoading(true);

        const success = await calculateSales(filterSelect, props.statDateItems);

        if(success) {
            props.toast.success(`${filterSelect} statistics calculated successfully!`);
        } else {
            props.toast.error("Error calculating statistics!");
        }

        props.setLoading(false);
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const temp = [234, 212, 4523, 5323, 234, 235, 254, 234, 2134, 934, 234, 734];

    return (
        <div
            className="p-1 shadow-md text-slate-200 overflow-y-scroll"
            style={{ height: "calc(100vh - 250px)" }}>
            <StatFilter
                filterSelect={filterSelect}
                setFilterSelect={setFilterSelect}
                filterDate={props.statDate}
                calculateStats={calculateStats}
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
                            <LineChart
                                backgroundColor="rgba(53, 162, 235, 0.5)"
                                borderColor="rgb(53, 162, 235)"
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Statistics;