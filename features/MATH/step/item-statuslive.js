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
let itemid = " "
let fs = require('fs');

/* Scenario 1: User creates and saves a new AMS raptor item and sets the item status to live */
const shortTimeout = 2000

When(/^I am on the AMS page and click open a saved raptor item$/, async function () {
    let qa = new selenium(this.driver);

    // reading item id number from file
    let savedItemId = fs.readFileSync("raptor-itemId.txt").toString();
    await qa.input(page.math.ams.filterSearch, savedItemId);
    await qa.click(`a[data-test-id='item-${savedItemId}']`);  
  });
  
When(/^I set the item status to live$/, async function () {
    let qa = new selenium(this.driver);
    await qa.input(page.math.ams.itemStatus, "Live");
    await qa.click(page.math.ams.itemStatus);
    await qa.click(page.math.ams.modalSave);
  });

Then(/^I verify the item in "(.*)" system, with "(.*)" feature, reflects status update in "(.*)" element$/, async function (system, feature, element) {
    let qa = new selenium(this.driver); 
    let pageElement = await _.get(page, [system, feature, element]);
    let pageText = await qa.getText(pageElement);
    expect(assert_text.math.statusUpdate).to.include(pageText);     
  });