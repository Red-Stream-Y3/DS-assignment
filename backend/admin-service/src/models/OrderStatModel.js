const mongoose = require('mongoose');

const OrderStatSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    stats: {
        pending: {
            type: Number,
            required: true,
        },
        unpaid: {
            type: Number,
            required: true,
        },
        confirmed: {
            type: Number,
            required: true,
        },
        rejected: {
            type: Number,
            required: true,
        },
        delivered: {
            type: Number,
            required: true,
        }
    }
});

const OrderStat = mongoose.model('OrderStat', OrderStatSchema);

module.exports = OrderStat;