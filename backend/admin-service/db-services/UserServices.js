const mongoose = require('mongoose');

const getUserbyId = async (id) => {};

const updateUser = async (id, user) => {};

const getUsers = async () => {

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

    //async function to get data from DB
    // const users = await User.find();

    return tempUsers;

};

module.exports = {
    getUserbyId,
    updateUser,
    getUsers
};