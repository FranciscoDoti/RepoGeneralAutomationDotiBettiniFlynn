const { When,Then} = require('cucumber')
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { getDriver,sleep } = require(`${process.cwd()}/app/driver`);
var assessment_name;


When(/^I add hatchling item as numeric_entry from "(.*)" with following details$/, async function (tabName,data_table) {
    console.log("Tab name is "+tabName);
    switch(tabName){
        case 'activity editor':
                await pages.newAssessmentModal.click('assessmentModalButtons', 'link-to-assignment');
                await pages.assignmentTab.click('CreateMyOwn');
                break;
        case 'custom question':
                await pages.newAssessmentModal.click('assessmentModalButtons', 'link-to-customquestions');
                await pages.customQuestion.click('createQuestionButton');
                break;
        default:
            console.log('You have not selected correct hatchling creation tab');
    }
    await pages.assignmentTab.click('HatchlingQuestionType',"numeric_entry");
    var timeStamp = new Date().getTime();
    assessment_name = "QA_Hatchling_NE" + timeStamp;
    await pages.hatchlingItem.click('Question Title');
    await pages.assignmentTab.populate('NETitle',assessment_name);
    var rows = data_table.hashes();
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.hatchlingItem.populate(rows[i].field,rows[i].value);
    }
    await pages.hatchlingItem.click('NE Question Area');
    await pages.hatchlingItem.click('ImageButton');
    await pages.hatchlingItem.populate('Image Holder',`${process.cwd()}/features/ASSESSMENT/resources/image.png`);
    await pages.hatchlingItem.assertExists('Uploaded Image');
    await pages.hatchlingItem.click('AddImage');
    await pages.hatchlingItem.click('Hint');
    await pages.hatchlingItem.populate('HintArea',"X2");
    await pages.hatchlingItem.click('HatchlingSave');
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