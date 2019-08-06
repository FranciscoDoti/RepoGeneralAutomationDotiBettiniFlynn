'use strict';
const { Given, When, Then, After } = require('cucumber');
const ngaPages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const mathpages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;
const { sleep } = require(`${process.cwd()}/app/driver`);
var CQBTabQuestionSet = new Set();
var question_count;

Given('I create a new assessment with its necessary details', async function (datatable) {
  await ngaPages.assessmentListPage.assertPageTitleIncludes("Roadshow");
  await ngaPages.assessmentListPage.populate("addAssessment", "Assessment");
  var rows = datatable.hashes();
  for (let i = 0; i < datatable.rows().length; i++) {
    await ngaPages.createAssessment.populate(rows[i].field, rows[i].value);
  }
  await ngaPages.createAssessment.click("saveAndContinue");
  await ngaPages.newAssessmentModal.click('assessmentModalButtons', 'assignment-create-actions-question-bank');
});


When(/^I have created "(.*)" random questions$/, async function (count) {
  question_count = count;
  await ngaPages.customQuestion.click("CustomQuestionTab");
  for (let i = 1; i <= question_count; i++) {
    var item_type = "multiple_choice";
    await ngaPages.customQuestion.click('createQuestionButton');
    await ngaPages.assignmentTab.click('HatchlingQuestionType', item_type);
    var timeStamp = new Date().getTime();
    var title = item_type + timeStamp;
    await ngaPages.hatchlingItem.click('Question Title');
    await ngaPages.hatchlingItem.populate('title', title);
    await ngaPages.hatchlingItem.populate('Question Prompt', 'Automated ' + i + ' hatchling question!');
    await ngaPages.hatchlingItem.click('MCCorrectAnswerTextbox');
    await ngaPages.hatchlingItem.populate('MCCorrectAnswerTextbox', 'Like');
    await ngaPages.hatchlingItem.click('hatchlingBody');
    await ngaPages.hatchlingItem.click('addAnswerButton');
    await ngaPages.hatchlingItem.populate('MCInCorrectAnswerTextbox', 'Unlike');
    await ngaPages.hatchlingItem.click('HatchlingSave');
    await sleep(5000);
  }
});

When(/^added it to assessment$/, async function () {
  for (let i = 1; i <= question_count; i++) {
    await ngaPages.customQuestion.click("Items Checkbox", i);
    CQBTabQuestionSet.add(await ngaPages.customQuestion.getAttributeValue('Questions Id', i, 'id'))
  }
  let actionBarButtonsLabel = await ngaPages.questionBank.getWebElements('QBActionBarButtonsLabel');
  let actionBarButtons = await ngaPages.questionBank.getWebElements('QBActionBarButtons');
  for (let i = 0; i < actionBarButtonsLabel.length; i++) {
    let buttonText = await actionBarButtonsLabel[i].getText();
    if (buttonText === "Add") {
      await actionBarButtons[i].click();
      break;
    }
  }
  await ngaPages.assignmentTab.click('AssignmentTab');
});

When(/^added it to new assessment as pool$/, async function () {
  for (let i = 1; i <= question_count; i++) {
    await ngaPages.customQuestion.click("Items Checkbox", i);
    // var questionIdElement = await ngaPages.customQuestion.addDynamicElement('CQquestionsId', i);
    CQBTabQuestionSet.add(await ngaPages.customQuestion.getAttributeValue('Questions Id', i, 'id'))
  }
  let actionBarButtonsLabel = await ngaPages.questionBank.getWebElements('QBActionBarButtonsLabel');
  let actionBarButtons = await ngaPages.questionBank.getWebElements('QBActionBarButtons');

  for (let i = 0; i < actionBarButtonsLabel.length; i++) {
    let buttonText = await actionBarButtonsLabel[i].getText();
    if (buttonText === "Pool") {
      await actionBarButtons[i].click();
      await ngaPages.customQuestion.click('pool button');
      let poolModalButtons = await ngaPages.customQuestion.getWebElements('pool modal buttons');
      for (let j = 0; j < poolModalButtons.length; j++) {
        let poolButtonText = await poolModalButtons[j].getText();
        if (poolButtonText === "Save") {
          await poolModalButtons[j].click();
        }
      }
      break;
    }
  }
  await ngaPages.assignmentTab.click('AssignmentTab');
});

When(/^I set correct answer "(.*)" for NE "(.*)"$/, async function (value, position) {
  let selectedTabText = await ngaPages.raptor.getText('activeTabEditMode');
  if (selectedTabText !== "correct1") {
    await ngaPages.raptor.click('Tab', 'correct');
  }
  await ngaPages.numericEntry.click('Element', position);
  await ngaPages.numericEntry.populate('Target Value', value);
});

Then('I see the item present in the assessment', async function () {

  let itemList = await ngaPages.assignmentTab.getWebElements('itemList');
  var getEntriesArry = CQBTabQuestionSet.values();
  for (let i = 1; i <= CQBTabQuestionSet.size; i++) {
    var entry = getEntriesArry.next().value;
    await ngaPages.assignmentTab.assertElementExists('Assessment questions id', entry);
  }
  CQBTabQuestionSet.clear();
});

Then('I see a pool of questions is created in the assessment', async function () {
  // Write code here that turns the phrase above into concrete actions
  var getEntriesArry = CQBTabQuestionSet.values();
  await ngaPages.assignmentTab.click('pool dropdown');
  for (let i = 1; i <= CQBTabQuestionSet.size; i++) {
    var entry = getEntriesArry.next().value;
    await ngaPages.assignmentTab.assertElementExists('pool questions id', entry);
  }
  CQBTabQuestionSet.clear();
});

Then('I check NE answers', async function () {
  await mathpages.raptorAms.click('menuBarMore');
  await ngaPages.raptor.click('Check Answer Switch Menu');
  await ngaPages.numericEntry.populate('Numeric Entry 1', '.0258');
  await ngaPages.numericEntry.populate('Numeric Entry 2', '-0.0258');
  await ngaPages.raptor.click('Check Your Work Submit Button');
  await ngaPages.raptor.assertText('activeTabTakeMode', 'correct1');
});