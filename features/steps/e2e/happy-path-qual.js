const {When, Then, After} = require('cucumber');
const path = require('path');
const {loadConfig, loadLogin} = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const coursewareStepsPath = process.cwd() + '/features/pageDefs/Courseware/';
const {PageObject} = require('../../../app/pageObject');
const {log} = require('../../../app/logger');
const parse = require('parse-duration');
const ScenarioData = require('../../../app/scenarioData');
const StringProcessing = require('../../../app/stringProcessing');
const {getDriver, getWebDriver, sleep, actions} = require('../../../app/driver');
const { By} = require('selenium-webdriver');
const {Key} = require('selenium-webdriver');
let pages = {
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath),
  createAccount: new PageObject('createAccount.json', stepsPath),
  student: new PageObject('student-role.json', stepsPath),
  navigation: new PageObject('navigation.json', stepsPath),
  CourseTemplate: new PageObject('course-template-directory.json', coursewareStepsPath),
  activityTab: new PageObject('activity-tab.json', coursewareStepsPath),
  resourceView: new PageObject('resource-tab-view.json', coursewareStepsPath)
}

After('@Qual', async function () {
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
})

When('I click on course card "Qual Testcourse" template', async function () {
  log.debug('Clicking on course card of Qual');
  await pages.CourseTemplate.populate('card_name_Qual', 'click');
});

Then('I click on Add folder button for adding folder', async function () {
  log.debug('Clicking on add folder button');
  await pages.resourceView.populate('add_folder', 'click');
});

Then(/^I create a folder with the name "(.*)"$/, async function (FolderName) {
  log.debug('Clicking on folder name button');
  await pages.resourceView.populate('folder_name', FolderName);
});

Then('I click on add folder button in order to save it', async function () {
  log.debug('Clicking on Add folder button');
  await pages.resourceView.populate('add_folder_button', 'click');
});
When('I validate the activities are added', async function () {
  await pages.resourceView.checkWebElementExists('Validation_activities');
  // try to include this refresh in framework
  getDriver().navigate().refresh();
  await sleep(3000);
});
When('I click on course card "Qual Testcourse" template present in instructor', async function () {
  await pages.CourseTemplate.populate('course_card_instructor', 'click');
});
Then('I click on create custom button', async function () {
  // Executer is required for scroll into view
  await pages.resourceView.scrollIntoView('create_custom_task');
  // Is this really needed?
  // yes this needed without scrolling the element is not visible
  await sleep(5000);
  await pages.resourceView.populate('create_custom_task', 'click');
});
Then('I select activity button as assesment', async function () {
  await pages.resourceView.populate('Select_activity_button', 'click');
  await sleep(10000);
});
Then('create a custom task by passing the values for Assesement 1', async function () {
  // where you switch frame
  await getDriver().switchTo().frame(0);
  await pages.resourceView.populate('Assignment_Title', 'Practice test');
  await pages.resourceView.populate('Assignment_Type', 'Test', 'click');
  await pages.resourceView.populate('Home_taxonomy', 'Interactive General Chemistry V1', 'click');
  await pages.resourceView.populate('Save_Assesement_button', 'click');
  await sleep(5000);
  // await getDriver().switchTo().defaultContent();
});

Then('I validate Custom Assesement is created', async function () {
  if (await pages.authProducer.checkWebElementExists('Assignment_Assesmnet_Validation')) {
    console.log('custom Assesement is created');
  } else {
    console.log('custom Assesement is not created');
  }
  getDriver().navigate().refresh();
  await sleep(5000);
});
// Use thi sstep dfeinition when you want to close specific activity when you open it
// Then('I close the assesment tab', async function () {
//   await pages.authInstructor.populate('close_assesment_frame', 'click');
//   await sleep(3000);
// });
Then('I add the coustom task', async function () {
  await pages.authInstructor.populate('Add_custom_task', 'click');
});

// use this when you want to create custom task 2
Then('create a custom task by passing the values for Assesement 2', async function () {
  await getDriver().switchTo().frame(0);
  await pages.authProducer.populate('Assignment_Title', 'PracticeTest2');
  await pages.authProducer.populate('Assignment_Type', 'Test', 'click');
  await pages.authProducer.populate('Save_Assesement_button', 'click');
  await sleep(5000);
});
When('I click on Assesment open menu action button to assign the course', async function () {
  await pages.authInstructor.populate('open_folder_activity ', 'click');
  await sleep(2000);
  await pages.authInstructor.populate('open_folder_Assesment', 'click');
});
