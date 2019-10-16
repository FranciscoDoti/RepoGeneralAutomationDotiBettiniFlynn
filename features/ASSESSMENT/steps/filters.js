const { When, Then } = require('cucumber');
const { filterslib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When('I select the filter option {} and {}', async function(Filter, Option){
    await filterslib.setFilter(Filter, Option);
});

When('I apply the following filters', async function(datatable){
    for (let i = 0; i < datatable.rows().length; i++) {
        let item = datatable.hashes()[i];
        await filterslib.setFilter(item['Filter'], item['Option']);
    }
});

Then('I verify the following filter tags are displayed', async function(datatable){
    for (let i = 0; i < v.rows().length; i++) {
        let item = datatable.hashes()[i];
        await filterslib.verifyTag(item['Tag']);
    }
});

Then('I verify that the tag is being displayed with label using {} and {}', async function(Filter, Option) {
    await filterslib.verifyTag(`${Filter}: ${Option}`);
});

Then('I remove the filter with tag {}', async function(tag) {
    await filterslib.removeFilter(tag);
});
