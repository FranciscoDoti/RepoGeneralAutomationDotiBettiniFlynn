'use strict';
const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);
var CQBTabQuestionSet = new Set();
var question_count;
var assessment_name;

Given('I create a new assessment with its necessary details', async function (datatable) {
  await pages.assessmentListPage.assertPageTitleIncludes("Roadshow");
  await pages.assessmentListPage.populate("addAssessment", "Assessment");
  var rows = datatable.hashes();
  for (let i = 0; i < datatable.rows().length; i++) {
    assessment_name = rows[i].value;
    await pages.createAssessment.populate(rows[i].field, assessment_name);
  }
  await pages.createAssessment.click("saveAndContinue");
  await pages.hatchlingItemFrame.click('AE Course Page Tabs', 'link-to-customquestions');
  this.data.set('assessment_name', assessment_name);
});

When(/^added it to new assessment as pool$/, async function () {
  for (let i = 1; i <= question_count; i++) {
    await pages.customQuestion.click("Items Checkbox", i);
    // var questionIdElement = await pages.customQuestion.addDynamicElement('CQquestionsId', i);
    CQBTabQuestionSet.add(await pages.customQuestion.getAttributeValue('Questions Id', i, 'id'))
  }
  let actionBarButtonsLabel = await pages.questionBank.getWebElements('QBActionBarButtonsLabel');
  let actionBarButtons = await pages.questionBank.getWebElements('QBActionBarButtons');

  for (let i = 0; i < actionBarButtonsLabel.length; i++) {
    let buttonText = await actionBarButtonsLabel[i].getText();
    if (buttonText === "Pool") {
      await actionBarButtons[i].click();
      await pages.customQuestion.click('pool button');
      let poolModalButtons = await pages.customQuestion.getWebElements('pool modal buttons');
      for (let j = 0; j < poolModalButtons.length; j++) {
        let poolButtonText = await poolModalButtons[j].getText();
        if (poolButtonText === "Save") {
          await poolModalButtons[j].click();
        }
      }
      break;
    }
  }
  await pages.assignmentTab.click('AssignmentTab');
});

Then('I see the item present in the assessment', async function () {
  await pages.hatchlingItemFrame.click('AE Course Page Tabs', 'link-to-assignment');
  var addedQuestions = CQBTabQuestionSet.values();
  for (let i = 1; i <= CQBTabQuestionSet.size; i++) {
    var entry = addedQuestions.next().value;
    await pages.assignmentTab.assertElementExists('Assessment questions id', entry);
  }
});

Then('I see a pool of questions is created in the assessment', async function () {
  var getEntriesArry = CQBTabQuestionSet.values();
  await pages.assignmentTab.click('pool dropdown');
  for (let i = 1; i <= CQBTabQuestionSet.size; i++) {
    var entry = getEntriesArry.next().value;
    await pages.assignmentTab.assertElementExists('pool questions id', entry);
  }
});

When(/^I select "(.*)" option for the assessment$/, async function (settings_button) {
  await pages.assignmentTab.click('Setting Button');
});

Then(/^I navigate to "(.*)" page$/, async function (title) {
  await pages.settingsPage.assertText('page title', title);
});

When(/^I have added \"([^\"]*)\" custom questions to assessment$/, async function (question_count) {
  for (let i = 1; i <= question_count; i++) {
    await pages.customQuestion.click("Items Checkbox", i);
    CQBTabQuestionSet.add(await pages.customQuestion.getAttributeValue('Questions Id', i, 'id'))
    await pages.customQuestion.click('Action Bar Buttons', 'Add');
  }
});
