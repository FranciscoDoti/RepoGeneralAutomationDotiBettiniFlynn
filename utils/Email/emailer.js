const nodemailer = require('nodemailer');
const config = require('./emailerconfig.json');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        clientId: config.clientId,
        clientSecret: config.clientSecret
    }
});

let mailOptions = {
    from    : config.sender, // sender address
    to      : config.recepients, // list of receivers
    subject : 'Hello ✔', // Subject line
    text    : 'Hello world\r\ntest', // plaintext body
    auth : {
        user         : config.username,
        refreshToken : config.refreshToken,
        accessToken  : config.accessToken,
        expires      : 1494388182480
    }
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});