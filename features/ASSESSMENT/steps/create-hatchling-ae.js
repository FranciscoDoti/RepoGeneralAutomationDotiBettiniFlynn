const { When,Then} = require('cucumber')
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { getDriver,sleep } = require(`${process.cwd()}/app/driver`);
var assessment_name;


When(/^I add hatchling item as numeric_entry from activity editor with following details$/, async function (data_table) {
    await pages.newAssessmentModal.click('assessmentModalButtons', 'link-to-assignment');
    await pages.assignmentTab.click('CreateMyOwn');
    await pages.assignmentTab.click('HatchlingQuestionType',"numeric_entry");
    var timeStamp = new Date().getTime();
    assessment_name = "QA_Hatchling_NE" + timeStamp;
    await pages.assignmentTab.click('QuestionTitle');
    await pages.assignmentTab.populate('NETitle',assessment_name);
    var rows = data_table.hashes();
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.assignmentTab.populate(rows[i].field,rows[i].value);
    }
    await pages.assignmentTab.click('Question Prompt Area');
    await pages.assignmentTab.click('ImageButton');
    await pages.assignmentTab.populate('Image Holder',`${process.cwd()}/features/ASSESSMENT/resources/image.png`);
    await pages.assignmentTab.assertExists('Uploaded Image');
    await pages.assignmentTab.click('AddImage');
    await pages.assignmentTab.click('Hint');
    await pages.assignmentTab.populate('HintArea',"X2");
    await pages.assignmentTab.click('HatchlingSave');
});

When(/^I delete all QA added assessments$/, async function () {
    let assessments= await pages.assignmentTab.getWebElements('listAssessments');
    let deleteBtnAssessments=await pages.assignmentTab.getWebElements('listAssessmentsDelete');
    for (let i = 0; i < assessments.length; i++) {
        assessments= await pages.assignmentTab.getWebElements('listAssessments');
       await assessments[0].click();
       deleteBtnAssessments=await pages.assignmentTab.getWebElements('listAssessmentsDelete');
       await deleteBtnAssessments[0].click();
       await pages.assignmentTab.click('SubmitYes');
    }
});

Then(/^I verify NE hatchling item gets created$/, async function () {
    await pages.assignmentTab.assertElementExists('NEAssessment',assessment_name);
});