import React, { useState } from "react";

import LineChart from "./statistics/LineChart";
import DoughnutGraph from "./statistics/DoughnutGraph";
import BarGraph from "./statistics/BarGraph";

const Statistics = ({statSelect}) => {

    return (
        <div
            className="p-1 shadow-md text-slate-200 overflow-y-scroll"
            style={{ height: "calc(100vh - 250px)" }}>
            Statistics
            <div className="m-auto" style={{ width: 900, height: 500 }}>
                {statSelect === "sales" && (
                    <LineChart
                        backgroundColor="rgba(53, 162, 235, 0.5)"
                        borderColor="rgb(53, 162, 235)"
                    />
                )}
                {statSelect === "orders" && (
                    <LineChart
                        backgroundColor="rgba(53, 162, 235, 0.5)"
                        borderColor="rgb(53, 162, 235)"
                    />
                )}
                {statSelect === "conversion" && (
                    <LineChart
                        backgroundColor="rgba(53, 162, 235, 0.5)"
                        borderColor="rgb(53, 162, 235)"
                    />
                )}
                {statSelect === "demographics" && (
                    <DoughnutGraph />
                )}
                {statSelect === "products" && (
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