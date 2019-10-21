const jsonfile = require('jsonfile');
const rp = require('request-promise-native');
const { log } = require(`${process.cwd()}/app/logger`);
const jwt = require('jsonwebtoken');

const restObject = function (fullFileName) {
    let that = Object.assign({}, jsonfile.readFileSync(fullFileName));
    let response, error;
    
    const makeRequest = async function (request) {
        return (await rp(request).then(function (res) {
            response = res;
            log.info(`Request returned response. Status code ${response.statusCode}`);
            return true;
        }).catch(function (err) {
            error = err;
            log.info(`Request failed. Status code ${error.statusCode}`);
            return false;
        }));
    };

    const buildOptions = function(requestType){
        log.info(`Constructing request options for request type ${requestType}`);
        let options = Object.assign({});
        options.method = requestType;
        options.uri = that.uri;
        options.body = that.request;
        options.json = that.json;
        options.resolveWithFullResponse = true;
        options.auth = Object.assign({}, {'bearer': generateJWT()});
        console.log(options);
        return options;
    };

    const requestJSONBody = function(request, body){
        log.info(`Adding body ${JSON.stringify(body)} to request`);
        Object.assign(request.body, body);
        return request;
    };

    const POST = async function (body) {
        let request = await buildOptions('POST');
        request = await requestJSONBody(request, body);
        let result = await makeRequest(request);

        if(result){
            return response.statusCode;
        }else{
            return error.statusCode;
        };
    };

    //build GET, PUT, DELETE, PATCH
    //handle qs, headers, body, apiauth

    const validate = async function () {
        // console.log(that.body);
        // // console.log('done');
        // console.log(that.err);
        // // console.log('done');
    };

    that.POST = POST;
    that.validate = validate;
    return that;
};

module.exports = {
    restObject
};

const response = function () {
    const statusCode = function () {

    };

    const body = function () {

    };

    const headers = function () {

    };

    const responseTime = function () {

    };
};

const assertions = function () {
    const responseType = function () {

    };

    const condition = function () {

    };

    const value = function () {

    };
};

const variables = function () {

};

const users = {
    admin: {
        sub: '0053B000001YyTMQA0',
        user_id: '0053B000001YyTMQA0',
        FirstName: 'Courseware',
        LastName: 'Admin',
        Email: 'admin@courseware.com',
        C_Acct__c: 'C02777',
        School_or_Institution__c: 'Courseware Team',
        nickname: 't3grfl7ooo25q5hg6slupbfus',
        name: 'Courseware Admin',
        app_metadata: {
            admin: true,
            support: false,
        },
        user_metadata: {
            first_name: 'Courseware',
            last_name: 'Admin',
            name: 'Courseware Admin',
            cAccount: 'C02777',
        },
        auth0_id: null,
        LastModifiedDate: '2019-10-15T09:04:33.000+0000',
        email: 'admin@courseware.com'
    }
};

const generateJWT = function () {
    return jwt.sign(users.admin, 'secret', {
        expiresIn: '1d'
    });
};