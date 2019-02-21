
const {When, Then } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const { Key } = require('selenium-webdriver')
const shortTimeout = 2000


/* Creating a new AMS raptor item for different Eval types: Relation, Expression */


When(/^I select Graded equation and save as "(.*)"$/, async function (name) {
  let qa = new selenium(this.driver);
  await qa.input(page.math.raptorAms.titleName, name, true);
  await qa.click(page.math.raptorAms.moduleTab);
  await qa.click(page.math.raptorAms.gradedEquationButtonlink);
  await qa.exists(page.math.raptorAms.questionTab);
});

When(/^I click on the Question tab, and add an Answer field$/, async function () {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.questionContent);
});

When(/^I set the grade as "(.*)" type and input "(.*)"$/, async function (eval, eqn) {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.correctTab);
  await qa.input(page.math.raptorAms.gradeAs, eval);
  await qa.click(page.math.raptorAms.gradeAs);
  for (let i = 0; i< eqn.length; i++) {
    const expr = eqn.charAt(i);
    await qa.sendKeys(page.math.raptorAms.equationField, Key.RETURN)
    await qa.sendKeys(page.math.raptorAms.equationField, Key.BACK_SPACE)
    await qa.executeScript(`const ta=document.querySelectorAll('textarea.ace_text-input'); ta[1].value='${expr}'; ta[1].dispatchEvent(new Event('input'))`);
  }
  for (let i = 0; i< eqn.length; i++) {
    const expr = eqn.charAt(i);
    await qa.sendKeys(page.math.raptorAms.prefixField, Key.RETURN)
    await qa.sendKeys(page.math.raptorAms.prefixField, Key.BACK_SPACE)
    await qa.executeScript(`const ta=document.querySelectorAll('textarea.ace_text-input'); ta[0].value='${expr}'; ta[0].dispatchEvent(new Event('input'))`);
  }
});

When(/^I save the question$/, async function () {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.saveButton);
  await qa.sleep(1);
});

When(/^I am in Take Mode and input the correct "(.*)"$/, async function (eqn) {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.takeModeButton);
  await qa.click(page.math.raptorAms.takeModeAnswerText1);
  for (let i = 0; i< eqn.length; i++) {
    const token = eqn.charAt(i);
    const exp = token === '+' ? 'add' : token
    await qa.click(page.math.paletteBasic[exp]);
  }
});

When(/^I simulate grading$/, async function () {
  let qa = new selenium(this.driver);
  await qa.click(page.math.raptorAms.simulateButton);
});

Then(/^My answer is graded correctly$/, async function () {
  let qa = new selenium(this.driver);
  await qa.exists(page.math.raptorAms.gradedCorrect, shortTimeout);
});