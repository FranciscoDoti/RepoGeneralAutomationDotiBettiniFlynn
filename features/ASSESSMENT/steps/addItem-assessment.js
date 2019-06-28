'use strict';
const { Given, When, Then, After}=require('cucumber');
const ngaPages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page`).pages;
const pages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const { visitURL, sleep, getTitle, getDriver} = require(`${process.cwd()}/app/driver`);
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const { assert, expect } = require('chai');
var CQBTabQuestionSet= new Set();
var assignmentQuestionSet = new Set();
var assessment_name="";
var question_count;

Given('I create a new assessment with its necessary details', async function (datatable) {
    // var today = new Date();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    await ngaPages.assessmentListPage.scrollElementIntoView('addAssessment');
    await assert.include(await getTitle(), "Roadshow", "Title is same!"); 
    await ngaPages.assessmentListPage.populate("addAssessment", "Assessment");
    assessment_name = "QAAssessment";
    for (let i = 0; i < datatable.rows().length; i++) {
    await ngaPages.createAssessment.populate('assessmentName', assessment_name);
    // await ngaPages.createAssessment.populate('assessmentDescription', datatable.hashes()[i].Assessment_Description);
  }
    await ngaPages.createAssessment.click("saveAndContinue");
    await ngaPages.newAssessmentModal.click('assessmentModalButtons', 'assignment-create-actions-question-bank');
});


When(/^I have created "(.*)" random questions$/, async function (count) {
    // Create number of items first 
    question_count = count;
    await ngaPages.customQuestion.click("CustomQuestionTab");
    for ( let i =1 ; i <= question_count; i++){
      var item_type = "multiple_choice";
      await ngaPages.customQuestion.click('createQuestionButton');
      await ngaPages.assignmentTab.click('HatchlingQuestionType',item_type);
      var timeStamp = new Date().getTime();
      var title = item_type + timeStamp;
      await ngaPages.hatchlingItem.click('Question Title');
      await ngaPages.hatchlingItem.populate('title',title);   
      await ngaPages.hatchlingItem.populate('Question Prompt','Automated '+ i + ' hatchling question!');
      await ngaPages.hatchlingItem.click('MCCorrectAnswerTextbox');
      await ngaPages.hatchlingItem.populate('MCCorrectAnswerTextbox','Like');
      await ngaPages.hatchlingItem.click('hatchlingBody');
      await ngaPages.hatchlingItem.click('addAnswerButton');
      await ngaPages.hatchlingItem.populate('MCInCorrectAnswerTextbox','Unlike');
      await ngaPages.hatchlingItem.click('HatchlingSave');
      await sleep(5000);
    }
});

When(/^added it to assessment$/, async function () {
  for (let i= 1; i <= question_count ; i++){
    await ngaPages.customQuestion.click("CQBItemsCheckbox", i);
    CQBTabQuestionSet.add(await ngaPages.customQuestion.getAttributeValue('CQquestionsId', i, 'id'))
  }
  let actionBarButtonsLabel = await ngaPages.questionBank.getWebElements('QBActionBarButtonsLabel');
  let actionBarButtons = await ngaPages.questionBank.getWebElements('QBActionBarButtons');
  for (let i = 0; i < actionBarButtonsLabel.length; i++) {
    let buttonText = await actionBarButtonsLabel[i].getText();
    if (buttonText==="Add"){
      await actionBarButtons[i].click();
      break;
    }
  }
  await ngaPages.assignmentTab.click('AssignmentTab');
});


Then('I see the item present in the assessment', async function () {
// Write code here that turns the phrase above into concrete actions
let itemList =  await ngaPages.assignmentTab.getWebElements('itemList');
for (let i= 1; i <= itemList.length-1 ; i++){
  assignmentQuestionSet.add(await ngaPages.assignmentTab.getAttributeValue('questionsId', i, 'id'));
}
assert.deepEqual(assignmentQuestionSet, CQBTabQuestionSet);
});