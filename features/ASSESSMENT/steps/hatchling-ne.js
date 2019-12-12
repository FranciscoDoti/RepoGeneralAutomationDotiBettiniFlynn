const { When, Then } = require('cucumber')
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { hatchlinglib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When(/^I add the following values to Hatchling NE module on \"([^\"]*)\"$/, async function (assessmentType, datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        let item = datatable.hashes()[i];
        await hatchlinglib.populateNEvalues(item, assessmentType);
    }
});

When(/^I set the hint for Hatchling NE module with following detail on \"([^\"]*)\"$/, async function (assessmentType, datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        let hint = datatable.hashes()[i];
        await hatchlinglib.populateHint(hint, assessmentType);
    }
});

When(/^I add the student feedback with the following details and save feedback and save the NE item on \"([^\"]*)\"$/, async function (assessmentType, datatable) {
    for (let i = 0; i < datatable.rows().length; i++) {
        let studentFeedback = datatable.hashes()[i];
        await hatchlinglib.populateStudentFeedback(studentFeedback, assessmentType);
    } if (assessmentType === 'AMS') {
        await pages.hatchlingItem.click('Button', 'Save');
    } else if (assessmentType === 'AE') {
        await pages.hatchlingItemFrame.click('Button', 'Save');
    }

});
Then(/^I verify the created NE hatchling item is displayed in assessment$/, async function (assessmentType, datatable){
    let questionTitle = await hatchlinglib.populateQuestion(question, assessmentType);
    this.data.set('Question Title', questionTitle);
});