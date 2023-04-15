import React, { useState } from "react";
import LineChart from "./LineChart";

const SalesStats = (props) => {

    const monthDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    
    return (
        <div>
            {props.filter === "day" && (
                <LineChart
                    title="Daily Sales Statistics"
                    labelList={monthDays}
                    dataSet={props.dailyData}
                    lineLabel={"Sales"}
                    backgroundColor="rgba(53, 162, 235, 0.5)"
                    borderColor="rgb(53, 162, 235)"
                />
            )}
            {props.filter === "month" && (
                <LineChart
                    title="Monthly Sales Statistics"
                    labelList={props.months}
                    dataSet={props.monthlyData}
                    lineLabel={"Sales"}
                    backgroundColor="rgba(53, 162, 235, 0.5)"
                    borderColor="rgb(53, 162, 235)"
                />
            )}
            {props.filter === "year" && (
                <LineChart
                    title="Yearly Sales Statistics"
                    labelList={props.months}
                    dataSet={props.data}
                    lineLabel={"Sales"}
                    backgroundColor="rgba(53, 162, 235, 0.5)"
                    borderColor="rgb(53, 162, 235)"
                />
            )}
        </div>
    );
};

export default SalesStats;