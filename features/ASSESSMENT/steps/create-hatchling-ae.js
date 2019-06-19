
const { When,And} = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { getDriver,sleep } = require(`${process.cwd()}/app/driver`);
var assessment_name;


When(/^I add hatchling item as "(.*)" from activity editor$/, async function (hatchlingType) {
    await pages.newAssessmentModal.click('assessmentModalButtons', 'link-to-assignment');
    await pages.assignmentTab.click('CreateMyOwn');
    await pages.assignmentTab.click('HatchlingQuestionType',hatchlingType);
    var timeStamp = new Date().getTime();
    assessment_name = "QA_Hatchling_NE" + timeStamp;
    await pages.assignmentTab.click('QuestionTitle');
    await pages.assignmentTab.populate('NETitle',assessment_name);
    await pages.assignmentTab.click('QuestionPromptEditArea');
    await pages.assignmentTab.populate('QuestionPromptEditArea','How many Hatchling NE items are enough?');
    await pages.assignmentTab.click('ImageButton');
    //await pages.assignmentTab.populate('ImageHolder','C:/Users/kaushikbanerjee/Desktop/nga6795.png');
    await pages.assignmentTab.click('AddImage');
    await pages.assignmentTab.populate('targetValue','100000');
    await pages.assignmentTab.populate('Measurement','questions');
    await pages.assignmentTab.populate('DerivationType','Percent ∓');
    await pages.assignmentTab.populate('DerivationAmount','5');
    await pages.assignmentTab.click('HatchlingSave');
});

And(/^I delete all QA added assessments$/, async function () {
    let assessments= await pages.assignmentTab.getWebElements('listAssessments');
    let deleteBtnAssessments=await pages.assignmentTab.getWebElements('listAssessmentsDelete');
    for (let i = 0; i < assessments.length; i++) {
        assessments= await pages.assignmentTab.getWebElements('listAssessments');
       await assessments[0].click();
       deleteBtnAssessments=await pages.assignmentTab.getWebElements('listAssessmentsDelete');
       await deleteBtnAssessments[0].click();
       await pages.assignmentTab.click('SubmitYes');
       await sleep(8000);
    }
});