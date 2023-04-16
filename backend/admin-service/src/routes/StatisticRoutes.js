const router = require('express').Router();
const {
    calculateDailySales,
    calculateMonthlySales,
    calculateYearlySales,
    getDailySalesStats,
    getMonthlySalesStats,
    getYearlySalesStats,
    getOrderStats,
    calculateOrderStats,
} = require('../controllers/StatisticServices');

router.route('/sales/daily/:year/:month').get(getDailySalesStats);
router.route('/sales/daily').post(calculateDailySales);

router.route('/sales/monthly').post(calculateMonthlySales);
router.route('/sales/monthly/:year').get(getMonthlySalesStats);

router.route('/sales/yearly')
    .get(getYearlySalesStats)
    .post(calculateYearlySales);

router.route('/orders/monthly').post(calculateOrderStats);
router.route('/orders/:year/:month').get(getOrderStats);

module.exports = router;