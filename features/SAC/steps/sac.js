const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAC/pages/.page.js`).pages;
const driver = require(`${process.cwd()}/app/driver`);

When('I navigate to assignment preview', async function () {
    await pages.sac.click('assignmentLink');
    await pages.sac.click('courseLink');
    await pages.sac.click('assignmentPreviewButton');
});

Then('I the assignment preview is opened in a new tab', async function () {
    await pages.sac.switchToTab('Question 1 of 11 - All Mods');
    await pages.sac.assertElementExists('previewCheckAnswerButton');
});