import React from "react";

import DoughnutGraph from "./DoughnutGraph";
import { FaSpinner } from "react-icons/fa";

const OrderStats = ({monthlyData}) => {
    const monthNames = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }

    return (
        <div>
            {monthlyData !== null && monthlyData !== undefined ? (
                <DoughnutGraph
                    title={`${monthlyData.year} - ${
                        monthNames[monthlyData.month]
                    } Orders`}
                    labelList={[
                        "Confirmed",
                        "Pending",
                        "Rejected",
                        "Delivered",
                        "Unpaid",
                    ]}
                    dataSet={[
                        monthlyData.stats.confirmed,
                        monthlyData.stats.pending,
                        monthlyData.stats.rejected,
                        monthlyData.stats.delivered,
                        monthlyData.stats.unpaid,
                    ]}
                    lineLabel={"No. of Orders"}
                />
            ) : (
                <FaSpinner className="animate-spin" />
            )}
        </div>
    );
};

export default OrderStats;