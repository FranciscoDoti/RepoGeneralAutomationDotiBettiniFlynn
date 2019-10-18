const { When, Then } = require('cucumber');
const { filterslib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

When("I apply the filter options {} and {}", async function(Filter, Option){
    await filterslib.setFilter(Filter,Option);
});

When("I apply the following filters", async function(dataTable){
    for (let i = 0; i < dataTable.rows().length; i++) {
        let item = dataTable.hashes()[i];
        await filterslib.setFilter(item['Filter'],item['Option']);
    }
});

Then('I verify that the filter tag is being displayed with label using {} and {}', async function(Filter, Option) {
    await filterslib.verifyTag(Filter, Option);
});

Then('I verify the following filter tags are displayed', async function(dataTable){
    for (let i = 0; i < dataTable.rows().length; i++) {
        let item = dataTable.hashes()[i];
        await filterslib.verifyTag(item['Filter'],item['Option']);
    }
});

Then('I verify that the items match with the filter applied with value {}', async function(Option){
    
    var i=1;
        while (await filterslib.tableWithResults(i)) {
            await filterslib.verifyRow(i,Option);
            if (await filterslib.isMultipleOf(i,200) && i<=999){
                await pages.filters.scrollElementIntoView('loadMore');
                await pages.filters.click('loadMore');
            }
            i++;
       } 
});

Then('I remove the filter with tag {}', async function(tagValue) {
    await filterslib.removeFilter(tagValue);
});
