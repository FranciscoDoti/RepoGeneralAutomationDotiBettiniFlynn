const {When, Then} = require('cucumber');
const path = require('path');
const {loadConfig, loadLogin} = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const {PageObject} = require('../../../app/pageObject');
const {log} = require('../../../app/logger');
const parse = require('parse-duration');
const ScenarioData = require('../../../app/scenarioData');
const StringProcessing = require('../../../app/stringProcessing');
const {getDriver, getWebDriver, sleep, actions} = require('../../../app/driver');
const { By} = require('selenium-webdriver');
const {Key} = require('selenium-webdriver');
let pages = {
  authProducer: new PageObject('auth-media-producer.json', stepsPath),
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath),
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  authInstructor: new PageObject('auth-instructor.json', stepsPath),
  createAccount: new PageObject('createAccount.json', stepsPath),
  student: new PageObject('student-role.json', stepsPath)

}

When('I click on course card "Qual Testcourse" template', async function () {
  log.debug('Clicking on course card of Qual');
  await pages.authProducer.populate('card_name_Qual', 'click', 'resources_tab');
});

Then('I click on Add folder button for adding folder', async function () {
  log.debug('Clicking on add folder button');
  await pages.authProducer.populate('add_folder', 'click');
});

Then(/^I create a folder with the name "(.*)"$/, async function (FolderName) {
  log.debug('Clicking on folder name button');
  await pages.authProducer.populate('folder_name', FolderName);
});

Then('I click on add folder button in order to save it', async function () {
  log.debug('Clicking on Add folder button');
  await pages.authProducer.populate('add_folder_button', 'click');
});

// Then('I reorder the chapters in resource page', async function () {
//   log.debug('Clicking options button');
//   await pages.authProducer.populate('options_button', 'click');
//   log.debug('Clicking reorder button');
//   await pages.authProducer.populate('reorder_button', 'click');
//   log.debug('Clicking move down button');
//   await pages.authProducer.populate('move_total_down_button', 'click');
//   log.debug('Clicking save button');
//   await pages.authProducer.populate('save_reordered_button', 'click');
//   log.debug('Clicking options button');
//   await pages.authProducer.populate('options_button', 'click');
//   log.debug('Clicking reorder button');
//   await pages.authProducer.populate('reorder_button', 'click');
//   log.debug('Clicking move down button');
//   await pages.authProducer.populate('move_down_button', 'click');
//   log.debug('Clicking save button');
//   await pages.authProducer.populate('save_reordered_button', 'click');
//   log.debug('Clicking options button');
//   await pages.authProducer.populate('options_button_2', 'click');
//   log.debug('Clicking reorder button');
//   await pages.authProducer.populate('reorder_button', 'click');
//   log.debug('Clicking move down button');
//   await pages.authProducer.populate('move_down_button', 'click');
//   log.debug('Clicking save button');
//   await pages.authProducer.populate('save_reordered_button', 'click');
//   log.debug('Clicking options button');
//   await pages.authProducer.populate('options_button_2', 'click');
//   log.debug('Clicking reorder button');
//   await pages.authProducer.populate('reorder_button', 'click');
//   log.debug('Clicking move up button');
//   await pages.authProducer.populate('move_up_button', 'click');
//   log.debug('Clicking save button');
//   await pages.authProducer.populate('save_reordered_button', 'click');
// });

