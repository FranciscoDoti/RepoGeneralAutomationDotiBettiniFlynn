const jsonfile = require('jsonfile');
const _ = require('lodash');
const rp = require('request-promise-native');
const jsonwebtoken = require('jsonwebtoken');
const {
    log
} = require(`${process.cwd()}/app/logger`);
const {
    config
} = require(`${process.cwd()}/app/driver`);
const uris = require(`${process.cwd()}/config/endpoints.json`);

RestObject.prototype.send = async function () {
    try {
        let fullresponse = await rp(this.request);
        this.response = fullresponse.body;
        console.log(this.response);
        log.info(`Request returned response. Status code ${this.response.status}`);
        return true;
    } catch (err) {
        this.error = err;
        log.info(`Request failed. Status code ${this.error.statusCode}`);
        return false;
    }
};

RestObject.prototype.setRequestBody = async function (body) {
    log.info(`Adding body ${JSON.stringify(body)} to request`);
    Object.assign(this.request.body, body);
};

RestObject.prototype.setRequestOptions = async function (requestType, app) {
    let uri = await _.get(uris, [app, config.stack]);
    log.info(`Constructing request options for request type ${requestType}`);
    this.request.method = requestType;
    this.request.uri = `${uri}${this.spec.endpoint}`;
    this.request.body = this.spec.request;
    this.request.json = this.spec.json;
    this.request.resolveWithFullResponse = true;
};

RestObject.prototype.setRequestCookie = async function () {
    if (this.cookie !== null) {
        var cookieJar = rp.jar();
        cookieJar.setCookie(this.cookie, `https://${this.cookie.domain}`);
        this.request.jar = cookieJar;
    }
};

function RestObject(fullFileName) {
    this.spec = Object.assign({}, jsonfile.readFileSync(fullFileName));
    this.request = Object.assign({});
    this.cookie = null;
    this.response = null;
    this.error = null;

    log.debug(`Reading rest specs from file ${fullFileName}`);
};

RestObject.prototype.setCookie = async function (payload) {
    const tough = require('tough-cookie');
    this.cookie = new tough.Cookie({
        key: "id_token",
        value: jsonwebtoken.sign(payload, 'secret', {
            expiresIn: '1d'
        }),
        domain: 'mldev.cloud'
    });
};

RestObject.prototype.POST = async function (app, body) {
    await this.setRequestOptions('POST', app);
    await this.setRequestBody(body);
    await this.setRequestCookie();
    let result = await this.send();

    if (result) {
        return this.response.status;
    } else {
        return this.error.statusCode;
    };
};

RestObject.prototype.response = async function (body) {
    return this.response.body;
};

RestObject.prototype.error = async function (body) {
    return this.error;
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