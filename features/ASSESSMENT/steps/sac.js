const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const loginpages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);
let scores = [];

When('I navigate to {string} assessment link in {string} course', async function (AssessmentName, CourseName) {
    await pages.sac.click('Course Link', CourseName);
    await pages.sac.click('Instructor Assessment Link', AssessmentName);
});

When('I click on {string} in the side nav', async function (question) {
    await pages.sac.click('Question Number', question);
});

Then('I should see {string} as the side nav title', async function (title) {
    await pages.sac.assertElementExists('Side Nav Title', title);
});

Then('I should see {string} as the nav question header', async function (title) {
    await pages.sac.assertElementExists('Nav Question Header Title', title);
});

When('I click on {string} arrow in the nav question header', async function (arrow) {
    await pages.sac.click('Nav Question Header Arrow', arrow);
});

Then('The overall assignment score should be {string}', async function (score) {
    await pages.sac.assertElementExists('OverAll Assessment Score', score);
});

Then('The questions should have the following grades', async function (datatable) {
    for (let data of datatable.hashes()) {
        await pages.sac.assertText('Question Score', data['Question'], data['Grade']);
    }
});

When('I provide the following responses', async function (datatable) {
    for (let data of datatable.hashes()) {
        await pages.sac.click('Question Number', data['Question']);

        switch (data['Module Type']) {
            case 'Multiple Choice':
                await pages.sac.click('Question MC Response', data['Response']);
                break;

            default:
                break;
        }

        if (data['Check Answer'] === 'Yes') {
            await pages.sac.click('Check Answer Button');
        }
    }
});

When('I give up on {string}', async function (question) {
    await pages.sac.click('Question Number', question);
    await pages.sac.click('Give Up Button');
    await pages.sac.click('Confirm Give Up Button');
});

When('I reset attempts for student {string}', async function (student) {
    await sleep(2000);
    await pages.ActivityEditor.click('AE Tab', 'Responses');
    if (await pages.ActivityEditor.checkElementExists('Attempts per Question')) {
        await pages.ActivityEditor.click('Button', 'Edit');
        await pages.ActivityEditor.click('Student Name', student);
        await pages.ActivityEditor.click('Button', 'Reset Attempts');
        await pages.ActivityEditor.click('Button', 'Save');
    }
    await loginpages.login.click('User Menu Button');
    await loginpages.login.click('Logout');
});

When('I remove the following questions from the assessment', async function (datatable) {
    await sleep(2000);
    for (let data of datatable.hashes()) {
        await pages.ActivityEditor.click('AE Tab', 'Custom Questions');
        if (await pages.ActivityEditor.checkElementExists('Question Added', data['Question'])) {
            await pages.ActivityEditor.click('Question More', data['Question']);
            await pages.ActivityEditor.click('More Menu Option', 'Remove From Assessment');
            await pages.ActivityEditor.click('Button', 'Remove Item');
        }
    }
});

When('I add the following questions to the assessment', async function (datatable) {
    await sleep(2000);
    for (let data of datatable.hashes()) {
        await pages.ActivityEditor.click('AE Tab', 'Custom Questions');
        if (!(await pages.ActivityEditor.checkElementExists('Question Added', data['Question']))) {
            await pages.ActivityEditor.click('Question More', data['Question']);
            await pages.ActivityEditor.click('More Menu Option', 'Add to Assessment');
        }
    }
});

When('I navigate to assignment preview', async function () {
    await pages.sac.click('Course Link', 'Raptor Automation - Do Not Delete');
    await pages.sac.click('Instructor Assessment Link', 'All Mods');
    await pages.sac.click('Assignment Preview Button');
    await pages.sac.click('Keep Attempts Button');
});

When('I navigate to assignment and go back to the course landing page', async function () {
    await pages.sac.click('Course Link', 'Raptor Automation - Do Not Delete');
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

Then(/^I am shown the modal indicating this is a late assignment with percentage "(.*)"$/, async function (latePenaltyPercentage) {
    await pages.sac.click('Oops Modal Ok Button');
    let countItems = await pages.sac.getAttributeValue('Items List', 'items', 'childElementCount');
    for (let i = 1; i <= countItems; i++) {
        let strAux = "(" + latePenaltyPercentage + ")";
        await pages.sac.assertText('Item Late label', i, 'Late ' + strAux);
    }
});

When(/^I provide the correct response to the \"([^\"]*)\"$/, async function (question) {
    await pages.sac.click('Question Number', question);
    if (await pages.sac.getText('Check Answer Button') === 'Try Again') {
        await pages.sac.click('Check Answer Button');
    }
    let questionText = await pages.sac.getText('Question 1 Content');
    let factor = questionText.substring('Which of the following is the correct prime factorization of'.length).replace(/[?,\s]+/g, '');
    switch (factor) {
        case "540":
            await pages.sac.click('Question 1 Response', '2 · 2 · 3 · 3 · 3 ·5');
            break;
        case "600":
            await pages.sac.click('Question 1 Response', '2 · 2 · 2 · 3 · 5 ·5');
            break;
        case "900":
            await pages.sac.click('Question 1 Response', '2 · 2 · 3 · 3 · 5 ·5');
            break;
        case "360":
            await pages.sac.click('Question 1 Response', '2 · 2 · 2 · 3 · 3 ·5');
            break;
        case "240":
            await pages.sac.click('Question 1 Response', '2 · 2 · 2 · 2 · 3 ·5');
            break;
        case 'Default':
            break;
    }
    await pages.sac.click('Check Answer Button');
});