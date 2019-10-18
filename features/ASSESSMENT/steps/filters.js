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
    await filterslib.verifyTag(filter, option);
});

Then('I verify the following filter tags are displayed', async function(dataTable){
    for (let i = 0; i < dataTable.rows().length; i++) {
        let item = dataTable.hashes()[i];
        await filterslib.verifyTag(item['Filter'],item['Option']);
    }
});

Then('I verify that the items match with the filter applied with value {}', async function(option){
    
    var i=1;
        while ( i<= await filterslib.verifyNumberOfResults()) {
            await filterslib.verifyRow(i,option);
            if (await filterslib.isMultipleOf(i,200) && i<=999){
                await pages.filters.scrollElementIntoView('Load More');
                await pages.filters.click('Load More');
            }
            i++;
       } 
});

Then('I remove the filter with tag {}', async function(tagValue) {
    await filterslib.removeFilter(tagValue);
});
