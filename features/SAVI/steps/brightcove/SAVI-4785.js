const { Given, When, Then } = require('cucumber');
const _ = require('lodash');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const { visitURL, sleep, } = require(`${process.cwd()}/app/driver.js`);
const urls = require(`${process.cwd()}/config/urls.json`);
const { PageObject } = require(`${process.cwd()}/app/PageObject`);
const mathpages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const { raptorlib, amslib, froalalib, updatelib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

Given('I opened videoplayer', async function (video) {
        await pages.brighcovevideo.populate(video);
        await visitURL(video)
}); 


/*When(/^I add the "(.*)" module$/, async function (moduleType) {
    await pages.ams.assertElementExists('Add Item', 'Easy');
    await pages.ams.click('Add Item', 'Raptor');
    await mathpages.raptorAms.switchToTab('Raptor Authoring');
    await pages.raptor.click('Add Menu');
    await pages.raptor.click('Module Pallete', moduleType);
    await pages.raptor.click('Content Area');
});*/