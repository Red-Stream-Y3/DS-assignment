const router = require('express').Router();
const dbService = require('../controllers/OrderServices');

router.route('/order-list').get(async (req, res) => {

    const orders = await dbService.getOrders();

    if(!orders) {
        res.status(400).json({msg: 'No orders found'});
    } else {
        res.status(200).json(orders);
    }

});

router.route('/get-order').post(async (req, res) => {

    const order = await dbService.getOrderbyId(req.body.oid);

    if(!order) {
        res.status(400).json({msg: 'No order found'});
    } else {
        res.status(200).json(order);
    }

});

router.route('/update-order').post(async (req, res) => {

    const order = await dbService.updateOrder(req.body.oid, req.body.order);

    if(!order) {
        res.status(400).json({msg: 'No order found'});
    } else {
        res.status(200).json(order);
    }

});

module.exports = router;