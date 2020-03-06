const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const loginpages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);
let scores = [];

When(/^I \"([^\"]*)\" for the \"([^\"]*)\"$/, async function (resetattempts, student) {
    await sleep(2000); //WaitForElement is not working here
    if (await pages.sacResponse.getText('AE Course Page Tabs Texts', 'link-to-assignment') === '4') {
        await pages.sacResponse.click('AE Course Page Tabs', 'link-to-customquestions');
        await pages.sacResponse.click('Question Checkbox', 'Q5');
        await pages.sacResponse.click('Action Bar Buttons', 'Add');
    }
    await pages.sacResponse.click('AE Course Page Tabs', 'link-to-responses');
    try {
        if (await pages.sacResponse.getText('Performance overview tab') === 'Attempts per Question') {
            await pages.sacResponse.click('Response tab buttons', 'Edit');
            await pages.sacResponse.click('Student name in responses tab', student);
            await pages.sacResponse.click('Response tab buttons', resetattempts);
            await pages.sacResponse.click('Response tab buttons', 'Save');
        }
    } catch (err) { }

    finally {
        await loginpages.login.click('User Menu Button');
        await loginpages.login.click('Logout Menu');
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

When('I navigate to assessment', async function () {
    await pages.sac.click('Course Link', 'Raptor Automation - Do Not Delete');
    await pages.sac.click('Student Assessment Link');
});

When('I answer questions', async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        await pages.sac.click('Question Button', datatable.hashes()[i].Question);
        switch (datatable.hashes()[i].Type) {
            case "MC":
                let correct = false;
                let option = 1;
                let score = 100;
                // In this loop I select and check every answer from the first one to the last one
                while (!correct) {
                    await pages.sac.click('Sample Assessment Question Radio Button', option);
                    await pages.sac.click('Check Answer Button');
                    let buttonText = await pages.sac.getText('Check Answer Button');
                    // This commented loop is to wait the button to be ready to click so I know if the answer was correct or incorrect
                    while (buttonText == "Please Wait") {
                        buttonText = await pages.sac.getText('Check Answer Button');
                    }
                    if (buttonText == 'Try Again') { //Wrong answer
                        score -= 5;
                        await pages.sac.click('Check Answer Button');
                    } else {
                        correct = true;
                    }
                    option++;
                }
                await pages.sac.click('View Solution Button');
                scores[i] = score + "%";
                break;
            case "DD":
                await pages.sac.click('Check Answer Button');
                let buttonText = await pages.sac.getText('Check Answer Button');
                // This commented loop is to wait for the server response and then I can click the Give Up button
                while (buttonText == "Please Wait") {
                    buttonText = await pages.sac.getText('Check Answer Button');
                }
                await pages.sac.click('Give Up Button');
                await pages.sac.click('Confirm Give Up Button');
                scores[i] = "0%";
                break;
        }
    }

});

Then('I verify grades for answers', async function () {
    for (let i = 0; i < scores.length; i++) {
        await pages.sac.assertText('Answer Score', i + 1, scores[i]);
    }
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
Then(/^I verify that new assignment should have an overall assignment score of \"([^\"]*)\"$/, async function (overallScore) {
    await pages.sac.assertElementExists('OverAll Assessment Score', overallScore);
})
When(/^I provide the incorrect \"([^\"]*)\" response to the \"([^\"]*)\"$/, async function (incorrectResponse, question) {
    await pages.sac.click('Question Number', question);
    await pages.sac.click('Question 1 Response', incorrectResponse);
    await pages.sac.click('Check Answer Button');
})
Then(/^The Question grade should be \"([^\"]*)\" and Assignment grade should be \"([^\"]*)\"$/, async function (QuestionGrade, AssessmentGrade) {
    await pages.sac.assertElementExists('Question 1 Score', QuestionGrade);
    await pages.sac.assertElementExists('OverAll Assessment Score', AssessmentGrade);
})
When('I Give up on the Question 1', async function () {
    await pages.sac.click('Give Up Button');
    await pages.sac.click('Confirm Give Up Button');
})
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
})
When(/^I provide the following responses to the following questions$/, async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        let val = datatable.hashes()[i];
        await pages.sac.click('Question Number', val.Question);
        await pages.sac.click('Question 1 Response', val.Response);
        await pages.sac.click('Check Answer Button');
        await pages.sac.click('Next Question Button');
    }
})
Then(/^The Question grade should have the following grade and Assignment grade should be \"([^\"]*)\"$/, async function (AssessmentGrade, datatable) {
    await pages.sac.assertElementExists('OverAll Assessment Score', AssessmentGrade);
    for (let i = 0; i < datatable.rows().length; i++) {
        let questionGrade = datatable.hashes()[i];
        await pages.sac.assertElementExists('Question 1 Score', questionGrade['Question 1']);
        await pages.sac.assertElementExists('Question 2 Score', questionGrade['Question 2']);
        await pages.sac.assertElementExists('Question 3 Score', questionGrade['Question 3']);
        await pages.sac.assertElementExists('Question 4 Score', questionGrade['Question 4']);
        if (await pages.sac.getText('Side Nav Title Text') === '5 of 5 Questions') {
            await pages.sac.assertElementExists('Question 5 Score', questionGrade['Question 5']);
        }

    }
})
When(/^I \"([^\"]*)\" Question \"([^\"]*)\" from the assessment$/, async function (Action, questionNo) {
    await pages.sacResponse.click('Question Checkbox', questionNo);
    await pages.sacResponse.click('Action Bar Buttons', Action);
    await pages.sacResponse.click('Confirm Remove Item Button');
})