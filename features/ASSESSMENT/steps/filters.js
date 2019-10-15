const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { filterslib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When("I select the filter options {} and {}", async function(mainOption, subOption){
    await filterslib.setFilter(mainOption,subOption);
});

When("I select various filters from datatable", async function(dataTable){
    for (let i = 0; i < datatable.rows().length; i++) {
        let item = datatable.hashes()[i];
        await filterslib.setFilter(item['mainOption'],item['subOption']);
    }
});

Then('I verify that the tag is being displayed with label {}', async function(subOption) {
    await filterslib.verifyTag(subOption);
});

Then('I verify that the following tabs are being displayed', async function(dataTable){
    for (let i = 0; i < datatable.rows().length; i++) {
        let item = datatable.hashes()[i];
        await filterslib.verifyTag(item['subOption']);
    }
})

Then('Then I verify that the items match with the filter applied in the column {} and value {}', async function(mainOption, subOption)
    
);

Then('I close the tag with value {}', async function(tagValue) {
    await filterslib.closeTag(tagValue);
});
