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
When('I set the following feedbacks with respect to the contexts', async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        let item = datatable.hashes()[i];
        switch (item['Context']) {
            case 'Incorrect':
                await pages.raptor.click('Add Context', 'incorrect');
                break;
            case 'Correct':
                await pages.raptor.click(i === 0 ? 'Tab' : 'Add Context', 'correct');
                break;
            case 'Default':
                await pages.raptor.click('Tab', 'default');
                break;
        }
        await raptorlib.addHint(item['Hint Type'], item['Value']);
    }
})
Then(/^I check my Work for correct attempt$/, async function (datatable) {
    await raptorlib.checkAnswerMode();
    await sortinglib.dragAndDropTokensToBins(datatable);
    await pages.raptor.click('Check Your Work Submit Button');
    await pages.raptor.assertText('activeTabTakeMode', 'correct1');
})
