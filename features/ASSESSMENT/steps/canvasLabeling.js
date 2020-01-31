const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { log } = require(`${process.cwd()}/app/logger`);

When(/^I add \"([^\"]*)\" bins and check the corresponding checkboxes$/, async function (noOfBins) {
    await pages.canvasLabeling.click('Canvas Button', 'Edit');
    await pages.canvasLabeling.click('Bin Checkbox', 1);
    for (let i = 1; i < noOfBins; i++) {
        await pages.canvasLabeling.click('Add Bin_Token Button', 'Add a Bin');
        await pages.canvasLabeling.click('Bin Checkbox', i + 1);
    }
})

When('I add 3 tokens with the following token names', async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        if (i > 0) {
            await pages.canvasLabeling.click('Add Bin_Token Button', 'Add a Token');
        }
        await pages.canvasLabeling.populate('Token Value Textbox', i + 1, datatable.hashes()[i].Token);
    }
    await pages.canvasLabeling.click('Done Button');
    await pages.raptor.click('variablesChevron');
})

When(/^I drag \"([^\"]*)\" into the bin as a correct answer and check my work$/,async function (token){
    await pages.canvasLabeling.click('Canvas Tab', 'correct');
    await pages.canvasLabeling.dragAndDrop(dragToken, 1,dropToken)
})
