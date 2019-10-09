const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { raptorlib, amslib, updatelib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When ('I select the filter options <MainOption> and <subOption>', async function(mainOption, subOption){
    await filterslib.setFilter(mainOption,subOption);

});

Then('I verify that the tag is being displayed', async function() {
    
});
