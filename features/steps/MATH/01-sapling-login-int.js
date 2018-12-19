const path = require('path');
var Imap = require('imap')
var simpleParser = require("mailparser").simpleParser;
const { Given, When, Then, After } = require('cucumber');
const { loadConfig, loadLogin } = require('../../../app/util');
const expect = require('chai')
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const chromePath = require('chromedriver').path;
const { log } = require('../../../app/logger');
const { getDriver, sleep } = require('../../../app/driver');
const { By } = require('selenium-webdriver'); 
const config = loadConfig('config');

let pages = {
    sapling_ams: new PageObject('math-sapl-intLogin.json',stepsPath)
}

Given(/^the sapling-AMS "(.*)" page is loaded$/, async (urlKey) => {
const sapUrl =  config[urlKey];
log.debug(`Loading url, ${sapUrl}`);
await getDriver().get(sapUrl);
});

When (/^the login and password fields are displayed$/, async function(){

await sleep(5000);
await pages.sapling_ams.checkWebElementExists('username');
await pages.sapling_ams.checkWebElementExists('password');
});

Then(/^user inputs login info with "(.*)"$/, async function(user){

    const raptorLogin = await loadLogin(user);
    await pages.sapling_ams.populate('username', raptorLogin.username);
    await pages.sapling_ams.populate('password', raptorLogin.password);
    await pages.sapling_ams.populate('saplogin', 'click');
    await sleep(2000);
    });


Then(/^user is successfully logged into AMS "(.*)"$/, async function(urlKey){

    const amsUrl = config[urlKey];
    await getDriver().get(amsUrl);

    await sleep(5000);

});

