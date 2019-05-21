
const {When}=require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
var action = require(`${process.cwd()}/features/ASSESSMENT/util/actions`).Actions;

When(/^I added "(.*)" module from the Add module pallete$/, async function (moduleType) {
    
    await pages.raptor.click('addLink');
    var pallete= action().selectModulePallete(moduleType);
    await pages.raptor.click('modulePallete',pallete);
});