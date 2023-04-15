const mongoose = require('mongoose');
const axios = require('axios');
const moment = require('moment');

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
    //correctly format the query
    let newQuery = {};

    if(query.dateRange) {
        newQuery = {
            start: moment(query.dateRange.start).startOf('day').toDate(),
            end: moment(query.dateRange.end).endOf('day').toDate()
        }
    } else if(query.createdAt) {
        newQuery = {
            start: moment(query.createdAt).startOf('day').toDate(),
            end: moment(query.createdAt).endOf('day').toDate()
        }
    }

    //call order service
    const queryData = await axios.post('http://order-service:9124/api/orders/query', {query: newQuery});
    
    if(queryData) {
        return queryData.data;
    } else {
        return null;
    }
};

module.exports = {
    getOrderById,
    getOrders,
    updateOrder,
    queryOrders
};