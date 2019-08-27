const nodemailer = require('nodemailer');
const argv = require('minimist')(process.argv.slice(2));

const config = {
    clientId: "701768719333-0f12h7i269l7n2odh5ne80u5mdkth618.apps.googleusercontent.com",
    clientSecret: "ADEpn82HAOHH9_8lqzpwRIXd",
    sender: "thomas.dsilva.contractor@macmillan.com",
    username: "thomas.dsilva.contractor@macmillan.com",
    refreshToken: "1/3ayBIUgNJWANUL1-rISK50oaD6VlrWuk4XvzG03kzt9rO_ekPBdfvgDHcXLpFiNh",
    accessToken: "ya29.GltuByf5jWOhzFHv_lbBLQvIahPif5RqTtn_r9TMh7BmFxwaDwn2WJz_zyBGvuVbaGRfElVNYrkqaKDfe9MHic72Mc9W66OeFa-LikboAx0eoZxyq-H1cGT1LbFU1",
    reportPath: `${process.cwd()}/reports/cucumber_report.html`,
    environment: argv.env || "int",
    branch: argv.branch || "development",
    recepients: argv.recepients || "thomas.dsilva@testingconsultancy.com",
    result: argv.result || "FAILURE"
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
    subject: `Cucumber pipeline test result - ${config.result}`, // Subject line
    text: `Please find cucumber report from Jenkins pipeline execution for ${config.branch} branch in ${config.environment} environment attached.`, // plaintext body
    attachments: [{
        path: reportPath
    }],
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