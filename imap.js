var Imap = require('imap')
// var  inspect = require('util').inspect;
var simpleParser = require("mailparser").simpleParser;
var imap = new Imap({
  user: 'coursewareachieve@gmail.com',
  password: 'ABCabc@123',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}
var result;
imap.once('ready', function() {
    openInbox(function(err, box) {
        if (err) throw err;
        var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
        f.on('message', function(msg, seqno) {
            // console.log('Message #%d', seqno);
            var prefix = '(#' + seqno + ') ';
            msg.on('body', function(stream, info) {
                simpleParser(stream).then((parsed) => {
                    var regex = /(?<=If the link has expired you can initiate another password reset request<\/p><p><a href=")(.*?)(?=">)/
                    if(parsed.textAsHtml){
                        result = parsed.textAsHtml;
                        result = result.match(regex);
                        console.log(result[0]);
                    }
                })
            });
        });
        f.once('error', function(err) {
            console.log('Fetch error: ' + err);
        });
        f.once('end', function() {
            console.log('Done fetching all messages!');
            imap.end();
        });
    });
});

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
  return result;
});

imap.connect();