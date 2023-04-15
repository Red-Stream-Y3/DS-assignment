const {
    DailySalesStat,
    MonthlySalesStat,
    YearlySalesStat,
} = require("../models/SalesStatModel");
const {queryOrders} = require("../controllers/OrderServices");

const getDailySalesStats = async (req, res) => {
    const { year, month } = req.body;
    try {
        const stats = await DailySalesStat.find({ year, month });
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMonthlySalesStats = async (req, res) => {
    const { year } = req.params;
    try {
        const stats = await MonthlySalesStat.find({ year });
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const calculateMonthlySales = async (req, res) => {
    const { year } = req.body;

    try {
        const orders = await queryOrders({
            dateRange: {
                start: new Date(year, 0, 1),
                end: new Date(year, 11, 31),
            },
        });

        const monthlySales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const orderDate = new Date(order.createdAt);
            if (orderDate.getFullYear() === year) {
                monthlySales[orderDate.getMonth()] += order.totalPrice;
            }
        }

        const saveStats = await MonthlySalesStat.find({ year });

        if (saveStats.length > 0) {
            saveStats[0].sales = monthlySales;
            await saveStats[0].save();
        } else {
            const stats = new MonthlySalesStat({
                year,
                sales: monthlySales,
            });
            await stats.save();
        }

        res.json({
            message: "Monthly sales calculated successfully",
            monthlySales,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getYearlySalesStats = async (req, res) => {
    try {
        const stats = await YearlySalesStat.find();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDailySalesStats,
    getMonthlySalesStats,
    getYearlySalesStats,
    calculateMonthlySales,
};
