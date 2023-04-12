//RedStream email host account credentials
let account; 

const getAccount = async () => {
    if (!account) {
        // const nodemailer = require('nodemailer');
        // account = await nodemailer.createTestAccount();

        account = {
            user: "redstream.sliit@gmail.com",
            pass: "amkcomtpghwrabyt"
        };
    }

    return account;
};

module.exports = getAccount;