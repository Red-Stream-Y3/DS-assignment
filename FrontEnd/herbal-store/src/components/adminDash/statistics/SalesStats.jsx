import React, { useState } from "react";
import LineChart from "./LineChart";
import BarGraph from "./BarGraph";

const SalesStats = (props) => {

    const monthDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    
    return (
        <div>
            {props.filter === "daily" && (
                <LineChart
                    title="Daily Sales Statistics"
                    labelList={monthDays}
                    dataSet={props.dailyData}
                    lineLabel={"Sales"}
                    backgroundColor="rgba(53, 162, 235, 0.5)"
                    borderColor="rgb(53, 162, 235)"
                />
            )}
            {props.filter === "monthly" && (
                <LineChart
                    title="Monthly Sales Statistics"
                    labelList={props.months}
                    dataSet={props.monthlyData}
                    lineLabel={"Sales"}
                    backgroundColor="rgba(53, 162, 235, 0.5)"
                    borderColor="rgb(53, 162, 235)"
                />
            )}
            {props.filter === "yearly" && (
                <BarGraph
                    title="Yearly Sales Statistics"
                    labelList={props.yearlyData.map((item) => item.year)}
                    dataSet={props.yearlyData.map((item) => item.sales)}
                    lineLabel={"Sales"}
                    backgroundColor="rgba(53, 162, 235, 0.5)"
                    borderColor="rgb(53, 162, 235)"
                />
            )}
        </div>
    );
};

export default SalesStats;