// When('I move the activities to the chapters assigned to it', async function () {
//   log.debug('Clicking on open action menu');
//   await pages.authProducer.populate('OpenActionMenu', 'click');
//   log.debug('Clicking on move item button');
//   await pages.authProducer.populate('move_item_button', 'click');
//   log.debug('Clicking on place item button');
//   await pages.authProducer.populate('Place_activity_chapter1', 'click');
//   await pages.authProducer.populate('save_button', 'click');
//   log.debug('Clicking on open action menu');
//   await pages.authProducer.populate('OpenActionMenu', 'click');
//   log.debug('Clicking on move item button');
//   await pages.authProducer.populate('move_item_button', 'click');
//   log.debug('Clicking on activity content and place in respective chapters');
//   await pages.authProducer.populate('Place_activity_chapter1', 'click');
//   log.debug('Clicking on place item button');
//   await pages.authProducer.populate('save_button', 'click');
//   log.debug('Clicking on open action menu');
//   await pages.authProducer.populate('OpenActionMenu', 'click');
//   log.debug('Clicking on move item button');
//   await pages.authProducer.populate('move_item_button', 'click');
//   log.debug('Clicking on activity content and place in respective chapters');
//   await pages.authProducer.populate('Place_activity_chapter2', 'click');
//   await pages.authProducer.populate('save_button', 'click');
//   log.debug('Clicking on open action menu');
//   await pages.authProducer.populate('OpenActionMenu', 'click');
//   await pages.authProducer.populate('move_item_button', 'click');
//   await pages.authProducer.populate('Place_activity_chapter2', 'click');
//   log.debug('Clicking on place item button');
//   await pages.authProducer.populate('save_button', 'click');
//   log.debug('Clicking on open action menu');
//   await pages.authProducer.populate('OpenActionMenu', 'click');
//   log.debug('Clicking on move item button');
//   await pages.authProducer.populate('move_item_button', 'click');
//   log.debug('Clicking on activity content and place in respective chapters');
//   await pages.authProducer.populate('Place_activity_chapter4', 'click');
//   log.debug('Clicking on place item button');
//   await pages.authProducer.populate('save_button', 'click');
//   log.debug('Clicking on open action menu');
//   await pages.authProducer.populate('OpenActionMenu', 'click');
//   log.debug('Clicking on move item button');
//   await pages.authProducer.populate('move_item_button', 'click');
//   log.debug('Clicking on activity content and place in respective chapters');
//   await pages.authProducer.populate('Place_activity_chapter4', 'click');
//   log.debug('Clicking on place item button');
//   await pages.authProducer.populate('save_button', 'click');
//   await sleep(2000);
//   await getDriver().navigate().refresh();
//   await sleep(3000);
// });
When('I validate the activities are added', async function () {
  await pages.authInstructor.checkWebElementExists('Validation_activities');
  //try to include this refresh in framework 
  getDriver().navigate().refresh();
  await sleep(3000);
});
When('I click on course card "Qual Testcourse" template present in instructor', async function () {
  await pages.authInstructor.populate('course_card_instructor', 'click');
});
Then('I click on create custom button', async function () {
  //Executer is required for scroll into view
  await pages.authInstructor.scrollIntoView('create_custom_task');
  //Is this really needed?
  await sleep(5000);
  await pages.authInstructor.populate('create_custom_task', 'click');
});
Then('I select activity button as assesment', async function () {
  await pages.authInstructor.populate('Select_activity_button', 'click');
  await sleep(10000);
});
Then('create a custom task by passing the values for Assesement 1', async function () {
 // where you switch frame
  await getDriver().switchTo().frame(0);
  await pages.authProducer.populate('Assignment_Title', 'Practice test');
  await pages.authProducer.populate('Assignment_Type', 'Test', 'click');
  await pages.authProducer.populate('Home_taxonomy', 'Interactive General Chemistry V1', 'click');
  await pages.authProducer.populate('Save_Assesement_button', 'click');
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
// Then('I close the assesment tab', async function () {
//   await pages.authInstructor.populate('close_assesment_frame', 'click');
//   await sleep(3000);
// });
Then('I add the coustom task', async function () {
  await pages.authInstructor.populate('Add_custom_task', 'click');
});
Then('create a custom task by passing the values for Assesement 2', async function () {
  await getDriver().switchTo().frame(0);
  await pages.authProducer.populate('Assignment_Title', 'PracticeTest2');
  await pages.authProducer.populate('Assignment_Type', 'Test', 'click');
  await pages.authProducer.populate('Save_Assesement_button', 'click');
  await pages.authProducer.populate('Save_Assesement_button', 'click');
  await sleep(5000);
});

When('I add the custom activity to chapter', async function () {
  await pages.authProducer.populate('OpenActionMenu_custom_assesment', 'click');
  await pages.authProducer.populate('move_item_button', 'click');
  await pages.authProducer.populate('Place_activity_chapter3', 'click');
  await pages.authProducer.populate('save_button', 'click');
});
When('I click on Assesment open menu action button to assign the course', async function () {
  await pages.authInstructor.populate('open_folder_activity ', 'click');
  await sleep(2000);
  await pages.authInstructor.populate('open_folder_Assesment', 'click');
});
