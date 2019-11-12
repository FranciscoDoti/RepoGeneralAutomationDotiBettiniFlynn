const { When, Then } = require('cucumber');
const { deletedItemsLib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
let textFilter;
let filters = [];

When('I apply the following filters on DeletedItems page', async function (dataTable) {
    for (let i = 0; i < dataTable.rows().length; i++) {
        let item = dataTable.hashes()[i];
        await filters.push(item);
        await deletedItemsLib.setFilter(item['Filter'], item['Option']);      
    }
});

When('I click on Deleted Items', async function(){
    await pages.deletedItems.click('Deleted Items');
});

When(/^I apply the following text filter "(.*)" on DeletedItems page$/, async function (text) {
    textFilter = text;
    await deletedItemsLib.setTextFilter(textFilter);
});



Then('I verify that the items match with the filters applied', async function () {
    await deletedItemsLib.verifyItemswithFiltersApplied(filters, textFilter);


});