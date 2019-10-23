const { When, Then } = require('cucumber');
const { filterslib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

When("I apply the filter options {} and {}", async function(filter, option){
    await filterslib.setFilter(filter,option);
});

When("I apply the following filters", async function(dataTable){
    for (let i = 0; i < dataTable.rows().length; i++) {
        let item = dataTable.hashes()[i];
        await filterslib.setFilter(item['Filter'],item['Option']);
    }
});  

Then('I verify that the filter tag is being displayed with label using {} and {}', async function(filter, option) {
    
    let tagValue = `${filter}: ${option}`;
    await filterslib.verifyTag(tagValue);
});

Then('I verify the following filter tags are displayed', async function(dataTable){
    
    for (let i = 0; i < dataTable.rows().length; i++) {
        let item = dataTable.hashes()[i];
        await filterslib.verifyTag(item['Tag']);
    }
});

Then('I verify that the items match with the filter applied with value {}', async function(option){
    await filterslib.verifyItemsWithFilterApplied(option);

});

Then('I remove the filter with tag {}', async function(tagValue) {
    await filterslib.removeFilter(tagValue);
});