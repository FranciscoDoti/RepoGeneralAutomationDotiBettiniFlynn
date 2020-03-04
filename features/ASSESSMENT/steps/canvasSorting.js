const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { raptorlib, sortinglib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When('I add bins with the following bin names', async function (datatable) {
    await pages.canvasSorting.click('Canvas Button', 'Edit');
    await sortinglib.addMultipleSortingBins(datatable);
})

When('I add tokens with the following token names', async function (datatable) {
    await sortinglib.addMultipleSortingTokens(datatable);
    await pages.canvasSorting.click('Done Button');
})

When('I drag the following token into the following respetive bins', async function (datatable) {
    await pages.raptor.click('Tab', 'correct');
    await sortinglib.dragAndDropTokensToBins(datatable);
})

Then(/^I check my Work for correct attempt$/, async function (datatable) {
    await raptorlib.checkAnswerMode();
    await sortinglib.dragAndDropTokensToBins(datatable);
    await pages.raptor.click('Check Your Work Submit Button');
    await pages.raptor.assertText('activeTabTakeMode', 'correct1');
})
