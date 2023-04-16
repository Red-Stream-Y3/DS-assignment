const {
    DailySalesStat,
    MonthlySalesStat,
    YearlySalesStat,
} = require("../models/SalesStatModel");
const OrderStat = require("../models/OrderStatModel");
const {queryOrders, getOrders} = require("../controllers/OrderServices");

const getDailySalesStats = async (req, res) => {
    const { year, month } = req.params;
    try {
        const stats = await DailySalesStat.find({ year, month });
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const calculateDailySales = async (req, res) => {
    const { year, month } = req.body;

    try {
        const orders = await queryOrders({
            dateRange: {
                start: new Date(year, month - 1, 1),
                end: new Date(year, month, 0),
            },
        });

        let dailySales = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const orderDate = new Date(order.createdAt);
            dailySales[orderDate.getDate() - 1] += order.totalPrice;
        }

        const saveStats = await DailySalesStat.find({ year, month });

        if (saveStats.length > 0) {
            saveStats[0].sales = dailySales;
            await saveStats[0].save();
        } else {
            const stats = new DailySalesStat({
                year,
                month,
                sales: dailySales,
            });
            await stats.save();
        }

        res.json({
            message: "Daily sales calculated successfully",
            dailySales,
        });
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
            monthlySales[orderDate.getMonth()] += order.totalPrice;
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

const calculateYearlySales = async (req, res) => {

    try {
        const orders = await getOrders();

        //calculate sales figures for each year
        let yearlyStats = {};  // {year: totalSales}
        
        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const orderDate = new Date(order.createdAt);
            const year = orderDate.getFullYear();
            if (yearlyStats[year]) {
                yearlyStats[year] += order.totalPrice;
            } else {
                yearlyStats[year] = order.totalPrice;
            }
        }

        //save sales figures to database
        const saveStats = await YearlySalesStat.find();

        if (saveStats.length > 0) { //yearly sales stats already exist in database

            for(let year in yearlyStats) {
                for(let i = 0; i <= saveStats.length; i++){
                    //if year already exists in database, update the sales figure
                    if(saveStats[i].year === year){
                        saveStats[i].sales = yearlyStats[year];
                        await saveStats[i].save();
                        break;
                    }

                    //if year does not exist in database, create a new entry
                    if(i === saveStats.length){
                        const newStat = new YearlySalesStat({
                            year,
                            sales: totalSales,
                        });
                        newStat.save();
                        break;
                    }
                }
            };
            
        } else { //no yearly sales stats in database
            //create new entries for each year
            for(let year in yearlyStats) {
                const newStat = new YearlySalesStat({
                    year,
                    sales: yearlyStats[year],
                });
                newStat.save();
            };
        }

        res.status(200).json({
            message: "Yearly sales calculated successfully",
            yearlyStats,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const calculateOrderStats = async (req, res) => {
    const { year, month } = req.body;

    try {   
        const orders = await queryOrders({
            dateRange: {
                start: new Date(year, month - 1, 1),
                end: new Date(year, month, 0),
            },
        });

        const orderStats = {
            year,
            month,
            stats : {
                pending: 0,
                unpaid: 0,
                confirmed: 0,
                rejected: 0,
                delivered: 0
            }
        };

        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];

            let orderStatus = "unpaid";
            if (order.isPaid) {
                orderStatus = "pending";
            } else if (order.isDelivered) {
                orderStatus = "delivered";
            } else if (order.isConfirmed) {
                orderStatus = "confirmed";
            } else if (order.isRejected) {
                orderStatus = "rejected";
            }

            orderStats.stats[orderStatus] += 1;
        }

        //save stats to database
        const orderStat = await OrderStat.find({ year, month });

        if(orderStat.length > 0) {//if stats already exist in database, update them
            orderStat[0].stats = orderStats.stats;
            await orderStat[0].save();
        } else {//if stats do not exist in database, create new entry
            const newStat = new OrderStat(orderStats);
            await newStat.save();
        }

        res.status(200).json({
            message: "Order stats calculated successfully",
            orderStats,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderStats = async (req, res) => {
    const { year, month } = req.params;

    try {
        const stat = await OrderStat.find({ year, month });
        res.status(200).json(stat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDailySalesStats,
    getMonthlySalesStats,
    getYearlySalesStats,
    calculateYearlySales,
    calculateMonthlySales,
    calculateDailySales,
    getOrderStats,
    calculateOrderStats,
};
