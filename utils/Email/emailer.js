const nodemailer = require('nodemailer');
const argv = require('minimist')(process.argv.slice(2));

const emailAttachment = function(){
    const path = require('path');
    const fs = require('fs');
    let attachments = [];

    const directoryPath = `${process.cwd()}/reports/`;
    fs.readdirSync(directoryPath).forEach(file => {
        if (path.extname(file) == '.html') {
            attachments.push({
                path: directoryPath + file
            });
        }
    });
    attachments.push({
        path: directoryPath + 'logs/combined.log'
    });
    return attachments;
};

let config = {
    clientId: "701768719333-0f12h7i269l7n2odh5ne80u5mdkth618.apps.googleusercontent.com",
    clientSecret: "ADEpn82HAOHH9_8lqzpwRIXd",
    username: "thomas.dsilva.contractor@macmillan.com",
    refreshToken: "1/3ayBIUgNJWANUL1-rISK50oaD6VlrWuk4XvzG03kzt9rO_ekPBdfvgDHcXLpFiNh",
    accessToken: "ya29.GltuByf5jWOhzFHv_lbBLQvIahPif5RqTtn_r9TMh7BmFxwaDwn2WJz_zyBGvuVbaGRfElVNYrkqaKDfe9MHic72Mc9W66OeFa-LikboAx0eoZxyq-H1cGT1LbFU1",
    sender: "thomas.dsilva.contractor@macmillan.com",
    recepients: argv.recepients,
    subject: argv.subject,
    body: `Please find cucumber report from Jenkins pipeline execution for ${argv.branch} branch in ${argv.env} environment attached.`, // plaintext body
    attachments: emailAttachment()
};

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        clientId: config.clientId,
        clientSecret: config.clientSecret
    }
});

let mailOptions = {
    from: config.sender, // sender address
    to: config.recepients, // list of receivers
    subject: config.subject, // Subject line
    text: config.body,
    attachments: config.attachments,
    auth: {
        user: config.username,
        refreshToken: config.refreshToken,
        accessToken: config.accessToken,
        expires: 1494388182480
    }
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

transporter.close();