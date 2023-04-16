const mongoose = require('mongoose');
const axios = require('axios');
const moment = require('moment');

const getOrderById = async (id) => {};

const getOrders = async (req, res) => {

    //call order service
    const orders = await axios.get('http://order-service:9124/api/orders');

    if(!orders) {
        res.status(400).json({msg: 'No orders found'});
    } else {
        res.status(200).json(orders);
    }

};

const updateOrder = async (order) => {};

const queryOrders = async (req, res) => {
    const { query } = req.body;

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
        res.status(200).json(queryData);
    } else {
        res.status(404);
        throw new Error('No orders found');
    }
};

module.exports = {
    getOrderById,
    getOrders,
    updateOrder,
    queryOrders
};