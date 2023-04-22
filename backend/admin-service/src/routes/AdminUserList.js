const router = require('express').Router();
const {
    getUserbyId,
    updateUser,
    getUsers,
} = require("../controllers/UserServices");

router.route('/user-list').get(getUsers);

router.route('/get-user').post(getUserbyId);
router.route('/update-user').post(updateUser);

module.exports = router;