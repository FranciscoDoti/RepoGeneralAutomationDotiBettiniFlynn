const { Given, Then } = require('cucumber');
const selenium = require('../../app/selenium.js');
const URL = require('./url.js');
const page = require('../master-page.js');
const assert_text = require('../master-text.js');
const expect = require('chai').expect;
const _ = require('lodash');

// URL Navigation //
Given(/^I have opened "(.*)" "(.*)"$/, async function (system, endpoint) {
  let qa = new selenium(this.driver);
  let url = await _.get(URL, [system, endpoint]);

  await qa.goTo(url);
});

// Page Navigation //
Given(/^I click on "(.*)" system "(.*)" feature "(.*)" element$/, async function (system, feature, element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);

  await qa.click(PAGE);
});

// Load Data Table //
Given('I load a data table', async function (scenario_table) {
  data_table = scenario_table;
});

// Text Assetion //
Then(/^I verify "(.*)" system "(.*)" feature "(.*)" element's "(.*)" message is displayed$/, async function (system, feature, element, text) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);
  let PAGE_TEXT = await qa.getText(PAGE);
  let ASSERT_TEXT = await _.get(assert_text, [system, feature, text]);

  expect(PAGE_TEXT).to.equal(ASSERT_TEXT);
});

// FIXME This needs to be application specific support file
Given('I Sign Out of Achieve', async function () {
  let qa = new selenium(this.driver);

  await qa.click(page.achieve.user.button);
  await qa.click(page.achieve.user.sign_out);
});
