import React from "react";
import LineChart from "./LineChart";

const SalesStats = (props) => {
    const { data } = props;
    return (
        <div>
            <LineChart
                title="Sales Statistics"
                labels={data.map((item) => new Date(item.createdAt).getMonth())}
                data={data.map((item) => item.amount)}
                lineLabel={"Sales"}
                backgroundColor="rgba(53, 162, 235, 0.5)"
                borderColor="rgb(53, 162, 235)"
            />
        </div>
    );
};

export default SalesStats;