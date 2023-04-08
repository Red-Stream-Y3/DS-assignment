const router = require('express').Router();
const dbService = require('../controllers/UserServices');

router.route('/user-list').get(async (req, res) => {

    const users = await dbService.getUsers();

    if(!users) {
        res.status(400).json({msg: 'No users found'});
    } else {
        res.status(200).json(users);
    }

});

router.route('/get-user').post(async (req, res) => {

    const user = await dbService.getUserbyId(req.body.uid);

    if(!user) {
        res.status(400).json({msg: 'No user found'});
    } else {
        res.status(200).json(user);
    }

});

router.route('/update-user').post(async (req, res) => {

    const user = await dbService.updateUser(req.body.uid, req.body.user);

    if(!user) {
        res.status(400).json({msg: 'No user found'});
    } else {
        res.status(200).json(user);
    }

});

module.exports = router;