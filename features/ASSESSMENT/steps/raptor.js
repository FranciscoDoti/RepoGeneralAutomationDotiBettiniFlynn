
const { When}=require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
var action = require(`${process.cwd()}/features/ASSESSMENT/util/actions`).Actions;

When(/^I added "(.*)" module from the Add module pallete$/, async function (moduleType) {
    await pages.raptor.click('addLink');
    var pallete=await action().selectModulePallete(moduleType);
    await pages.raptor.click('modulePallete',pallete);
});

When(/^I select the canvas to add the selected module$/, async function () {
    await pages.raptor.click('contentArea');
});

When(/^I save the item as draft$/, async function () {
    await pages.raptor.click('moreButton');
    await pages.raptor.click('saveAsDraft');
});