const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const loginpages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);
const { expect } = require('chai');

When('I navigate to {string} assessment link in {string} course', async function (AssessmentName, CourseName) {
    await pages.sac.click('Course Link', CourseName);
    await pages.sac.click('Assessment Link', AssessmentName);
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

Then('The Multiple Choice question {string} should be displayed with',async function (text, datatable) {
    await pages.sac.assertElementExists('Multiple Choice Question Text', text);
    for (let data of datatable.hashes()) {
        await pages.sac.assertElementExists('Multiple Choice Response Label', data['Response']);
    }
});

When('I click on {string} arrow in the nav question header', async function (arrow) {
    if (await pages.sac.checkElementExists('Close Modal Button')) {
        await pages.sac.click('Close Modal Button');
    }
    await pages.sac.click('Nav Question Header Arrow', arrow);
});

Then('The overall assignment score should be {string}', async function (score) {
    await pages.sac.assertElementExists('OverAll Assessment Score', score);
});

Then('The questions should have the following grades', async function (datatable) {
    for (let data of datatable.hashes()) {
        await sleep(2000);
        await pages.sac.assertText('Question Score', data['Question'], data['Grade']);
        if (data['Status'] !== undefined) {
            await pages.sac.assertText('Question Status', data['Question'], data['Status']);
        }
    }
});

When('I provide the following responses', async function (datatable) {
    for (let data of datatable.hashes()) {
        if (data['Question'] !== undefined) {
            await pages.sac.click('Question Number', data['Question']);
            await sleep(3000);  //wait for question to load
        }
        
        if (await pages.sac.checkElementExists('Action Button', 'Try Again')) {
            await pages.sac.click('Action Button', 'Try Again');
        } else if (await pages.sac.checkElementExists('Action Button', 'Resume')) {
            await pages.sac.click('Action Button', 'Resume');
        }

        switch (data['Module Type']) {
            case 'Multiple Choice':
                await pages.sac.click('Multiple Choice Response Label', data['Response']);
                break;

            default:
                break;
        }

        if (data['Check Answer'] === 'Yes') {
            await pages.sac.click('Action Button', 'Check Answer');
            await pages.sac.waitForElementInvisibility('Action Button', 'Please Wait');
        }

        if (data['Save Answer'] === 'Yes') {
            await pages.sac.click('Action Button', 'Save Answer');
            await pages.sac.waitForElementInvisibility('Action Button', 'Saving');
        }

        if (await pages.sac.checkElementExists('Close Modal Button')) {
            await pages.sac.click('Close Modal Button');
        }
    }
});

Then('I verify the following responses are retained', async function (datatable) {
    for (let data of datatable.hashes()) {
        if (data['Question'] !== undefined) {
            await pages.sac.click('Question Number', data['Question']);
            await sleep(3000);  //wait for question to load
        }
        await pages.sac.waitForElementInvisibility('Action Button', 'Please Wait');
        await pages.sac.waitForElementInvisibility('Action Button', 'Saving');
        
        if (data['Attempt'] !== undefined) {
            if (await pages.sac.checkElementExists('Attempts Dropdown')) {
                await pages.sac.click('Attempts Dropdown');
                await pages.sac.click('Attempts Dropdown Option', data['Attempt']);
            }
        }

        switch (data['Module Type']) {
            case 'Multiple Choice':
                let isChecked = (await pages.sac.getAttributeValue('Multiple Choice Input', data['Response'], 'checked'))
                expect(isChecked).to.equal('true');

            default:
                break;
        }
    }
});

When('I give up on {string}', async function (question) {
    await pages.sac.click('Question Number', question);
    await pages.sac.click('Action Button', 'Give Up?');
    await pages.sac.click('Modal Button', 'give up and view solution');
    await pages.sac.waitForElementInvisibility('Action Button', 'Please Wait');
});

When('I reset attempts for student {string}', async function (student) {
    await sleep(2000);
    await pages.ActivityEditor.click('AE Tab', 'Responses');

    if (!(await pages.ActivityEditor.checkElementExists('No Reports Card')) ||
        await pages.ActivityEditor.checkElementExists('Attempts per Question')) {
        await pages.ActivityEditor.click('Button', 'Edit');
        await pages.ActivityEditor.click('Student Name', student);
        await pages.ActivityEditor.click('Button', 'Reset Attempts');
        await pages.ActivityEditor.click('Button', 'Save');
    }
});

When('I remove the following questions from the assessment', async function (datatable) {
    await sleep(2000);
    await pages.ActivityEditor.click('AE Tab', 'Custom Questions');
    await pages.ActivityEditor.waitForElementVisibility('Question Count');

    for (let data of datatable.hashes()) {
        if (await pages.ActivityEditor.checkElementExists('Question Added', data['Question'])) {
            await pages.ActivityEditor.click('Question More', data['Question']);
            await pages.ActivityEditor.click('More Menu Option', 'Remove From Assessment');
            await pages.ActivityEditor.click('Button', 'Remove Item');
        }
    }
});

When('I add the following questions to the assessment', async function (datatable) {
    await sleep(2000);
    await pages.ActivityEditor.click('AE Tab', 'Custom Questions');
    await pages.ActivityEditor.waitForElementVisibility('Question Count');

    for (let data of datatable.hashes()) {
        if (!(await pages.ActivityEditor.checkElementExists('Question Added', data['Question']))) {
            await pages.ActivityEditor.click('Question More', data['Question']);
            await pages.ActivityEditor.click('More Menu Option', 'Add to Assessment');
        }
    }
});

When('I submit the test quiz', async function () {
    await pages.sac.click('Action Button', 'Submit All Questions');
    await pages.sac.click('Modal Button', 'submit final answers');
});

Then('The assignment preview is opened in a new tab', async function () {
    await pages.sac.switchToTab('Sapling Learning Student Assignment Container');
    await pages.sac.assertElementExists('Action Button', 'Check Answer');
});

Then(/^I am shown the modal indicating this is a late assignment with percentage "(.*)"$/, async function (latePenaltyPercentage) {
    await pages.sac.click('Modal Button', 'Ok');
    let countItems = await pages.sac.getAttributeValue('Items List', 'items', 'childElementCount');
    for (let i = 1; i <= countItems; i++) {
        let strAux = "(" + latePenaltyPercentage + ")";
        await pages.sac.assertText('Item Late label', i, 'Late ' + strAux);
    }
});

Then('The selected attempt should be {string}', async function (option) {
    if (option.includes('gave-up')) {
        let text = option.split('gave-up ')[1];
        await pages.sac.assertElementExists('Selected Attempt', text);
        await pages.sac.assertElementExists('Selected Attempt Status', 'gave-up');
    } else if (option.includes('incorrect')) {
        let text = option.split('incorrect ')[1];
        await pages.sac.assertElementExists('Selected Attempt', text);
        await pages.sac.assertElementExists('Selected Attempt Status', 'incorrect');
    } else if (option.includes('correct')) {
        let text = option.split('correct ')[1];
        await pages.sac.assertElementExists('Selected Attempt', text);
        await pages.sac.assertElementExists('Selected Attempt Status', 'correct');
    } else if (option.includes('in-progress')) {
        let text = option.split('in-progress ')[1];
        await pages.sac.assertElementExists('Selected Attempt', text);
        await pages.sac.assertElementExists('Selected Attempt Status', 'in-progress');
    } else {
        await pages.sac.assertElementExists('Selected Attempt', option);
    }
});

Then('The {string} should not be displayed', async function (element) {
    await pages.sac.assertElementDoesNotExist(element);
});

Then('The {string} should be displayed', async function (element) {
    await pages.sac.assertElementExists(element);
});

Then('The {string} named {string} should not be displayed', async function (element, text) {
    await pages.sac.assertElementDoesNotExist(element, text);
});

Then('The {string} named {string} should be displayed', async function (element, text) {
    await pages.sac.assertElementExists(element, text);
});

Then('The {string} for {string} should be {string}', async function (element, question, status) {
    await pages.sac.assertText(element, question, status);
});

Then('The {string} should not be displayed for {string}', async function (Element, question) {
    await pages.sac.assertElementDoesNotExist(Element, question);
});

When('I click on {string} {string}', async function (element, text) {
    await pages.sac.waitForElementVisibility(element, text);
    await pages.sac.click(element, text);
});

Then('Side panel for {string} should display the {string} {string}', async function (question, type, text) {
    await pages.sac.click('Question Number', question);

    if ((await pages.sac.getAttributeValue('Action Button', type, 'aria-expanded')) !== "true") {
        await pages.sac.click('Action Button', type);
    };

    await pages.sac.assertText('Side Panel Content', type.toLowerCase(), text);
});

Then('The {string} score for {string} in the Responses tab should be {string}', async function (type, student, score) {
    // this steps has to be expanded
    await sleep(2000);
    await pages.ActivityEditor.click('AE Tab', 'Responses');
    await pages.ActivityEditor.assertText('Raptor Student Total Score', score);
});