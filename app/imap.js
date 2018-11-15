var Imap = require('imap')
// var  inspect = require('util').inspect;
var simpleParser = require("mailparser").simpleParser;
const { getDriver, sleep } = require('./driver');
let Link;

const connectClient = async function(user, password) {
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
                        var regex = /(?<=If the link has expired you can initiate another password reset request<\/p><p><a href=")(.*?)(?=">)/
                        if(parsed.textAsHtml){
                            Link = parsed.textAsHtml;
                            Link = Link.match(regex);
                            Link = Link[0];
                            // console.log(Link, 'inside the imap functions');
                            resolve(Link);
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

        // const msg = await messageEventListener('ready', fetch);

        // client.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });

        // console.log(box, 'running the connectClient code here', fetch, 'msg outside promise~~~~~')

    } catch(err) {
        console.log(err, 'err in connectClient')
    }
}

module.exports = {
    connectClient
  }