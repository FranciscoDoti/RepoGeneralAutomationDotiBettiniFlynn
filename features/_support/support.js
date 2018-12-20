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

Given("I login to Achieve", async function () {
  let qa = new selenium(this.driver);
  let url = await _.get(URL, ["achieve", "login"]);

  await qa.goTo(url);
  await qa.click(page.iam.home.sign_in);
});

// Page Navigation //
Given(/^I click on "(.*)" system "(.*)" feature "(.*)" element$/, async function (system, feature, element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);

  await qa.click(PAGE);
});

// Generic Input //
Given(/^I input "(.*)" into "(.*)" system "(.*)" feature "(.*)" element$/, async function (text, system, feature, element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);

  await qa.input(PAGE, text);
});

// Text Assertion //
Then(/^I verify "(.*)" system "(.*)" feature "(.*)" element's "(.*)" message is displayed$/, async function (system, feature, element, text) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);
  let PAGE_TEXT = await qa.getText(PAGE);
  let ASSERT_TEXT = await _.get(assert_text, [system, feature, text]);

  expect(PAGE_TEXT).to.contain(ASSERT_TEXT);
});

// Link Assertion //

Then(/^I verify that "(.*)" system "(.*)" feature "(.*)" element link exists$/, async function(system, feature, element) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [system, feature, element]);
  qa.linkExists(PAGE);
})

// Current Url Assertion (New Window) //

Then(/^I verify that the url "(.*)" is the current url in the new window$/, async function(URL) {
  let qa = new selenium(this.driver);
  //Not sure why this sleep is neccessary but without it the page load gets interupted
  await qa.sleep(3)
  await qa.changeWindow(1)
  let CURRENTURL = await qa.getUrl()
  await qa.changeWindow(0)
  expect(CURRENTURL).to.equal(URL);
})

// Current Url Assertion //

Then(/^I verify that the url "(.*)" is the current url$/, async function(URL) {
  let qa = new selenium(this.driver);
  let CURRENTURL = await qa.getUrl()
  expect(CURRENTURL).to.equal(URL);
})

// Checkbox assertion //

Then(/^I verify the "(.*)" system "(.*)" feature "(.*)" element checkbox checked is "(.*)"$/, async function (feature, screen, element, checked) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [feature, screen, element])
  let optInBoolean = await qa.getAttribute(PAGE, 'selected');
  if(checked === 'true'){
      expect(optInBoolean).to.equal('true');
  } else if (checked === 'false') {
      expect(optInBoolean).to.equal(null);
  }
});

// Generic Disabled Attribute Assertion //

Then(/^I verify the "(.*)" system "(.*)" feature "(.*)" element disabled attribute is "(.*)"$/, async function (feature, screen, element, disabled) {
  let qa = new selenium(this.driver);
  let PAGE = await _.get(page, [feature, screen, element])
  let optInBoolean = await qa.getAttribute(PAGE, 'disabled');
  if (disabled === 'true'){
      expect(optInBoolean).to.equal('true');
  } else if (disabled === 'false') {
      expect(optInBoolean).to.equal(null);
  }
});