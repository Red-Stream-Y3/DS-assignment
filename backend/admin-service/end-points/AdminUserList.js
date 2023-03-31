const router = require('express').Router();
const mongoose = require('mongoose');

router.route('/user-list').get((req, res) => {

    //dummy data
    const tempUsers = [{
        username: "user1",
        role: "buyer",
    },{
        username: "user2",
        role: "seller",
    },{
        username: "user3",
        role: "buyer",
    },{
        username: "user4",
        role: "seller",
    },{
        username: "user5",
        role: "buyer",
    },{
        username: "user6",
        role: "seller",
    },{
        username: "user7",
        role: "buyer",
    },{
        username: "user8",
        role: "seller",
    },{
        username: "user9",
        role: "buyer",
    },{
        username: "user10",
        role: "seller",
    }];

    res.json(tempUsers);
});

module.exports = router;