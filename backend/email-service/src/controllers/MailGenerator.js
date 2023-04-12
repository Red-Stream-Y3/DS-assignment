const Mailgen = require('mailgen');

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'RedStream Herbal',
        link: 'https://redstream.sliit.com/',//TODO: Change this to the actual link
    },
});

module.exports = mailGenerator;