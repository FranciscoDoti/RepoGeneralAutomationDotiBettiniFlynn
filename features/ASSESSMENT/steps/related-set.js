const { When } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { relatedsetlib, raptorlib, amslib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When('I give format to elements of the Smart Data table', async function () {
    await pages.raptor.click('Module Smart Data', 1);
    await pages.raptor.click('Module Smart Data Edit', 1);
    await relatedsetlib.giveFormat();
});

When(/^I configure the Shared Content item with "(.*)" trials and the following variables$/, async function (trials, datatable) {
    await pages.raptor.click('Module Smart Data Edit', 1);
    await relatedsetlib.setUpTrials(trials);
    await relatedsetlib.setUpVariables(datatable);
});

When('I configure the Shared Content item with the following children', async function (datatable) {
    await relatedsetlib.setUpChildren(datatable);

    await raptorlib.saveItem();
    await pages.ams.closeTab('Raptor Authoring');
});
