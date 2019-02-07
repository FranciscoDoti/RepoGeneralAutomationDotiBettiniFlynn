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
const { environment } = require('../../../config');

async function signIntoSapling (driver, username, password) {
  // rewriting this function from IAM's login because the submit button
  // is different than Acheive's
  const pagePath = page.assessment[`${environment}`];
  await driver.input(pagePath.username, username, true);
  await driver.input(pagePath.password, password, true);
  await driver.click(pagePath.submit);
};

Given(/^I have logged into Sapling as "(.*)" with password "(.*)"$/, async function (username, password) {
  const driver = new Selenium(this.driver);

  if (environment === 'int') {
    try {
      await signIntoSapling(driver, username, password);
    } catch (exception) {
      console.log('exceptions logging in!', exception);
    }
  }
});
