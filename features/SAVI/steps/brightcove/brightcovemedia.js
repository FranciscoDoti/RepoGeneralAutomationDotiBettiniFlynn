const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const assert = require('assert');
const urls = require(`${process.cwd()}/config/urls.json`);
const { visitURL, sleep, getDriver } = require(`${process.cwd()}/app/driver`); // allows this file to be moved wherever
const { log } = require(`${process.cwd()}/app/logger`);

Then('I navigate to Brightcove Media Player', async function () {
    visitURL('https://signin.brightcove.com/?_ga=2.157316921.2012421138.1571170613-324568148.1569427629');
});

Then('I navigate to IconinLineIcon and check status', async function () {
    await pages.brightcovevideo.click('IconinlineIcon');
        if (Checkbox = false) { 
            Checkbox.click();
        } else {
        };    
});

Then('I test the videoplayer and audioplayer', async function () {
    await pages.brightcovevideo.getElementBy('bc-icon-yes');
    await pages.brightcovevideo.click('title');

})