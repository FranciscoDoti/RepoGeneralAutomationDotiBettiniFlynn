const {When, Then} = require('cucumber');
const path = require('path');
const {loadConfig, loadLogin} = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const {PageObject} = require('../../../app/pageObject');
const {log} = require('../../../app/logger');
const parse = require('parse-duration');
const ScenarioData = require('../../../app/scenarioData');
const StringProcessing = require('../../../app/stringProcessing');
const {getDriver, sleep} = require('../../../app/driver');
const { By} = require('selenium-webdriver');
const {Key} = require('selenium-webdriver');
const fs = require('fs');
// var FieldValues;

let pages = {
  authProducer: new PageObject('auth-media-producer.json', stepsPath),
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath),
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  authInstructor: new PageObject('auth-instructor.json', stepsPath),
  createAccount: new PageObject('createAccount.json', stepsPath),
  student: new PageObject('student-role.json', stepsPath)

}
When('I click on create course plus button', async function () {
// var text = await getDriver().findElement(By.xpath("//*[@id='container']/div/div[2]/div/div/div/div/div[3]/div/button/div/div/span")).getText();
// console.log('text'+text);
  try {
    await pages.authProducer.populate('create_course', 'click');
  } catch (err) {
    await pages.authProducer.populate('Plus_button', 'click');
    log.error(err);
  }
  // let booleanVal = await pages.authProducer.checkWebElementExists('create_course');
  // if (booleanVal) {
  //   await pages.authProducer.populate('create_course', 'click');
  // } else {
  //   await pages.authProducer.populate('Plus_button', 'click');
  // }
});
When('I click on open menu for skills template', async function () {
  log.debug('Clicking on edit button');
  await pages.authProducer.populate('edit_button_writing', 'click');
});


