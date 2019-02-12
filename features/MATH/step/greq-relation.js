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

When(/^I save the question$/, async function () {
    let qa = new selenium(this.driver);
    await qa.click(page.math.raptorAms.saveButton);
    // have to add sleep after save as there is no easy way to determine if save is done
    // one technique is to verify the "Save popup" appeared and disappeare
    await qa.sleep(1);
  });

When(/^I am in Take Mode and input the correct equation "(.*)"$/, async function (eqn) {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.takeModeButton);
  await qa.click(page.math.raptorAms.takeModeAnswerText1);
  for(let i = 0; i< eqn.length; i++){
    const token = eqn.charAt(i);
    const exp = token === '+' ? 'add' : token 
    await qa.click(page.math.paletteBasic[exp]);
  }
});

When(/^I simulate grading$/, async function(){
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.simulateButton);
});

Then(/^My answer is graded correctly$/, async function () {
  let qa = new selenium(this.driver);
  await qa.exists(page.math.raptorAms.gradedCorrect, shortTimeout);
});