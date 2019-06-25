const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const driver = require(`${process.cwd()}/app/driver`);

When('I navigate to assignment preview', async function () {
    await pages.sac.click('assignmentLink');
    await pages.sac.click('courseLink');
    await pages.sac.click('assignmentPreviewButton');
});

Then('The assignment preview is opened in a new tab', async function () {
    await pages.sac.switchToTab('Sapling Learning Student Assignment Container');
    await pages.sac.assertElementExists('previewCheckAnswerButton');
});