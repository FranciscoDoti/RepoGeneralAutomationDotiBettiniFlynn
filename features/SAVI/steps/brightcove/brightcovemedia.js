const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const assert = require('assert');
const urls = require(`${process.cwd()}/config/urls.json`);
const { visitURL, sleep, getDriver } = require(`${process.cwd()}/app/driver`); // allows this file to be moved wherever
const { log } = require(`${process.cwd()}/app/logger`);
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

Then('I navigate to Brightcove Media Player', async function () {
    await pages.brightcovevideo.click('bc-mods-dropdown');
    visitURL('https://studio.brightcove.com/products/videocloud/media'); 
});

Then('I navigate to download excel', async function () {
    await sleep(3000);
    await pages.brightcovevideo.click('')
    await pages.brightcovevideo.click('button id');
    await pages.brightcovevideo.click('1 selected videos');
    await pages.brightcovevideo.click('Include current URLs for video renditions');
    await pages.brightcovevideo.click('Export Data');
    await pages.brightcovevideo.click('Download File');
});

Then('I test the videoplayer and audioplayer', async function () {
    await pages.brightcovevideo.getElementBy('bc-icon-yes');
    await pages.brightcovevideo.click('title');

})