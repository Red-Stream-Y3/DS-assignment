const router = require('express').Router();
const {
    getOrders,
    queryOrders,
    getOrderById,
    updateOrder,
} = require("../controllers/OrderServices");

router.route('/order-list').get(getOrders);

router.route('/get-order').post(getOrderById);
router.route('/update-order').post(updateOrder);
router.route('/query-order').post(queryOrders);

module.exports = router;