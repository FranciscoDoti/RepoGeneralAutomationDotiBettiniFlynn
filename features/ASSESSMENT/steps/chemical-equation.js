const { When } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { chemicalEquationlib, raptorlib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When(/^I set the "(.*)" Context$/, async function (context, datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        let item = datatable.hashes()[i];
        switch (context) {
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
        if (context !== 'Default') {
            await chemicalEquationlib.configureContext(context, item);
        }
        await raptorlib.addHint(item['Hint Type'], item['Value']);
    }
});