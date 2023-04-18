import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const BarGraph = (props) => {

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
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            }
        }
    });

    const [data, setData] = useState({
        labels: props.labelList || dat.map((item) => item.month),
        datasets: [{
            label: props.lineLabel || "New users",
            data: props.dataSet || dat.map((item) => item.amount),
            backgroundColor: props.backgroundColor || 'rgba(53, 162, 235, 0.5)',
            borderColor: props.borderColor || 'rgb(53, 162, 235)'
        }],
    });

    useEffect(() => {
        setData({
            labels: props.labelList || dat.map((item) => item.month),
            datasets: [{
                label: props.lineLabel || "New users",
                data: props.dataSet || dat.map((item) => item.amount),
                backgroundColor: props.backgroundColor || 'rgba(53, 162, 235, 0.5)',
                borderColor: props.borderColor || 'rgb(53, 162, 235)'
            }],
        });
    }, [props.labelList, props.dataSet]);

    return(
        <div>
            <Bar options={options} data={data} />
        </div>
    );
};

export default BarGraph;