'use strict';
const { When, Then } = require('cucumber');
const path = require('path');
const pagePath = process.cwd() + '/features/pageDefs/';

const { log } = require('../app/logger');
const { PageObject } = require('../app/pageObject');
const StringProcessing = require('../app/stringProcessing');
const ScenarioData = require('../app/scenarioData');

let pages = {
  createAccount: new PageObject('createAccount.json', pagePath),
 // login: new PageObject('loginPages.json', stepsPath),
  navigation: new PageObject('navigation.json', pagePath)
};

When(/^I want to test (.*) and (.*)$/, async function (user, random) {
  var that = {
    ScenarioData: ScenarioData
  };
  let sp = StringProcessing(that.ScenarioData);

  let username = sp.strEval(user);
  let somerandom = sp.strEval(random);
  log.debug(`Finished ${username} - ${somerandom}`);
});

When(/^I want to load (.*) from json$/, async function (dataFileAndField) {
  const that = {
    ScenarioData: ScenarioData
  };
  let sp = StringProcessing(that.ScenarioData);
  let fieldValue = sp.strEval(dataFileAndField);
  log.debug(`Got Data Field ${dataFileAndField} - ${fieldValue}`);
});

Then(/^I want assert "(.*)" matches "(.*)"$/, async function (dataFileAndField, assertValue) {
  const authAdmin = new PageObject('mainPage.json', pagePath)
  await authAdmin.assertText(dataFileAndField, assertValue);
  log.debug(`Asserted Data Field ${dataFileAndField} - ${assertValue}`);
});

Then(/^I visually confirm that date (.*) will /, async function (date) {
  let that = {ScenarioData};
  let sp = StringProcessing(that.ScenarioData);
  let datetime = new Date(sp.strEval(date))
  log.debug(`-----`);
  log.debug(datetime)
  log.debug(`-----`);
});

Then(/^I visually confirm it failed that login data is bad (.*) has error /, async function (login) {
  let that = {ScenarioData};
  let sp = StringProcessing(that.ScenarioData);
  let username = sp.strEval(login);
  if (!username) {
    throw new Error(`Nothing was found for: ${login}`);
  }
  log.debug(`Found username ${username} from ${login}`);
});

Then(/^I visually confirm that login data (.*) /, async function (login) {
  let that = {ScenarioData};
  let sp = StringProcessing(that.ScenarioData);
  let username = sp.strEval(login);
  log.debug(`Found username ${username} from ${login}`);
});

Then(/^I generate a dataTabe for this page Object/, async function () {
  var returnString = pages.navigation.generateDataTable(25);
  console.log (returnString);
  log.error(err.stack); 
});

