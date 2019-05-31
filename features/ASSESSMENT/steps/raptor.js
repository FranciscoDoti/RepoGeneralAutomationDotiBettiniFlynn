
const { When, Then}=require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const mathpages =require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
var action = require(`${process.cwd()}/features/ASSESSMENT/util/actions`).Actions;
const fs = require('fs');

When(/^I added "(.*)" module$/, async function (moduleType) {
    await mathpages.ams.click('raptorNewItem');
    await mathpages.raptorAms.switchToTab('Raptor Authoring');
    await mathpages.raptorAms.assertElementExists('menuBarAdd');
    await pages.raptor.click('addLink');
    await pages.raptor.click('modulePallete',moduleType);
});

Then(/^I verify item has been created$/, async function () {
    await pages.raptor.click('contentArea');
    let itemid = await mathpages.ams.getText('getItemid');
    await pages.raptor.click('moreButton');
    await pages.raptor.click('saveAsDraft');

    // writing item id number into a file
    let num = itemid.split(":")[1];
    fs.writeFileSync('raptor-itemId.txt', num);
    await mathpages.raptorAms.switchToTab('Sapling Learning');
    let savedItemId = fs.readFileSync("raptor-itemId.txt").toString().trim();
    await pages.raptor.assertElementExists('amsItemCreate',savedItemId);
});