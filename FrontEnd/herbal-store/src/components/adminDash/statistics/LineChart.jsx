import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const LineChart = (props) => {

    //dummy data
    const dat = [
        {
            month: 'january',
            amount: 300
        },{
            month: 'february',
            amount: 100
        },{
            month: 'march',
            amount: 600
        },{
            month: 'april',
            amount: 269
        },{
            month: 'may',
            amount: 4
        },

    ];

    const [options, setOptions] = useState({
        resposive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: props.title || "New Users Per Month"
            }
        }
    });

    const [data, setData] = useState({
        labels: props.labelList || dat.map((item) => item.month),
        datasets: [{
            label: props.lineLabel  || "New users",
            data: props.dataSet || dat.map((item) => item.amount),
            backgroundColor: props.backgroundColor || 'rgba(53, 162, 235, 0.5)',
            borderColor: props.borderColor || 'rgb(53, 162, 235)'
        }],
    });

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );
};

export default LineChart;