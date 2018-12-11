const { Given, Then } = require('cucumber');
const selenium = require('../../app/selenium.js');
const page = require('../master-page.js');
const URL = require('./url.js');
const text_assert = require('../../data/assert/text.js');
const expect = require('chai').expect;
const _ = require('lodash');


// URL Navigation //
Given(/^I have opened "(.*)" "(.*)"$/, async function(feature, endpoint) {
  let qa = new selenium(this.driver);
  let url = await _.get(URL, [feature, endpoint]);

  await qa.goTo(url);
});


// Page Navigation //
Given(/^I click on "(.*)" feature "(.*)" screen "(.*)" element$/, async function(feature, screen, element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [feature, screen, element]);

  await qa.click(PAGE);
});


// Load Data Table //
Given('I load a data table', async function(scenario_table) {
  data_table = scenario_table;
});


// Text Assetion //
Then(/^I verify "(.*)" feature "(.*)" message is displayed$/, async function(feature, text) {
  let qa = new selenium(this.driver);
  let TEXT_ASSERT = await _.get(text_assert, [feature, text]);

  let PAGE_TEXT = await qa.getText(page.iam.login.error_text);
  expect(PAGE_TEXT).to.equal(TEXT_ASSERT);
});


//FIXME This needs to be application specific support file
// use this step to delete the course and comment it when you are not using
// ( example is available in Qual_Pm, Quant_Pm)
Given('I click on delete the course', async function() {
  await pages.navigation.populate('Delete_course', 'click');
  await pages.navigation.populate('Confirm_Delete_course', 'click');
});

//FIXME This needs to be application specific support file
Given('I Sign Out of Achieve', async function() {
  let qa = new selenium(this.driver);

  await qa.click(page.achieve.user.button);
  await qa.click(page.achieve.user.sign_out);
});
