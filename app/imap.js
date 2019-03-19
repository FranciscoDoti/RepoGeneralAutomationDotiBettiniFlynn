const Imap = require('imap');
const simpleParser = require("mailparser").simpleParser;
let Link;

const connectClient = async function(user, password, regexChoice) {
    var regex = regexChoice || null;
    var client = new Imap({
        user: user,
        password: password,
        host: 'imap.gmail.com',
        port: 993,
        tls: true
        });
    const clientEventListener = async function (event){
        return new Promise((resolve, reject) => {
            client.once(event, async function(){
                resolve();
            });
            client.once('error', function(err) {
                reject(err);
            });
            client.once('end', function() {
                client.end();
            });
        })
    }

    const openInbox = async function (){
        return new Promise((resolve, reject) => {
            client.openBox('INBOX', true, function(err, box){
                if(err){
                    reject(err, 'err');
                } else {
                    resolve(box);
                }
            })
        })
    }

    const fetchMessages = async function (box){
        return new Promise((resolve, reject) => {
            // get only the latest email
            var f = client.seq.fetch(box.messages.total + ':', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
            f.on('message', function(msg, seqno) {
                msg.on('body', function(stream, info) {
                    simpleParser(stream).then((parsed) => {
                        if(regex === "IAM") {
                            var iamRegex = /(?<=If the link has expired you can initiate another password reset request<\/p><p><a href=")(.*?)(?=">)/
                            if(parsed.textAsHtml){
                                Link = parsed.textAsHtml;
                                var linkFound = Link.match(iamRegex);
                                if(linkFound){
                                    linkFound = linkFound[0];
                                    resolve(linkFound);
                                } else {
                                    resolve('www.google.com');
                                }
                            }
                        } else if (regex === "courseware"){
                            var coursewareRegex = /(?<=frontend.mldev.cloud\/courses\/)(.*?)(?=">)/
                            if(parsed.textAsHtml){
                                Link = parsed.text;
                                var linkFound = Link.match(coursewareRegex);
                                if(linkFound){
                                    linkFound = "https://int-achieve-courseware-frontend.mldev.cloud/courses/" + linkFound[0];
                                    resolve(linkFound);
                                } else {
                                    resolve('www.google.com');
                                }
                            }
                        } else if (regex === "registration"){
                            var coursewareRegex = /(?<=token=)(.*?)(?=">)/
                            if(parsed.textAsHtml){
                                Link = parsed.textAsHtml;
                                var registrationLinkFound = Link.match(coursewareRegex);
                                if(registrationLinkFound){
                                    registrationLinkFound = "https://int-achieve-iam.mldev.cloud/iam/confirm?token=" + registrationLinkFound[0];
                                    resolve(registrationLinkFound);
                                } else {
                                    resolve('www.google.com');
                                }
                            }
                        } else {
                            resolve(parsed);
                        }

                    })
                });
            })
            f.once('error', function(err) {
                console.log('Fetch error: ' + err);
                reject(err, 'error~~~~~~');
                client.end();
            });
            f.once('end', function() {
                client.end();
            });
        })
    }
    const sortMessages = async function (results){
        return new Promise((resolve, reject) => {
            client.search([ 'NEW' ], function(err, results) {
                if (err || !results.length){
                    client.end();
                    reject(err, 'error or results length is ', results.length, ' long');
                } else {
                    resolve(results);
                }
            })
        })
    }
    try {
        await client.connect();

        await clientEventListener('ready');

        const box = await openInbox();

        return await fetchMessages(box);

    } catch(err) {
        console.log(err, 'err in connectClient')
    }
}

module.exports = {
    connectClient
}
