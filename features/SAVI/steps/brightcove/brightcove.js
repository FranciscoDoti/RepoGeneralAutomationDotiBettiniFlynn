const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const assert = require('assert');
const { visitURL, sleep, getDriver } = require(`${process.cwd()}/app/driver`); // allows this file to be moved wherever

Given('I navigate to Brightcove Media Player', async function () {
    visitURL('https://studio.brightcove.com/products/videocloud/media'); 
    await sleep(3000);
});

Then(/^I login to Brightcove Media as "(.*)"$/, async function (userType) {
    let user = this.users[userType];
      await pages.login.populate('email', user.username);
      await pages.login.populate('password', user.password);
      await pages.login.click('signinButton')
});

Then('I navigate to download excel', async function () {
    await sleep(3000);
    await pages.brightcovevideo.click('bc-react-checkbox')
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