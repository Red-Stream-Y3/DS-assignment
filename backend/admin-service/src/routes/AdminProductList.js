const router = require('express').Router();
const dbService = require('../controllers/ProductServices');

router.route('/product-list').get(async (req, res) => {
    const products = await dbService.getProducts();

    if(!products) {
        res.status(400).json({msg: 'No products found'});
    } else {
        res.status(200).json(products);
    }
});

module.exports = router;