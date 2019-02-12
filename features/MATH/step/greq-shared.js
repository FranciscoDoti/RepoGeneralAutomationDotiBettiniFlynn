
const { Given, When, Then } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const URL = require('../../_support/url.js');
const _ = require('lodash');

/* Scenario 1: Verify sapling AMS page is loaded and navigate to AuthorApp page by clicking new Raptor item link */
const shortTimeout = 2000

Given(/^I login to "(.*)" login page as "(.*)"$/, async function (env, user) {
  let qa = new selenium(this.driver);
  let url = await _.get(URL, ['math', env]);
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