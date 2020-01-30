const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { log } = require(`${process.cwd()}/app/logger`);

When(/^I add \"([^\"]*)\" bins and \"([^\"]*)\" tokens to the module and populate the tokens with the following token names$/, async function (noOfBins, noOfTokens, datatable) {
    await pages.canvasLabeling.click('Canvas Button', 'Edit');
    await pages.canvasLabeling.click('Bin Checkbox', 1);
    for (let i = 1; i < noOfBins; i++) {
            await pages.canvasLabeling.click('Add Bin_Token Button', 'Add a Bin');
            await pages.canvasLabeling.click('Bin Checkbox', i + 1);
        
    }
    for (let i = 0; i < datatable.rows().length; i++) {
        if (i > 1) {
            await pages.canvasLabeling.click('Add Bin_Token Button', 'Add a Token');
        }
        console.log("-------->"+datatable.hashes()[i].Token);
        await pages.canvasLabeling.populate('Token Value Textbox', i + 1, datatable.hashes()[i].Token);
    }
})