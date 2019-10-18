const { When, Then } = require('cucumber');
const { filterslib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;

When("I apply the filter options {} and {}", async function(mainOption, subOption){
    await filterslib.setFilter(mainOption,subOption);
});

When("I apply the following filters", async function(dataTable){
    for (let i = 0; i < dataTable.rows().length; i++) {
        let item = dataTable.hashes()[i];
        await filterslib.setFilter(item['mainOption'],item['subOption']);
    }
});

Then('I verify that the filter tag is being displayed with label using {} and {}', async function(mainOption, subOption) {
    await filterslib.verifyTag(mainOption, subOption);
});

Then('I verify the following filter tags are displayed', async function(dataTable){
    for (let i = 0; i < dataTable.rows().length; i++) {
        let item = dataTable.hashes()[i];
        await filterslib.verifyTag(item['mainOption'],item['subOption']);
    }
});

Then('I verify that the items match with the filter applied with value {}', async function(subOption){
    
    var i=1;
        while (await filterslib.tableWithResults(i)) {
            await filterslib.verifyRow(i,subOption);
            if (await filterslib.isMultipleOf(i,200) && i<=999){
                await pages.filters.scrollElementIntoView('loadMore');
                await pages.filters.click('loadMore');
            }
            i++;
       } 
});

Then('I remove the filter with tag {}', async function(tagValue) {
    await filterslib.closeTag(tagValue);
});
