const router = require('express').Router();
const getGmailTransporter = require('../controllers/EmailService');
const getAccount = require('../config/HostAccount');
const mailGenerator = require('../controllers/MailGenerator');

router.route('/send').post(async (req, res) => {
    // Get email data from request body
    const { to, subject, mail } = req.body;
    const account = await getAccount();
    const transporter = await getGmailTransporter();

    //prepare content for Mailgen
    const data = {
        body: {
            name: mail.header,
            intro: mail.intro,
            outro: mail.outro
        }
    };

    if(mail.tableData) {
        data.body.table = {
            data: mail.tableData
        }
    }

    if(mail.action) {
        data.body.action = {
            instructions: mail.action.instructions,
            button: {
                text: mail.action.buttonText,
                link: mail.action.buttonLink
            }
        }
    }

    //generate mail html
    const html = mailGenerator.generate(data);

    // Send email
    const result = await transporter.sendMail(
        {
            from: `"RedStream" <${account.user}>`,
            to,
            subject,
            html,
        },
        (err, info) => {
            if (err) {
                res.status(400).send({ error: err, msg: "Email not sent!" });
            } else {
                res.status(200).send({ msg: "Email sent!", info });
            }
        }
    );

});

module.exports = router;