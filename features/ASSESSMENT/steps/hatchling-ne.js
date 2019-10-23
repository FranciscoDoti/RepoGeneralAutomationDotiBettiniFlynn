const { When, Then } = require('cucumber')
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { hatchlinglib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When('I add the following values to Hatchling NE module', async function (datatable) {
    for(let i=0; i<datatable.rows().length; i++){
        let item = datatable.hashes()[i];
        await hatchlinglib.populateNEValues(item);
    }
});

When('I set the hint for Hatchling NE module with following detail', async function (datatable) {
    await hatchlinglib.populateHint(datatable);
});

When('I add the student feedback with the following details and save feedback and save the NE item', async function (datatable) {
    await hatchlinglib.populateStudentFeedback(datatable);
    await pages.hatchlingItem.click('Button', 'Save');
});