const router = require('express').Router();
const {getProducts} = require('../controllers/ProductServices');

router.route('/product-list').get(getProducts);

module.exports = router;