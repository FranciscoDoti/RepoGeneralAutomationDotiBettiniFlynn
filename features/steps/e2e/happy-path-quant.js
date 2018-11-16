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
const coursewareStepsPath = process.cwd() + '/features/pageDefs/Courseware/';
const { By} = require('selenium-webdriver');
const {Key} = require('selenium-webdriver');
// var FieldValues;

let pages = {
  authProducer: new PageObject('auth-media-producer.json', stepsPath),
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath),
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  authInstructor: new PageObject('auth-instructor.json', stepsPath),
  createAccount: new PageObject('createAccount.json', stepsPath),
  student: new PageObject('student-role.json', stepsPath),
  CourseTemplate: new PageObject('course-template-directory.json', coursewareStepsPath)


}
When('I click on course card of Quant Template', async function () {
  await pages.CourseTemplate.populate('course_card_Qant', 'click');
});
When('I click on course card of Quant Template as instructor', async function () {
  await pages.CourseTemplate.populate('course_card_quant_instructor', 'click', 'resources_tab');
});
