const mongoose = require("mongoose");

const dailyStatsSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    sales: {
        type: Array,
        required: false,
        default: []
    }
});

const monthlyStatsSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    sales: {
        type: Array,
        required: false,
        default: [0,0,0,0,0,0,0,0,0,0,0,0]
    }
});

const yearlyStatsSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    sales: {
        type: Number,
        required: false,
        default: 0
    }
});

const DailySalesStat = mongoose.model("dailyStatistic", dailyStatsSchema);
const MonthlySalesStat = mongoose.model("monthlyStatistic", monthlyStatsSchema);
const YearlySalesStat = mongoose.model("yearlyStatistic", yearlyStatsSchema);

module.exports = {
    DailySalesStat,
    MonthlySalesStat,
    YearlySalesStat
};