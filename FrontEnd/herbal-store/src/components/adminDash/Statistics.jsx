import React, { useEffect, useState } from "react";
import axios from "axios";

import LineChart from "./statistics/LineChart";
import DoughnutGraph from "./statistics/DoughnutGraph";
import BarGraph from "./statistics/BarGraph";
import StatFilter from "./statistics/StatFilter";
import { queryOrderStats } from "../../actions/adminActions";
import SalesStats from "./statistics/SalesStats";

const Statistics = (props) => {

    const [filterSelect, setFilterSelect] = useState("day");
    const [loading, setLoading] = useState(false);

    //calculate stats
    const calculateStats = async () => {
        setLoading(true);

        const res = await axios.post("http://localhost:9122/v1/sales/monthly", {year: props.dateItems.year});

        if(res.status === 200) {
            props.toast.success("Statistics calculated successfully!");
        } else {
            props.toast.error("Error calculating statistics!");
        }

        setLoading(false);
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
                filterButtonClasses={props.filterButtonClasses} />

            <div className="m-auto" style={{ width: 900, height: 500 }}>
                {props.statSelect === "sales" && (
                    <SalesStats 
                        dailyData={props.statData.sales.daily}
                        monthlyData={props.statData.sales.monthly}
                        statDateItems={props.statDateItems}
                        months={months}
                        filter={filterSelect} />
                )}
                {props.statSelect === "orders" && (
                    <LineChart
                        backgroundColor="rgba(53, 162, 235, 0.5)"
                        borderColor="rgb(53, 162, 235)"
                    />
                )}
                {props.statSelect === "demographics" && (
                    <DoughnutGraph />
                )}
                {props.statSelect === "products" && (
                    <BarGraph
                        backgroundColor="rgba(53, 162, 235, 0.5)"
                        borderColor="rgb(53, 162, 235)"
                    />
                )}
            </div>
        </div>
    );
};

export default Statistics;