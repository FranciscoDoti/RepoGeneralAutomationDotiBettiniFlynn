const { When } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { raptorlib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When(/^I set the "(.*)" Context for CEE and configure it with the text "(.*)"$/, async function (context, text) {
    if (context === 'Incorrect') {
        await pages.raptor.click('Add Incorrect Context Button');
    } else {
        await pages.raptor.click('Tab', 'correct');
    }
    await pages.chemicalEquation.click('CEE Module Context');
    await pages.chemicalEquation.click('CEE Context Setup', context + ' Setup');
    await pages.chemicalEquation.populate('CEE Correct Setup Answer', text);
    await pages.raptor.click('Editor Panel Done Button');
});