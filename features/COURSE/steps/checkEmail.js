const imaps = require('imap-simple');
const _ = require('lodash');
const simpleParser = require('mailparser').simpleParser;
const { visitURL } = require(`${process.cwd()}/app/driver`);
let linkFound;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";
const simpleConnect = async function(user, password){
    var config = {
        imap: {
            user: user,
            password: password,
            host: 'imap.mail.yahoo.com',
            port: 993,
            tls: true,
            authTimeout: 3000
        }
    };
    await imaps.connect(config).then( (connection) =>{

        connection.openBox('INBOX').then( () =>{

            const searchCriteria = ['UNSEEN',['SUBJECT', 'You have been invited to join a course']];
            const fetchOptions = { bodies: ['HEADER', 'TEXT', ''],  markSeen: false, struct: true};

            return connection.search(searchCriteria, fetchOptions);
            }).then( (results) =>{
                
                //results.forEach( (item) =>{
                    let all = _.find(results[0].parts, { "which": ""})
                    let id = results[0].attributes.uid;
                    let idHeader = "Imap-Id: " +id+ " \r\n";
                    simpleParser(idHeader+all.body, (err, mail) => {
    
                    const coursewareRegex = /(?<=frontend.mldev.cloud\/courses\/)(.*?)(?=">)/
                    if(mail.textAsHtml){
                        Link = mail.textAsHtml;
                        linkFound = Link.match(coursewareRegex);
                        if(linkFound){
                            linkFound = "https://int-achieve-courseware-frontend.mldev.cloud/courses/" + linkFound[0];
                            console.log(linkFound);
                            visitURL(linkFound);
                            
                        }
                        else{
                            console.log("The link has not been found or is missing.");
                        }
                    }
                });
                connection.end();
           // });
    
        });
 
    }); 
}


module.exports = {
    simpleConnect
}
