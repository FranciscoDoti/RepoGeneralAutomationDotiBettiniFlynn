const { Given, Then } = require('cucumber');
const Selenium = require('../../app/selenium.js');
const URL = require('./url.js');
const page = require('../master-page.js');
const assert_text = require('../master-text.js');
const expect = require('chai').expect;
const get = require('lodash/get');

// URL Navigation //
Given(/^I have opened "(.*)" "(.*)"$/, async function (system, endpoint) {
  let qa = new Selenium(this.driver);
  let url = await get(URL, [system, endpoint]);
  await qa.goTo(url);
});

Given(/^I sleep "(.*)" seconds$/, async function (sleepValue) {
  let qa = new Selenium(this.driver);

  await qa.sleep(sleepValue);
});

Given('I login to Achieve', async function () {
  let qa = new Selenium(this.driver);
  let url = await get(URL, ['achieve', 'login']);

  await qa.goTo(url);
  await qa.click(page.course.home.sign_in);
});

// Page Navigation //
Given(/^I click on "(.*)" system "(.*)" feature "(.*)" element$/, async function (system, feature, element) {
  let qa = new Selenium(this.driver);
  let PAGE = await get(page, [system, feature, element]);

  await qa.click(PAGE);
});

// Generic Input //
Given(/^I input "(.*)" into "(.*)" system "(.*)" feature "(.*)" element$/, async function (text, system, feature, element) {
  let qa = new Selenium(this.driver);
  let PAGE = await get(page, [system, feature, element]);

  await qa.input(PAGE, text);
});

// Text Assertion //
Then(/^I verify "(.*)" system "(.*)" feature "(.*)" element's "(.*)" message is displayed$/, async function (system, feature, element, text) {
  let qa = new Selenium(this.driver);
  let PAGE = await get(page, [system, feature, element]);
  let PAGE_TEXT = await qa.getText(PAGE);
  let ASSERT_TEXT = await get(assert_text, [system, feature, text]);
  let close_message = await get(page, [system, 'main', 'close_message']);

  expect(PAGE_TEXT).to.contain(ASSERT_TEXT);
  await qa.click(close_message);
});

Then(/^I verify "(.*)" system "(.*)" feature "(.*)" element's "(.*)" message is displayed on the page$/, async function (system, feature, element, text) {
  let qa = new Selenium(this.driver);
  let PAGE = await get(page, [system, feature, element]);
  let PAGE_TEXT = await qa.getText(PAGE);
  let ASSERT_TEXT = await get(assert_text, [system, feature, text]);

  expect(PAGE_TEXT).to.contain(ASSERT_TEXT);
});

Then('I close the popup message', async function () {
  let qa = new Selenium(this.driver);
  await qa.click(page.iam.main.close_message);
});

// Link Assertion //

Then(/^I verify that "(.*)" system "(.*)" feature "(.*)" element link exists$/, async function (system, feature, element) {
  let qa = new Selenium(this.driver);
  let PAGE = await get(page, [system, feature, element]);
  await qa.linkExists(PAGE);
})

// Element Assertion
Then(/^I verify that "(.*)" system "(.*)" feature "(.*)" element exists$/, async function (system, feature, element) {
  const qa = new Selenium(this.driver);
  const PAGE = await get(page, [system, feature, element]);
  await qa.exists(PAGE);
})

Then(/^I verify that "(.*)" system "(.*)" feature "(.*)" element does not exist$/, async function (system, feature, element) {
  const qa = new Selenium(this.driver);
  const PAGE = await get(page, [system, feature, element]);
  await qa.doesNotExist(PAGE);
})
Then(/^I verify "(.*)" "(.*)" has "(.*)" element$/, async function (system, feature, element) {
  const qa = new Selenium(this.driver);
  await qa.exists(element);
});

// Current Url Assertion (New or Current Window) //

Then(/^I verify that the url "(.*)" is the current url in the "(.*)" window$/, async function (url, window) {
  let qa = new Selenium(this.driver);
  let currentUrl;
  if (window === 'new') {
    // Not sure why this sleep is neccessary but without it the page load gets interupted
    await qa.sleep(3);
    await qa.changeWindow(1);
    currentUrl = await qa.getUrl();
    // await qa.close();
    // await qa.changeWindow(0);
    expect(currentUrl).to.equal(url);
  } else if (window === 'current') {
    currentUrl = await qa.getUrl();
    expect(currentUrl).to.equal(url);
  }
})

Then(/^I verify the uri "(.*)" "(.*)" for the "(.*)" window$/, async function (system, endpoint, window) {
  let qa = new Selenium(this.driver);
  let currentUri = null;
  let expectedUri = await get(URL, [system, endpoint]);

  if (window === 'new') {
    await qa.sleep(3);
    await qa.changeWindow(1);
    currentUri = await qa.getUrl();

    expect(currentUri).to.equal(expectedUri);
    return;
  }

  // handle current window
  currentUri = await qa.getUrl();
  expect(currentUri).to.equal(expectedUri);
})
// Checkbox assertion //

Then(/^I verify the "(.*)" system "(.*)" feature "(.*)" element checkbox is "(.*)"$/, async function (feature, screen, element, checked) {
  let qa = new Selenium(this.driver);
  let PAGE = await get(page, [feature, screen, element])
  let optInBoolean = await qa.getAttribute(PAGE, 'selected');
  if (checked === 'checked') {
    expect(optInBoolean).to.equal('true');
  } else if (checked === 'not checked') {
    expect(optInBoolean).to.equal(null);
  }
});

// Generic Disabled Attribute Assertion //

Then(/^I verify the "(.*)" system "(.*)" feature "(.*)" element is "(.*)"$/, async function (feature, screen, element, disabled) {
  let qa = new Selenium(this.driver);
  let PAGE = await get(page, [feature, screen, element])
  let optInBoolean = await qa.getAttribute(PAGE, 'disabled');
  if (disabled === 'disabled') {
    expect(optInBoolean).to.equal('true');
  } else if (disabled === 'not disabled') {
    expect(optInBoolean).to.equal(null);
  }
});
