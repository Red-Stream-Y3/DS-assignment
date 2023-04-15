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

router.route('/query-order').post(async (req, res) => {
    const { query } = req.body;

    const queryData = await axios.post('http://localhost:9124/api/orders/query', {query});

    if(queryData) {
        res.status(200).json(queryData);
    } else {
        res.status(404);
        throw new Error('No orders found');
    }
});

module.exports = router;