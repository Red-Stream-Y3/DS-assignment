const router = require('express').Router();
const {
    calculateDailySales,
    calculateMonthlySales,
    calculateYearlySales,
    getDailySalesStats,
    getMonthlySalesStats,
    getYearlySalesStats,
} = require('../controllers/StatisticServices');

router.route('/sales/daily/:year/:month').get(getDailySalesStats);
router.route('/sales/daily').post(calculateDailySales);

router.route('/sales/monthly').post(calculateMonthlySales);
router.route('/sales/monthly/:year').get(getMonthlySalesStats);

router.route('/sales/yearly')
    .get(getYearlySalesStats)
    .post(calculateYearlySales);


module.exports = router;