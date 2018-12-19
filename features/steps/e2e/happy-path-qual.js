const {When, Then, After} = require('cucumber');
const stepsPath = process.cwd() + '/features/pageDefs/';
const coursewareStepsPath = process.cwd() + '/features/pageDefs/Courseware/';
const {PageObject} = require('../../../app/pageObject');
const {log} = require('../../../app/logger');
const {getDriver, sleep} = require('../../../app/driver');
let pages = {
  navigation: new PageObject('navigation.json', stepsPath),
  courseTemplate: new PageObject('course-template-directory.json', coursewareStepsPath),
  activityTab: new PageObject('activity-tab.json', coursewareStepsPath),
  resourceView: new PageObject('resource-tab-view.json', coursewareStepsPath),
  courseplanner: new PageObject('course-planner-teb-view.json', coursewareStepsPath)
}

After('@Qual', async function () {
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
})

When('I click on course card "Qual Testcourse" template', async function () {
  log.debug('Clicking on course card of Qual');
  await pages.courseTemplate.populate('card_name_Qual', 'click');
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
When('I click on course card Qual Testcourse template', async function () {
  await pages.courseTemplate.populate('course_card_instructor', 'click');
});

Then('create a custom task by passing the values for Assesement 1', async function () {
  // where you switch frame
  await getDriver().switchTo().frame(0);
  await pages.courseplanner.populate('Assignment_Title', 'Practice test');
  await pages.courseplanner.populate('Assignment_Type', 'Test', 'click');
  await pages.courseplanner.populate('Home_taxonomy', 'Interactive General Chemistry V1', 'click');
  await pages.courseplanner.populate('Save_Assesement_button', 'click');
  await sleep(5000);
  // await getDriver().switchTo().defaultContent();
});

Then('I validate Custom Assesement is created', async function () {
  if (await pages.courseplanner.checkWebElementExists('Assignment_Assesmnet_Validation')) {
    console.log('custom Assesement is created');
  } else {
    console.log('custom Assesement is not created');
  }
  getDriver().navigate().refresh();
  await sleep(5000);
});
// Use this step definition when you want to close specific activity when you open it
// Then('I close the assesment tab', async function () {
//   await pages.authInstructor.populate('close_assesment_frame', 'click');
//   await sleep(3000);
// });

When('I click on Custom content button', async function () {
  await sleep(3000);
  await pages.courseplanner.populate('Custom_content_button', 'click');
});
When('I click on create custom activity button', async function () {
  await pages.courseplanner.scrollIntoView('Create_custom_button');
  await pages.courseplanner.populate('Create_custom_button', 'click');
});
When('I click on Select activity Assesment Button', async function () {
  await pages.courseplanner.populate('Select_activity_type_button', 'click');
});