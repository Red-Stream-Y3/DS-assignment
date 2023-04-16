const mongoose = require('mongoose');
const axios = require('axios');
const moment = require('moment');

const getOrderById = async (id) => {};

const getOrders = async () => {

    //call order service
    const orders = await axios.get('http://order-service:9124/api/orders');

    if(orders) {
        return orders.data;
    } else {
        return null;
    }

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