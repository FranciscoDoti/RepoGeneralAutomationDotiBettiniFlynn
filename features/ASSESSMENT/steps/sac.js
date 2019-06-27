const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const driver = require(`${process.cwd()}/app/driver`);

When('I navigate to assignment preview', async function () {
    await pages.sac.click('Instructor Assignment Link');
    await pages.sac.click('courseLink');
    await pages.sac.click('Assignment Preview Button');
});

When('I navigate to assignment and go back to the course landing page', async function () {
    await pages.sac.click('Student Assignment Link');
    await pages.sac.click('courseLink');
    await pages.sac.click('breadcrumb2');
});

Then('The assignment preview is opened in a new tab', async function () {
    await pages.sac.switchToTab('Sapling Learning Student Assignment Container');
    await pages.sac.assertElementExists('Preview Check Answer Button');
});

Then('The course landing page is loaded', async function () {
    await pages.sac.assertElementExists('courseLink');
});
