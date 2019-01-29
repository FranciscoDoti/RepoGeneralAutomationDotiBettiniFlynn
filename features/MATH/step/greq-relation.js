
const { Given, When, Then, And, After } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const URL = require('../../_support/url.js');
const assert_text = require('../../../features/master-text.js');
const format = require('string-format');
const expect = require('chai').expect;
const _ = require('lodash');
const config = require('../../../config.js');
const { Key } = require('selenium-webdriver')

/* Scenario 1: Verify sapling AMS page is loaded and navigate to AuthorApp page by clicking new Raptor item link */
const shortTimeout = 2000

Given(/^I login to "(.*)" login page as "(.*)"$/, async function(env, user) {
  let qa = new selenium(this.driver);
  let url = await _.get(URL, ["math", env]);
  await qa.goTo(url);
  let account = require(`../_data/users/${env}-${user}.json`);
  await qa.input(page.math.login[env].username, account.username, true);
  await qa.input(page.math.login[env].password, account.password, true);
  await qa.click(page.math.login[env].submit);
  if (env === 'local') {
    await qa.click(page.math.login[env].amslink); 
  }
});

When(/^I am in the AMS page$/, async function () {
  let qa = new selenium(this.driver);
  await qa.exists(page.math.raptorAms.raptorNewItem);
});

When(/^I click on the New Raptor item$/, async function () {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.raptorNewItem);
});


When(/^I am on the AuthorApp item page$/, async function () {
  let qa = new selenium(this.driver);
  await qa.changeWindow(1);
  await qa.exists(page.math.raptorAms.titleName);
});

When(/^I select Graded equation and save as "(.*)"$/, async function (name) {
  let qa = new selenium(this.driver);
  await qa.input(page.math.raptorAms.titleName, name, true);
  await qa.click(page.math.raptorAms.moduleTab);
  await qa.exists(page.math.raptorAms.gradedEquationButtonlink);
  await qa.click(page.math.raptorAms.gradedEquationButtonlink);
  await qa.exists(page.math.raptorAms.questionTab);

});

When(/^I click on the Question tab, and add an Answer field$/, async function () {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.questionContent);
});

When(/^I set the grade as Relation type and input "(.*)" equation$/, async function (eval) {
  let qa = new selenium(this.driver);
  let evalGrade = require(`../_data/${eval}.json`);
  await qa.exists(page.math.raptorAms.correctTab);
  await qa.click(page.math.raptorAms.correctTab);
  await qa.input(page.math.raptorAms.gradeAs, 'Relation');
  await qa.click(page.math.raptorAms.gradeAs);
  await qa.sendKeys(page.math.raptorAms.text1, Key.RETURN)
  await qa.sendKeys(page.math.raptorAms.text1, Key.BACK_SPACE)
  await qa.executeScript(`const ta=document.querySelectorAll('textarea.ace_text-input'); ta[1].value='${evalGrade.EvalQ1.Equation}'; ta[1].dispatchEvent(new Event('input'))`);
  await qa.sendKeys(page.math.raptorAms.text2, Key.RETURN)
  await qa.sendKeys(page.math.raptorAms.text2, Key.BACK_SPACE)
  await qa.executeScript(`const ta=document.querySelectorAll('textarea.ace_text-input'); ta[0].value='${evalGrade.EvalQ1.Equation}'; ta[0].dispatchEvent(new Event('input'))`);
});

When(/^I save the module$/, async function () {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.saveButton);
  // have to add sleep after save as there is no easy way to determine if save is done
  // one technique is to verify the "Save popup" appeared and disappeared
  await qa.sleep(1);
});

When(/^I am in Take Mode and input the correct answer$/, async function () {
  let qa = new selenium(this.driver);

  await qa.click(page.math.raptorAms.takeModeButton);
  await qa.click(page.math.raptorAms.takeModeAnswerText);
  await qa.click(page.math.raptorAms.takeModeAnswer2);
  await qa.click(page.math.raptorAms.takeModeAnswerX);
  await qa.click(page.math.raptorAms.takeModeAnswerPlus);
  await qa.click(page.math.raptorAms.takeModeAnswer2);
  await qa.click(page.math.raptorAms.takeModeAnswer6);
  await qa.click(page.math.raptorAms.takeModeAnswerEqual);
  await qa.click(page.math.raptorAms.takeModeAnswer0);

});

When(/^I simulate grading$/, async function(){
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.simulateButton);
});

Then(/^My answer is graded correctly$/, async function () {
  let qa = new selenium(this.driver);
  await qa.exists(page.math.raptorAms.gradedCorrect, shortTimeout);
});