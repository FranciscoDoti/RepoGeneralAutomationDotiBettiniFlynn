
const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const mathpages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;

When(/^I add the "(.*)" module$/, async function (moduleType) {
    await mathpages.ams.click('raptorNewItem');
    await mathpages.raptorAms.switchToTab('Raptor Authoring');
    await pages.raptor.click('addLink');
    await pages.raptor.click('modulePallete', moduleType);
    await pages.raptor.click('contentArea');
});

Then(/^I verify item has been created$/, async function () {
    let itemid = (await mathpages.ams.getText('getItemid')).split(":")[1];

    //below two steps need to be added to I add the "(.*)" module
    await pages.raptor.click('moreButton');
    await pages.raptor.click('saveAsDraft');
    await mathpages.raptorAms.switchToTab('Sapling Learning');
    await pages.raptor.assertElementExists('amsItemCreate', itemid.trim());
});