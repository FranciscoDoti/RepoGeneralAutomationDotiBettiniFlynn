/**
 * Test suite to make sure when we log into int and there's no assignments
 * we get an empty assignment view
 *
 * @run node_modules/cucumber/bin/cucumber-js \
 * features/ASSESSMENT/test/activity_editor/int_blank_assessment.feature
 */
const { Given } = require('cucumber');
const Selenium = require('../../../app/selenium.js');
const page = require('../../master-page');

async function signIntoSapling (driver, username, password) {
  // rewriting this function from IAM's login because the submit button
  // is different than Acheive's
  await driver.input(page.iam.login.username, username, true);
  await driver.input(page.iam.login.password, password, true);
  await driver.click(page.assessment.int.submit);
};

Given(/^I have logged into Sapling as "(.*)" with password "(.*)"$/, async function (username, password) {
  const driver = new Selenium(this.driver);

  try {
    await signIntoSapling(driver, username, password);
  } catch (exception) {
    console.log('exceptions logging in!', exception);
  }
});

/*
Given(/^I login on login page as "(.*)"$/, async function (user) {
  const driver = new Selenium(this.driver);

  try {
    let uri = page.assessment['int-login-uri'];
    await driver.goTo(uri);  
  } catch (exception) {
    console.log('exceptions naving to log in!', exception);
  }

  try {
    await driver.input(page.assessment.login.int.username, intCreds[user].username);
    await driver.input(page.assessment.login.int.password, intCreds[user].password);
    await driver.click(page.assessment.login.int.submit);
  } catch (exception) {
    console.log('exception loggin in', exception);
  }
});

Given(/I nav to an empty assessment$/, async function () {
  const driver = new Selenium(this.driver);
  const uri = page.assessment['int-assigment-uri'];

  try {
    await driver.goTo(uri);
  } catch (exception) {
    console.log('exception naving to empty assignment', exception);
  }
});

When(/I click on assignment tab on int$/, async function () {
  const driver = new Selenium(this.driver);

  try {
    await driver.sleep(1);
    driver.click(page.assessment.activityEditor.assignmentTab);
  } catch (exception) {
    console.log('error clicking on assignment tab', exception);
  }
});

Then(/I see no assignments message$/, async function () {
  let driver = new Selenium(this.driver);

  try {
    await driver.exists(page.assessment.activityEditor.empty);
  } catch (exception) {
    console.log('error reading empty assignment view', exception);
  }

});
*/
