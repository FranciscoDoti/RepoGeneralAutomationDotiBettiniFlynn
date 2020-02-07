const { When } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { chemicalEquationlib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When(/^I set the "(.*)" Context$/, async function (context, datatable) {
    switch (context) {
        case 'Incorrect':
            await pages.raptor.click('Add Incorrect Context Button');
            break;
        case 'Correct':
            await pages.raptor.click('Tab', 'correct');
            break;
        case 'Default':
            await pages.raptor.click('Tab', 'default');
            break;
    }
    if (context !== 'Default') {
        let item = datatable.hashes()[0];
        await chemicalEquationlib.configureContext(context, item);
    }
});