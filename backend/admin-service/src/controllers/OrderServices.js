const mongoose = require('mongoose');
const axios = require('axios');

const getOrderById = async (id) => {};

const getOrders = async () => {

    //list of dummy data
    const tempOrders = [{
        orderID: "1001",
        orderDate: "2023-03-31",
        orderStatus: "pending",
        orderTotal: "100.00"
    },{
        orderID: "1002",
        orderDate: "2023-03-31",
        orderStatus: "pending",
        orderTotal: "200.00"
    },{
        orderID: "1003",
        orderDate: "2023-03-31",
        orderStatus: "pending",
        orderTotal: "300.00"
    },{
        orderID: "1004",
        orderDate: "2023-04-01",
        orderStatus: "pending",
        orderTotal: "400.00"
    },{
        orderID: "1005",
        orderDate: "2023-04-01",
        orderStatus: "rejected",
        orderTotal: "500.00"
    },{
        orderID: "1006",
        orderDate: "2023-04-01",
        orderStatus: "confirmed",
        orderTotal: "600.00"
    },{
        orderID: "1007",
        orderDate: "2023-04-01",
        orderStatus: "confirmed",
        orderTotal: "700.00"
    },{
        orderID: "1008",
        orderDate: "2023-04-01",
        orderStatus: "confirmed",
        orderTotal: "800.00"
    },{
        orderID: "1009",
        orderDate: "2023-04-01",
        orderStatus: "confirmed",
        orderTotal: "900.00"
    },{
        orderID: "1010",
        orderDate: "2023-04-01",
        orderStatus: "confirmed",
        orderTotal: "1000.00"
    }];

    //async function to get data from DB
    // const orders = await Order.find();

    return tempOrders;

};

const updateOrder = async (order) => {};

const queryOrders = async (query) => {
    //call order service
    const queryData = await 
};

module.exports = {
    getOrderById,
    getOrders,
    updateOrder
};