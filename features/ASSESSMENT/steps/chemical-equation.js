const { When } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { raptorlib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);
const { sleep } = require(`${process.cwd()}/app/driver`);

When('I add hints', async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        let hint = datatable.hashes()[i];
        await pages.raptor.click('Feedback Add Button');
        if (hint['Module Type'] === 'Ungraded Text') {
            await pages.raptor.click('Feedback Add Element', hint['Module Type']);
            await pages.raptor.click('Feedback Context Area');
            await pages.raptor.click('Feedback Ungraded Text Actions', 'Edit');
            await pages.raptor.populate('Feedback Ungraded Text Edit Input',hint['Value']);
            await pages.raptor.click('Editor Panel Done Button');
        }
    }
});

When(/^I add a Correct Context for Chemical Equation with the text "(.*)"$/, async function(text){
    await pages.raptor.click('Tab', 'correct');
    await pages.chemicalEquation.click('CEE Module Context');
    await pages.chemicalEquation.click('CEE Context Setup', 'Correct Setup');
    await pages.chemicalEquation.populate('CEE Correct Setup Answer',text);
    await pages.raptor.click('Editor Panel Done Button');
    await sleep(5000);
});

When(/^I add an Incorrect Context and configure it with the text "(.*)"$/, async function(text){
    await pages.raptor.click('Add Incorrect Context Button');
    await pages.chemicalEquation.click('CEE Module Context');
    await pages.chemicalEquation.click('CEE Context Setup', 'Incorrect Setup');
    await pages.chemicalEquation.populate('CEE Correct Setup Answer',text);
    await pages.raptor.click('Editor Panel Done Button');
    await sleep(5000);
});

When('I click on Default Context', async function(){
    await pages.raptor.click('Tab', 'default');
});

When('I Save the item', async function(){
    let itemId = await raptorlib.saveItem();
}); 