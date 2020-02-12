const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { raptorlib, labelinglib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When('I add bins and check the corresponding checkboxes', async function () {
    await pages.canvasLabeling.click('Canvas Button', 'Edit');
    await pages.canvasLabeling.click('Bin Checkbox', 1);
})

When('I add 3 tokens with the following token names', async function (datatable) {
    await labelinglib.addMultipleLabelingTokens(datatable);
    await pages.raptor.click('variablesChevron');
})

Then(/^I drag \"([^\"]*)\" into the bin as a correct answer and check my work$/, async function (token) {
    await pages.canvasLabeling.click('Canvas Tab', 'correct');
    await pages.canvasLabeling.dragAndDrop('Drag Token', 'Drop Token', token, '1');
    await raptorlib.checkAnswerMode();
    await pages.canvasLabeling.dragAndDrop('Drag Token', 'Drop Token', token, '1');
    await pages.raptor.click('Check Your Work Submit Button');
    await pages.raptor.assertText('activeTabTakeMode', 'correct1');
})
