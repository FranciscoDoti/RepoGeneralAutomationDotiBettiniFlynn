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
const coursewareStepsPath = process.cwd() + '/features/pageDefs/Courseware/';
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
  student: new PageObject('student-role.json', stepsPath),
  CourseTemplate: new PageObject('course-template-directory.json', coursewareStepsPath)

}
When('I click on create course plus button', async function () {
// var text = await getDriver().findElement(By.xpath("//*[@id='container']/div/div[2]/div/div/div/div/div[3]/div/button/div/div/span")).getText();
  let booleanVal = await pages.CourseTemplate.checkWebElementExists('create_course');
  if (booleanVal == false) {
    await pages.CourseTemplate.populate('Plus_button', 'click');
  } else if (booleanVal == true) {
    await pages.CourseTemplate.populate('create_course', 'click');
  }
});
Then("I click on course card 'TestingCourse Writer's Help 3.0' template", async function () {
  await pages.CourseTemplate.populate('course_card_writing', 'click');
});
