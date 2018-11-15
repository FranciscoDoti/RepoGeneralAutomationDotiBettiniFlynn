var Imap = require('imap')
// var  inspect = require('util').inspect;
var simpleParser = require("mailparser").simpleParser;
const { getDriver, sleep } = require('./driver');
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
    console.log('getting here')
    const clientEventListener = async function (event){
        return new Promise((resolve, reject) => {
            client.once(event, async function(){
                resolve();
            });
            client.once('error', function(err) {
                reject(err);
            });
            client.once('end', function() {
                console.log('Connection ended');
                client.end();
            });
        })
    }

    const openInbox = async function (){
        return new Promise((resolve, reject) => {
            client.openBox('INBOX', true, function(err, box){
                console.log(box, 'box');
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
            var f = client.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
            f.on('message', function(msg, seqno) {
                msg.on('body', function(stream, info) {
                    simpleParser(stream).then((parsed) => {
                        if(regex === 'IAM') {
                            var iamRegex = /(?<=If the link has expired you can initiate another password reset request<\/p><p><a href=")(.*?)(?=">)/
                            if(parsed.textAsHtml){
                                Link = parsed.textAsHtml;
                                Link = Link.match(iamRegex);
                                Link = Link[0];
                                // console.log(Link, 'inside the imap functions');
                                resolve(Link);
                            }
                        } else if (regex === "courseware"){
                            var iamRegex = /(?<=If the link has expired you can initiate another password reset request<\/p><p><a href=")(.*?)(?=">)/
                            if(parsed.textAsHtml){
                                Link = parsed.textAsHtml;
                                Link = Link.match(iamRegex);
                                Link = Link[0];
                                // console.log(Link, 'inside the imap functions');
                                resolve(Link);
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
                console.log('Done fetching all messages!');
                client.end();
            });
        })
    }
    // https://github.com/mscdex/node-imap/issues/359
    const sortMessages = async function (results){
        return new Promise((resolve, reject) => {
            client.search([ 'NEW' ], function(err, results) {
                if (err || !results.length){
                    client.end();
                    reject(err, 'error or results length is ', results.length, ' long');
                } else {
                    // get only the latest email
                    // var f = client.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
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