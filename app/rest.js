const jsonfile = require('jsonfile');
const { log } = require(`${process.cwd()}/app/logger`);
const rp = require('request-promise-native');
var request = Object.assign({}),response, error, spec;
const jsonwebtoken = require('jsonwebtoken');

const send = async function () {
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

const setRequestOptions = async function (requestType) {
    log.info(`Constructing request options for request type ${requestType}`);
    request.method = requestType;
    request.uri = spec.uri;
    request.body = spec.request;
    request.json = spec.json;
    request.resolveWithFullResponse = true;
};

const setRequestBody = async function (body) {
    log.info(`Adding body ${JSON.stringify(body)} to request`);
    Object.assign(request.body, body);
};

const setRequestCookie = async function () {
    if (cookie !== null) {
        var cookieJar = rp.jar();
        request.jar = cookieJar;
        cookieJar.setCookie(cookie, `https://${cookie.domain}`);
    }
};

function RestObject(fullFileName) {
    spec = Object.assign({}, jsonfile.readFileSync(fullFileName));
    cookie = null;
    log.debug(`Reading rest specs from file ${fullFileName}`);
};

RestObject.prototype.setCookie = async function (payload) {
    const tough = require('tough-cookie');
    cookie = new tough.Cookie({
        key: "id_token",
        value: jsonwebtoken.sign(payload, 'secret', {
            expiresIn: '1d'
        }),
        domain: 'mldev.cloud'
    });
};

RestObject.prototype.POST = async function (body) {
    await setRequestOptions('POST');
    await setRequestBody(body);
    await setRequestCookie();
    let result = await send();

    if (result) {
        return response.statusCode;
    } else {
        return error.statusCode;
    };
};

RestObject.prototype.response = async function (body) {
    return response.body;
};

RestObject.prototype.error = async function (body) {
    return error;
};

module.exports = {
    RestObject
};






















// const response = function () {
//     const statusCode = function () {

//     };

//     const body = function () {

//     };

//     const headers = function () {

//     };

//     const responseTime = function () {

//     };
// };

// const assertions = function () {
//     const responseType = function () {

//     };

//     const condition = function () {

//     };

//     const value = function () {

//     };
// };

// const variables = function () {

// };