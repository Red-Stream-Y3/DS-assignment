import React, { useEffect, useState } from "react";

import LineChart from "./statistics/LineChart";
import DoughnutGraph from "./statistics/DoughnutGraph";
import BarGraph from "./statistics/BarGraph";
import StatFilter from "./statistics/StatFilter";
import { getOrderStats } from "../../actions/adminActions";
import SalesStats from "./statistics/SalesStats";

const Statistics = (props) => {

    const [filteredData, setFilteredData] = useState([]);
    const [filterSelect, setFilterSelect] = useState("day");
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split("T")[0]);

    //get stats when date is selected
    useEffect(() => {
        if (filterDate !== "") {
            //get stats from backend
            getOrderStats({createdAt: filterDate}, setFilteredData);
        }
    }, [filterDate]);

    return (
        <div
            className="p-1 shadow-md text-slate-200 overflow-y-scroll"
            style={{ height: "calc(100vh - 250px)" }}>

            <StatFilter
                filterSelect={filterSelect}
                setFilterSelect={setFilterSelect}
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                filterButtonClasses={props.filterButtonClasses} />

            <div className="m-auto" style={{ width: 900, height: 500 }}>
                {props.statSelect === "sales" && (
                    <SalesStats 
                        data={filteredData}
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