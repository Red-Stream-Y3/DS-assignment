const router = require('express').Router();
const {
    getCommission,
    updateCommission,
} = require("../controllers/ConfigServices");

router.route('/commission')
    .get(getCommission)
    .post(updateCommission);

module.exports = router;