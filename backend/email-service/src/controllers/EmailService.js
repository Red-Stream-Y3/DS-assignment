const nodemailer = require('nodemailer');
const getAccount = require('../config/HostAccount');

let transporter;

/**depricated */
// const getTestTransporter = async () => {
//     if(!transporter){
//         const account = await getAccount();
        
//         transporter = nodemailer.createTransport({
//             host: 'smtp.ethereal.email',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: account.user,
//                 pass: account.pass
//             },
//             tls: {
//                 rejectUnauthorized: false
//             }
//         });
//     }
    
//     return transporter;
// };

const getGmailTransporter = async () => {

    if(!transporter){
        const account = await getAccount();

        const config = {
            service: 'gmail',
            auth: {
                user: account.user,
                pass: account.pass
            }
        }

        transporter = nodemailer.createTransport(config);
    }

    return transporter;
};

module.exports = getGmailTransporter;