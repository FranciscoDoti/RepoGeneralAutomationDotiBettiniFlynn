
const { When} = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { getDriver,sleep } = require(`${process.cwd()}/app/driver`);
var assessment_name;


When(/^I add hatchling item as "(.*)" from activity editor$/, async function (hatchlingType) {
    await pages.newAssessmentModal.click('assessmentModalButtons', 'link-to-assignment');
    await pages.assignmentTab.click('CreateMyOwn');
    await pages.assignmentTab.click('HatchlingQuestionType',hatchlingType);
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    assessment_name = "QA Hatchling NE Test Item from AE" + time;
    await pages.assignmentTab.click('QuestionTitle');
    await pages.assignmentTab.populate('NETitle',assessment_name);
    await pages.assignmentTab.populate('QuestionPromptEditArea','Hello');
    await pages.assignmentTab.click('QuestionPromptEditArea');
    await pages.assignmentTab.click('ImageButton');
    await pages.assignmentTab.populate('ImageHolder','C:/Users/kaushikbanerjee/Desktop/nga6795.png');
    await pages.assignmentTab.click('AddImage');
    await pages.assignmentTab.populate('targetValue','100000');
    await pages.assignmentTab.populate('Measurement','questions');
    await pages.assignmentTab.populate('DerivationType','Percent ∓');
    await pages.assignmentTab.populate('DerivationAmount','5');
    await pages.assignmentTab.click('Hint');
});