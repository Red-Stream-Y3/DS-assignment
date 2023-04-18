import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutGraph = (props) => {

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
        labels: props.labels || dat.map((item) => item.month),
        datasets: [{
            label: props.lineLabel || "New users",
            data: props.dataSet || dat.map((item) => item.amount),
            backgroundColor: props.backgroundColor || [
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
            borderColor: props.borderColor || [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
            borderWidth: 1
        }],
    });

    useEffect(() => {
        setData({
            labels: props.labelList || dat.map((item) => item.month),
            datasets: [{
                label: props.lineLabel || "New users",
                data: props.dataSet || dat.map((item) => item.amount),
                backgroundColor: props.backgroundColor || [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                borderColor: props.borderColor || [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                borderWidth: 1
            }],
        });
    }, [props.dataSet, props.labelList]);

    return(
        <div className="m-auto" style={{height: 500, width:400}}>
            <Doughnut options={options} data={data} />
        </div>
    );
};

export default DoughnutGraph;