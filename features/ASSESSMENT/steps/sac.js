const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const driver = require(`${process.cwd()}/app/driver`);

When('I navigate to assignment preview', async function () {
    await pages.sac.click('Instructor Course Link');
    await pages.sac.click('Instructor Assessment Link');
    await pages.sac.click('Assignment Preview Button');
    await pages.sac.click('Keep Attempts Button');
});

When('I navigate to assignment and go back to the course landing page', async function () {
    await pages.sac.click('Student Course Link');
    await pages.sac.click('Student Assessment Link');
    await pages.sac.click('Breadcrumb', 'Raptor Automation');
});

Then('The assignment preview is opened in a new tab', async function () {
    await pages.sac.switchToTab('Sapling Learning Student Assignment Container');
    await pages.sac.assertElementExists('Preview Check Answer Button');
});

Then('The course landing page is loaded', async function () {
    await pages.sac.assertElementExists('Student Assessment Link');
});
