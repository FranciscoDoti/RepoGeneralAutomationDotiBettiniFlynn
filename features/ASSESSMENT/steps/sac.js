const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const loginPages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);
let scores = [];

When('I navigate to assignment preview', async function () {
    await pages.sac.click('courseLink');
    await pages.sac.click('assignmentLink');
    await pages.sac.click('assignmentPreviewButton');
});

Then('The assignment preview is opened in a new tab', async function () {
    await pages.sac.switchToTab('Sapling Learning Student Assignment Container');
    await pages.sac.assertElementExists('previewCheckAnswerButton');
});

When(/^I reset attempts from student "(.*)"$/, async function (userType) {
    await pages.sac.click('courseLink');
    await pages.sac.click('assignmentLink');
    await pages.sac.assertElementExists('studentAnalysisTab');
    await pages.sac.click('studentAnalysisTab');
    await pages.sac.click('editStudentAttemptsButton');

    let user = await _.get(users, [this.environment, userType]);
    let name = user.firstName + " " + user.lastName;
    await pages.sac.click('studentCheckbox', name);

    await pages.sac.click('resetStudentAttemptsButton');
    await pages.sac.click('saveStudentAttemptsButton');
});

When('I navigate to assessment', async function (datatable) {
    await pages.sac.click('courseLink');
    await pages.sac.click('assignmentLink');
});

When('I answer questions', async function (datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        await pages.sac.click('questionButton', datatable.hashes()[i].Question);
        switch (datatable.hashes()[i].Type) {
            case "MC":
                let correct = false;
                let option = 1;
                let score = 100;
                while (!correct) {
                    await pages.sac.click('sampleAssessmentQuestionRadioButton', option);
                    await pages.sac.click('checkAnswerButton');
                    let buttonText = await pages.sac.getText('checkAnswerButton');
                    while (buttonText == "Please Wait") {
                        buttonText = await pages.sac.getText('checkAnswerButton');
                    }
                    if (buttonText == 'Try Again') { //Wrong answer
                        score -= 5;
                        await pages.sac.click('checkAnswerButton');
                    } else {
                        correct = true;
                    }
                    option++;
                }
                await pages.sac.click('viewSolutionButton');
                scores[i] = score + "/100";
                break;
            case "DD":
                await pages.sac.click('checkAnswerButton');
                let buttonText = await pages.sac.getText('checkAnswerButton');
                while (buttonText == "Please Wait") {
                    buttonText = await pages.sac.getText('checkAnswerButton');
                }
                await pages.sac.click('giveUpButton');
                await pages.sac.click('confirmGiveUpButton');
                scores[i] = "0/100";
                break;
        }
    }

});

Then('I verify grades for answers', async function () {
    for (let i = 0; i < scores.length; i++) {
        await pages.sac.assertText('answerScore', i + 1, scores[i]);
    }
});
