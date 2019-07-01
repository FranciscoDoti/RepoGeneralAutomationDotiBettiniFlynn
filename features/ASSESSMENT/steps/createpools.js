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


Then('I see a pool of questions is created in the assessment', async function () {
// Write code here that turns the phrase above into concrete actions
await ngaPages.assignmentTab.click('pool dropdown');
let itemList =  await ngaPages.assignmentTab.getWebElements('pool questions id');
console.log(itemList.length)
for (let i= 1; i <= itemList.length ; i++){
  // var assignmentQuestionIds = await ngaPages.assignmentTab.addDynamicElement('questionsId', i);
  assignmentQuestionSet.add(await ngaPages.assignmentTab.getAttributeValue(itemList[i], 'id'));
}
console.log(assignmentQuestionSet + "               " + CQBTabQuestionSet)
assert.deepEqual(assignmentQuestionSet, CQBTabQuestionSet);
});