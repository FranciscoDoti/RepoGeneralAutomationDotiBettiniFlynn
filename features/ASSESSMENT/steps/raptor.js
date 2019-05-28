
const { When, Then}=require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const mathpages =require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
var action = require(`${process.cwd()}/features/ASSESSMENT/util/actions`).Actions;
const { resetBrowser } = require(`${process.cwd()}/app/driver`);
const fs = require('fs');
const expect = require('chai').expect;

When(/^I added "(.*)" module from the Add module pallete$/, async function (moduleType) {
    await pages.raptor.click('addLink');
    var pallete=await action().selectModulePallete(moduleType);
    await pages.raptor.click('modulePallete',pallete);
});

When(/^I select the canvas to add the selected module$/, async function () {
    await pages.raptor.click('contentArea');
});

When(/^I save the item as draft$/, async function () {
    let itemid = await mathpages.ams.getText('getItemid');
    await pages.raptor.click('moreButton');
    await pages.raptor.click('saveAsDraft');

  // writing item id number into a file
  let num = itemid.split(" / ")[0];
  fs.writeFileSync('raptor-itemId.txt', num);
});

When(/^I navigate back to AMS landing page$/, async function () {
    await mathpages.raptorAms.switchToTab('Sapling Learning');
});

Then(/^I verify item has been created$/, async function () {
    let savedItemId = fs.readFileSync("raptor-itemId.txt").toString();
    await pages.raptor.assertElementExists('amsItemCreate',savedItemId);
});