const router = require('express').Router();
const {
    calculateMonthlySales,
    getDailySalesStats,
    getMonthlySalesStats,
    getYearlySalesStats
} = require('../controllers/StatisticServices');

router.route('/sales/monthly').post(calculateMonthlySales);
router.route('/sales/monthly/:year').get(getMonthlySalesStats);

module.exports = router;