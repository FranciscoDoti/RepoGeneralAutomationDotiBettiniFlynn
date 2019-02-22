/**
 * Test suite to make sure when we log into int and there's no assignments
 * we get an empty assignment view
 *
 * @run node_modules/cucumber/bin/cucumber-js \
 * --env=local \
 * features/ASSESSMENT/test/activity_editor/blank_assessment.feature
 */
const { Given, When } = require('cucumber');
const Selenium = require('../../../app/selenium.js');
const page = require('../../master-page');
const config = require('../../../config');

async function signIntoSapling (driver, username, password) {
  // rewriting this function from IAM's login because the submit button
  // is different than Acheive's

  if (config.environment !== 'local') {
    try {
      await driver.input(page.assessment.signon.username, username, true);
      await driver.input(page.assessment.signon.password, password, true);
      await driver.click(page.assessment.signon.submit);
    } catch (exception) {
      console.log('exceptions logging in!', exception);
    }
  }
};

Given(/^I have logged into Sapling as "(.*)" with password "(.*)"$/, async function (username, password) {
  const driver = new Selenium(this.driver);
  await signIntoSapling(driver, username, password);
});

When(/^I submit a hatchling "(.*)" item$/, async function (hatchlingType) {
  const qa = new Selenium(this.driver);
  await qa.click(page.assessment.hatchling.item_title_edit);
  await qa.input(page.assessment.hatchling.item_title_field, 'Cucumber Test')
  await qa.input(page.assessment.hatchling.question_prompt_field, 'Test Prompt')
  if (hatchlingType === 'multiple_choice') {
    await qa.input(page.assessment.hatchling.multiple_choice.correct_choice, 'Correct Value')
    await qa.click(page.assessment.hatchling.multiple_choice.add_choice_button)
    await qa.click(page.assessment.hatchling.multiple_choice.add_choice_button)
    await qa.input(page.assessment.hatchling.multiple_choice.incorrect_choice, 'Incorrect Value')
  } else if (hatchlingType === 'numeric_entry') {
    // TODO: implement numeric_entry
  }
  await qa.click(page.assessment.hatchling.create_update_button)
});
