import React from "react";

import LineChart from "./statistics/LineChart";

const Statistics = (props) => {
    return (
        <div 
            className="p-1 shadow-md text-slate-200 overflow-y-scroll"
            style={{ height: "calc(100vh - 250px)" }} >
            Statistics
            <div className="m-auto" style={{width: 900, height: 500}}>
                <LineChart backgroundColor="rgba(53, 162, 235, 0.5)" borderColor="rgb(53, 162, 235)"  />
            </div>
            <div>
                Orders [daily, mothly, yearly] - line
                <LineChart backgroundColor="rgba(53, 162, 235, 0.5)" borderColor="rgb(53, 162, 235)" />
            </div>
            <div>
                Conversion rates (orders / visitors) - line
                <LineChart backgroundColor="rgba(53, 162, 235, 0.5)" borderColor="rgb(53, 162, 235)"  />
            </div>
            <div>
                Customer demographics - pie/donut
            </div>
            <div>
                Product performance - bar
            </div>
        </div>
    );
};

export default Statistics;