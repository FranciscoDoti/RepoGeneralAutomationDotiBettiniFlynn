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
var fieldValue;
var AssignValue;
var CourseValue;
// const emailid = Math.random().toString(36).substr(2, 6) + '@gmail.com';(adding random email id use this)
let pages = {
  authProducer: new PageObject('auth-media-producer.json', stepsPath),
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath),
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  authInstructor: new PageObject('auth-instructor.json', stepsPath),
  createAccount: new PageObject('createAccount.json', stepsPath),
  student: new PageObject('student-role.json', stepsPath)

}

When('I click the create_course button to create course', async function () {
  try {
    log.debug('Clicking on create course button');
    await pages.authProducer.populate('create_course', 'click');
    log.debug(`create course button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('save the value to variable', async function (dataTable) {
  fieldValue = dataTable;
});

When('I elect to create a course with the following data:', async function () {
  // log.debug(`I populated table`);
  // try {
    log.info(fieldValue.rows().length);
    var e;
    for (e = 0; e < fieldValue.rows().length; e++) {
      log.info(fieldValue.hashes()[e].variablename);
      log.info(fieldValue.hashes()[e].value);
      await pages.authProducer.populate(fieldValue.hashes()[e].variablename, fieldValue.hashes()[e].value);
    }
  // } catch (err) {
  //   log.error(err.stack);
  // }

  // try {
  //   log.debug('Clicking on save button');
  //   await pages.authProducer.populate('save_button', 'click');
  //   log.debug(`create course button was clicked: ${clickedButton}`);
  // } catch (err) {
  //   log.error(err);
  // }
});
Then('I validate that the course "$course.templatename" is listed in the courses page', async function () {
  try {
    if (await pages.authAdmin.checkWebElementExists('course_validation')) {
      console.log('passed');
    } else {
      console.log('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

Then('I create a folder named on the resources screen', async function () {
  try {
    log.debug('Clicking on course card');
    await pages.authProducer.populate('card_name', 'click', 'resources_tab');
    log.debug(`create course card was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on resources tab');
    await pages.authProducer.populate('resources_tab', 'click');
    log.debug(`create resource tab was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 1');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 2');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I will add the following content to the resource page:', async function () {
  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 1. Introduction and Research Methods');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 1. Background to the Study of Psychology');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 1. The People and the Field');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 2: North America');

  try {
    log.debug('Adding folder');
    await pages.authProducer.populate('add_folder_button', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I move the activity named to the folder named', async function () {
  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Select chapter 2 from the list');
    await pages.authProducer.populate('chapter_2', 'click');
    log.debug(`Chapter 2 was selected: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Select chapter 1 from the list');
    await pages.authProducer.populate('chapter_2', 'click');
    log.debug(`Chapter 1 was selected: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Select chapter 1 from the list');
    await pages.authProducer.populate('chapter_1_3', 'click');
    log.debug(`Chapter 1 was selected: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Select chapter 1 from the list');
    await pages.authProducer.populate('chapter_1_4', 'click');
    log.debug(`Chapter 1 was selected: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I reorder the items on the course resource page to be in this order:', async function () {
  try {
    log.debug('Clicking options button');
    await pages.authProducer.populate('options_button', 'click');
    log.debug(`options button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking reorder button');
    await pages.authProducer.populate('reorder_button', 'click');
    log.debug(`Reorder button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking move down button');
    await pages.authProducer.populate('move_down_button', 'click');
    log.debug(`Move down button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  try {
    log.debug('Clicking save button');
    await pages.authProducer.populate('save_reordered_button', 'click');
    log.debug(`Save button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  await sleep(5000);
});
When('I elect to edit the course named "course1.templatename"', async function () {
  try {
    log.debug('Clicking edit_button');
    await pages.authProducer.populate('edit_button', 'click');
    log.debug(`edit_button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('save the value to variables', async function (dataTable) {
  AssignValue = dataTable;
});

Then('I elect to edit the course with the following data:', async function () {
  log.debug(`I populated table`);
  try {
    log.info(AssignValue.rows().length);
    var x;
    for (x = 0; x < AssignValue.rows().length; x++) {
      log.info(AssignValue.hashes()[x].variablesname);
      log.info(AssignValue.hashes()[x].value);
      await pages.authProducer.populate(AssignValue.hashes()[x].variablesname, AssignValue.hashes()[x].value);
    }
  } catch (err) {
    log.error(err.stack);
  }
  try {
    log.debug('Clicking on save button');
    await pages.authProducer.populate('save_button', 'click');
    log.debug(`save_button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"', async function () {
  try {
    if (await pages.authProducer.checkWebElementExists('Template_validate')) {
      console.log('passed');
    } else {
      console.log('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

When('I click on course card "Testcourse" template', async function () {
  try {
    log.debug('Clicking on course card');
    await pages.authProducer.populate('', 'click');
    log.debug(`create resource tab was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I click on Resource tab', async function () {
  try {
    log.debug('Clicking on resources tab');
    await pages.authProducer.populate('resources_tab', 'click');
    log.debug(`create resource tab was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('add content into chapter', async function () {
  try {
    log.debug('Clicking on add button');
    await pages.authProducer.populate('Add_button', 'click');
    log.debug(`Add button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When(/^I click on Activity search button and enter "(.*)"$/, async function (chapterName) {
  try {
    log.debug('Clicking search and entering the value');
    await pages.authProducer.populate('ActivitySearchInput', chapterName);
    await sleep(3000);
    await pages.authProducer.populate('ActivitySearchInput', chapterName);
    await sleep(5000);
    log.debug(`The value is entered: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When(/^I click on Activity search button and pass the value "(.*)"$/, async function (chapterName) {
  try {
    log.debug('Clicking search and entering the value');
    await pages.authProducer.populate('ActivitySearchInput', chapterName);
    await sleep(3000);
    await pages.authProducer.populate('ActivitySearchInput', chapterName);
    await sleep(3000);
    await pages.authProducer.populate('ActivitySearchInput', chapterName);
    // await sleep(3000);
    // await pages.authProducer.populate('ActivitySearchInput', chapterName);
    await sleep(5000);
    log.debug(`The value is entered: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('I click on add Introduction and Research Methods content', async function () {
  try {
    log.debug('Clicking on add Introduction and Research Methods content');
    await pages.authProducer.populate('Adding_chapter_content', 'click');
    log.debug(`Chapter content was added : ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('CLicking on add selection button');
    await pages.authProducer.populate('AddSelectionsToResource', 'click');
    log.debug(`Add Selection button is clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I reorder the items', async function () {
  try {
    log.debug('CLicking on Open button');
    await pages.authProducer.populate('OpenActionMenuForChapter1', 'click');
    log.debug(`Open button is clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open folder');
    await pages.authProducer.populate('OpenFolder', 'click');
    log.debug(`Open folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on chapter 1');
    await pages.authProducer.populate('chapter1-1', 'click');
    log.debug(`Chapter 1 was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('CLicking on Open button');
    await pages.authProducer.populate('OpenActionMenuForChapter1', 'click');
    log.debug(`Open button is clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open folder');
    await pages.authProducer.populate('OpenFolder', 'click');
    log.debug(`Open folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on chapter 2');
    await pages.authProducer.populate('chapter1-2', 'click');
    log.debug(`Chapter 1 was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('CLicking on Open button');
    await pages.authProducer.populate('OpenActionMenuForChapter1', 'click');
    log.debug(`Open button is clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open folder');
    await pages.authProducer.populate('OpenFolder', 'click');
    log.debug(`Open folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on chapter 3');
    await pages.authProducer.populate('chapter1-(3)', 'click');
    log.debug(`Chapter 1 was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('CLicking on Open button');
    await pages.authProducer.populate('OpenActionMenuForChapter1', 'click');
    log.debug(`Open button is clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking move item button');
    await pages.authProducer.populate('move_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open folder');
    await pages.authProducer.populate('OpenFolder1', 'click');
    log.debug(`Open folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on chapter 2-1');
    await pages.authProducer.populate('chapter2-1', 'click');
    log.debug(`Chapter 1 was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking place item button');
    await pages.authProducer.populate('place_item_button', 'click');
    log.debug(`Move item button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When(/^I search for "(.*)"$/, async function (temp) {
  try {
    log.debug('Clicking on search button');
    await sleep(10000);
    await pages.authAdmin.populate('search_course', temp);
    log.debug('Entered click in search button');
  } catch (err) {
    log.error(err);
  }
});

Then(/^I copy the course named "Testcourse" to the name "(.*)"$/, async function (copy) {
  try {
    log.debug('Chnging the course name from Test course to E2E101');
    await pages.authAdmin.populate('copy_course_name', copy);
    log.debug(`The Testcourse is changed to E2E101: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on copy_course');
    await pages.authAdmin.populate('copy_course', 'click');
    log.debug(`copy_course was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on copy_course_name');
    await pages.authAdmin.populate('copy_course_name', 'click');
    log.debug(`copy_course_name was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  await pages.authAdmin.populate('copy_course_name', copy);
  try {
    log.debug('Clicking save button');
    await pages.authAdmin.populate('save_button', 'click');
    log.debug(`Save button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When(/^I search "(.*?)"$/, async function (value) {
  try {
    log.debug('Clicking on search_course');
    await pages.authAdmin.populate('search_course', value);
    log.debug(`search_course was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I open the Manage Instructors page on the course named "$course1.name"', async function () {
  try {
    log.debug('Clicking Manage_Instructor button');
    await pages.authAdmin.populate('Manage_Instructor', 'click');
    log.debug(`Manage_Instructor' was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then(/^I manage the instructors on the course and add the "(.*)" loginUser$/, async function (username) {
  try {
    const login = await loadLogin(username);
    log.debug('Clicking Instructor_Email button');
    await pages.authAdmin.populate('Instructor_Email', login.username);
    log.debug(`Adding Instructor: ${username}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking Add_instructor button');
    await pages.authAdmin.populate('Add_instructor', 'click');
    log.debug(`Add_instructor' was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I validate that the Course Specific Link opens the course named "$course1.name"', async function () {
  try {
    log.debug('Clicking copy link button');
    await pages.authAdmin.populate('copy_link', 'click');
    log.debug(`copy_link was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I close the Manage Instructors page', async function () {
  try {
    log.debug('Clicking close button');
    await pages.authAdmin.populate('close', 'click');
    log.debug(`close button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I elect to edit the course named "$course1.name"', async function () {
  try {
    log.debug('Clicking on edit_button ');
    await pages.authProducer.populate('edit_button', 'click');
    log.debug(`edit_button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('save the values to course', async function (dataTable) {
  CourseValue = dataTable;
  log.debug('course value');
});
When('I elect to edit the course with the following data', async function () {
  log.debug(`I populated table`);
  try {
    log.info(CourseValue.rows().length);
    var x;
    for (x = 0; x < CourseValue.rows().length; x++) {
      log.info(CourseValue.hashes()[x].values);
      log.info(CourseValue.hashes()[x].course);
      await pages.authInstructor.populate(CourseValue.hashes()[x].values, CourseValue.hashes()[x].course);
    }
  } catch (err) {
    log.error(err.stack);
  }
  try {
    // await pages.authInstructor.populate('Template_status', 'click');
    await pages.authInstructor.populate('Active_Date1', 'click');
    await pages.authInstructor.populate('course_end_date1', 'click');
    await pages.authInstructor.populate('Next_Month', 'click');
    await pages.authInstructor.populate('Select_Date', 'click');
  } catch (err) {
    log.error(err.stack);
  }
  try {
    log.debug('Clicking on save button');
    await pages.authProducer.populate('save_button', 'click');
    log.debug(`save_button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I capture the invite link and store to variable "inviteLink"', async function () {
  try {
    log.debug('Clicking on Invite_Students button');
    await pages.authInstructor.populate('Invite_Students', 'click');
    log.debug(`Invite_Students button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on Send_Invite button');
    await pages.authInstructor.populate('Send_Invite', 'click');
    log.debug(`Send_Invite button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then(/^I populate the Invite Students "(.*)" page$/, async function (email) {
  try {
    const user = await loadLogin(email)
    log.debug('Clicking on enter_emailid button');
    await pages.authInstructor.populate('enter_emailid', user.username);
    await pages.authInstructor.populate('enter_emailid', ' ');
    log.debug(`enter_emailid button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on send_button button');
    await pages.authInstructor.populate('send_button', 'click');
    log.debug(`send_button button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  await sleep(5000);
});
When('I click on course card "Testcourse"', async function () {
  try {
    log.debug('Clicking on course_card button');
    await pages.authAdmin.populate('course_card', 'click');
    log.debug(`course_card button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I click on create access code', async function () {
  try {
    log.debug('Clicking on create_acces_code button');
    await pages.authAdmin.populate('create_access_code', 'click');
    log.debug(`create_access_code button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I select number of use codes', async function () {
  try {
    await sleep(10000);
    log.debug('clicking on single use code');
    await pages.authAdmin.populate('single_use_code', '2');
    log.debug(`single use code button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When(/^I open the invite link and login with "(.*)" account details$/, async function (username) {
  try {
    await sleep(5000);
    log.debug('Clicking on mail');
    await pages.authInstructor.populate('macmillanMail', 'click');
    log.debug(`mail was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    const hyperlink = await getDriver().findElement(By.xpath("//a[contains(@href, 'https://int-achieve-courseware-frontend.mldev.cloud/courses/n8pzzu')]")).getAttribute('href');
    log.debug(hyperlink + 'hyperlink');
    log.debug('Clicking on reset password');
    await getDriver().get(hyperlink);
    log.debug(`reset password was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    await sleep(5000);
    const login = await loadLogin(username)
    log.debug('Clicking on username and password');
    await pages.login.populate('txt_username', login.username);
    await pages.login.populate('txt_password', login.password);
    await pages.login.populate('sign_in', 'click');
    log.debug(`account details are entered: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('I click on course card "E2E101"', async function () {
  try {
    log.debug('Clicking on course card');
    await pages.student.populate('course_card_button', 'click', 'resource_tab');
    log.debug(`course card was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
    await sleep(2000);
  }
});
When('I click on Resuource tab', async function () {
  try {
    log.debug('Clicking on Resource tab');
    await pages.student.populate('resources_tab', 'click');
    log.debug(`Resource tab was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I click on Open Folder', async function () {
  try {
    log.debug('Clicking on OpenFolder');
    await pages.student.populate('Open_folder', 'click');
    log.debug(`Open folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on OpenFolder of chapter 1');
    await pages.student.populate('Open_folder_chapter1', 'click');
    log.debug(`Open folder of chapter 1 was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
    await sleep(2000);
  }
});
Then('I click on Read and Practice', async function () {
  try {
    log.debug('Clicking on Read and practice');
    await pages.student.populate('chapter_1_r&p', 'click');
    log.debug(`Read and practice was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});