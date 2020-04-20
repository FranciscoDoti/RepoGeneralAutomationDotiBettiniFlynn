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
  let moduleId = await pages.createAssessment.getAttributeValue('assessmentID', 'value');
  this.data.set('assessmentID', moduleId);
  this.data.set('assessment_name', assessment_name);

});

When("I add the raptor item created before", async function () {
  await pages.assignmentTab.click("Question Bank Tab");
  await pages.assignmentTab.populate('Filter Input', this.data.get("SmokeTestItem").id);
  await pages.questionBank.click("Item Checkbox", 1);
  await pages.questionBank.click("Add Button");
  await pages.assignmentTab.click("AssignmentTab");
});

Then(/^I verify that the item with title "(.*)" has been added to the assessment$/ , async function(title){
  await pages.assignmentTab.assertText('Items In Assessment Title' , 1, title);
});

When(/^I add "(.*)" random questions to the assessment$/, async function (numberOfQuestionsToAdd) {
  await pages.assignmentTab.click("Question Bank Tab");
  for (let i = 1; i <= numberOfQuestionsToAdd; i++) {
    await pages.questionBank.click("Item Checkbox", i);
  }
  await pages.questionBank.click("Add Button");
  await pages.assignmentTab.click("AssignmentTab");
});

When("I create a new grading Setting", async function () {
  await pages.assignmentTab.click("Grading Settings");
  await pages.gradingSettings.click("Create New Button");
});

When(/^added it to new assessment as pool$/, async function () {
  for (let i = 1; i <= question_count; i++) {
    await pages.customQuestion.click("Items Checkbox", i);
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

When("I open the Student Preview Menu", async function() { 
  await pages.assignmentTab.click('Student Preview');
});


Then('I see the item present in the assessment', async function () {
  await pages.hatchlingItemFrame.click('AE Course Page Tabs', 'link-to-assignment');
  var addedQuestions = CQBTabQuestionSet.values();
  for (let i = 1; i <= CQBTabQuestionSet.size; i++) {
    var entry = addedQuestions.next().value;
    await pages.assignmentTab.assertElementExists('Assessment questions id', entry);
  }
});

Then(/^I navigate to "(.*)" page$/, async function (title) {
  await pages.hatchlingItemFrame.click('AE Course Page Tabs', 'link-to-assignment');
  await pages.assignmentTab.click('Setting Button');
  await pages.settingsPage.assertText('page title', title);
});

When(/^I have added \"([^\"]*)\" custom questions to assessment$/, async function (question_count) {
  await pages.hatchlingItemFrame.waitForElementVisibility('Assessment Title', 'assignment-view-title');
  await pages.hatchlingItemFrame.click('AE Course Page Tabs', 'link-to-customquestions');
  for (let i = 1; i <= question_count; i++) {
    await pages.customQuestion.click("Items Checkbox", i);
    CQBTabQuestionSet.add(await pages.customQuestion.getAttributeValue('Questions Id', i, 'id'))
    await pages.customQuestion.click('Action Bar Buttons', 'Add');
    await pages.customQuestion.waitForElementVisibility("Items Added", i)
  }
});
When(/^I have selected \"([^\"]*)\" custom questions and created a pool$/, async function (question_count) {
  await pages.hatchlingItemFrame.waitForElementVisibility('AE Course Page Tabs', 'link-to-customquestions');
  await pages.hatchlingItemFrame.click('AE Course Page Tabs', 'link-to-customquestions');
  for (let i = 1; i <= question_count; i++) {
    await pages.customQuestion.click("Items Checkbox", i);
    CQBTabQuestionSet.add(await pages.customQuestion.getAttributeValue('Questions Id', i, 'id'))
  }
  await pages.customQuestion.click('Action Bar Buttons', 'Pool');
  await pages.customQuestion.click('Pool Button');
  await pages.hatchlingItemFrame.click('Button', 'Save');
});
Then(/^I verify the created pool is displayed in the assessment$/, async function () {
  var getEntriesArry = CQBTabQuestionSet.values();
  await pages.hatchlingItemFrame.click('AE Course Page Tabs', 'link-to-assignment');
  await pages.assignmentTab.click('pool dropdown');
  for (let i = 1; i <= CQBTabQuestionSet.size; i++) {
    var entry = getEntriesArry.next().value;
    await pages.assignmentTab.assertElementExists('pool questions id', entry);
  }
});
When(/^I select the created assessment$/, async function () {
  let id = this.data.get('assessmentID');
  await pages.createAssessment.click('Created Assessment', id);
});

When('I submit all the questions after attempting', async function () {
  await pages.createAssessment.waitForElementVisibility('Submit Answers', 'submit-assignment-button');
  await pages.createAssessment.click('Submit Answers', 'submit-assignment-button');
  await pages.createAssessment.click('Submit Answers', 'submit-all-modal-submit');
});

Then(/^I verify all the questions grades$/, async function (datatable) {
  await pages.createAssessment.waitForElementVisibility('Submit Answers', 'score-label');
  for (let i = 0; i < datatable.rows().length; i++) {
    let status = datatable.hashes()[i];
    await pages.createAssessment.assertText('Grade Status', status.Question, status.Grade);
  }

});
