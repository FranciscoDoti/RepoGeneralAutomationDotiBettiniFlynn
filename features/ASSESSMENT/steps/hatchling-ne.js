const { When, Then } = require('cucumber')
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { hatchlinglib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When('I add the following values to Hatchling NE module', async function (datatable) {
    let neData = datatable.hashes()[0];
    await pages.hatchlingItem.click('Question Title');
    await pages.hatchlingItem.populate('target Value', neData.CorrectTargetValue);
    await pages.hatchlingItem.populate('Measurement', neData.Measurement);
    await pages.hatchlingItem.click('Derivation Type', 'Number ∓');
    await pages.hatchlingItem.populate('Derivation Amount', neData.AcceptanceWithin);
});

When('I set the hint for Hatchling NE module with following detail', async function (datatable) {
    await hatchlinglib.populateHint(datatable);
});

When('I add the student feedback with the following details and save feedback and save the NE item', async function (datatable) {
    await hatchlinglib.populateStudentFeedback(datatable);
    await pages.hatchlingItem.click('Button', 'Save');
});