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
var fieldValue;
var AssignValue;
var CourseValue;
var countlinks;
var Assigncourse;
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
  log.debug(`I populated table`);
  try {
    log.info(fieldValue.rows().length);
    var e;
    for (e = 0; e < fieldValue.rows().length; e++) {
      log.info(fieldValue.hashes()[e].variablename);
      log.info(fieldValue.hashes()[e].value);
      await pages.authProducer.populate(fieldValue.hashes()[e].variablename, fieldValue.hashes()[e].value);
    }
  } catch (err) {
    log.error(err.stack);
  }

  try {
    log.debug('Clicking on save button');
    await pages.authProducer.populate('save_button', 'click');
    log.debug(`create course button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I validate that the course "$course.templatename" is listed in the courses page', async function () {
  try {
    if (await pages.authAdmin.checkWebElementExists('course_validation')) {
      console.log('passed');
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

Then('I create a folder named on the resources screen', async function () {
  /* try {
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
  } */

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

/* Then('I will add the following content to the resource page:', async function () {
  try {
    log.debug('Clicking on add folder');
    await pages.authProducer.populate('add_folder', 'click');
    log.debug(`create add folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }

  await pages.authProducer.populate('folder_name', 'Chapter 1: Content');

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

  await pages.authProducer.populate('folder_name', 'Chapter2: Content');

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

  await pages.authProducer.populate('folder_name', 'Chapter1: Content');

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

  await pages.authProducer.populate('folder_name', 'Chapter 2: Content');

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
}); */
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
      throw new Error('Failed');
    }
  } catch (err) {
    log.error(err);
  }
});

Then('I click on course card "Testcourse" template', async function () {
  try {
    log.debug('Clicking on course card');
    await pages.student.populate('course_card_button', 'click', 'resources_tab');
    log.debug(`course card was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
    await sleep(3000);
  }
});
Then('I click on Resource tab', async function () {
  try {
    log.debug('Clicking on resources tab');
    await pages.authProducer.populate('resources_tab', 'click');
    log.debug(`create resource tab was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('add content into chapter by clicking "+" button', async function () {
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
    await sleep(5000);
    log.debug(`The value is entered: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then(/^I click on Activity search button and pass the value "(.*)"$/, async function (chapterName) {
  try {
    log.debug('Clicking search and entering the value');
    await pages.authProducer.populate('ActivitySearchInput', chapterName);
    await sleep(5000);
    log.debug(`The value is entered: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I click on link of the file', async function () {
  try {
    log.debug('Clicking on file');
    await pages.authProducer.populate('file_open', 'click');
    log.debug(`file link was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  await getDriver().navigate().back();
  await sleep(5000);
});
Then('I click on add content', async function () {
  try {
    log.debug('Clicking on add content');
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

  await sleep(5000);
});
Then('I reorder the activity items to the chapters', async function () {
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
  /* try {
   log.debug('Clicking on open folder');
    await pages.authProducer.populate('OpenFolder', 'click');
    log.debug(`Open folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  } */
  try {
    log.debug('Clicking on chapter 1');
    await pages.authProducer.populate('chapter1', 'click');
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
    log.debug('Clicking on chapter 1');
    await pages.authProducer.populate('chapter1', 'click');
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
    log.debug('Clicking on chapter 3');
    await pages.authProducer.populate('chapter2', 'click');
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
    log.debug('Clicking on chapter 2');
    await pages.authProducer.populate('chapter2', 'click');
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
    await sleep(3000);
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
  await sleep(3000);
  try {
    log.debug('Clicking save button');
    await pages.authAdmin.populate('save_button', 'click');
    log.debug(`Save button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
    await sleep(3000);
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
    const hyperlink = await getDriver().findElement(By.xpath("(//*[@target='_blank'])[32]")).getAttribute('href');
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

Then('I click on Resource tab of Testcourse', async function () {
  try {
    await sleep(3000);
    log.debug('Clicking on Resource button');
    await pages.authInstructor.populate('Resource_button_instructor', 'click');
    log.debug(`Target button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I click on Target points', async function () {
  try {
    await sleep(3000);
    log.debug('Clicking on Target points');
    await pages.authInstructor.populate('Change_Target_points', 'click');
    log.debug(`Target button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on edit target button');
    await pages.authInstructor.populate('Edit_Target_points', '5');
    log.debug(`The Target points are edited: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on change target score button');
    await pages.authInstructor.populate('Change_Target_score', 'click');
    log.debug(`Change Target button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on A very short score button');
    await pages.authInstructor.populate('Very_short_button', 'click');
    log.debug(`A very short score button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I click on courseplanner', async function () {
  try {
    await sleep(5000);
    log.debug('Clicking on course planner button');
    await pages.authInstructor.populate('courseplanner_button', 'click');
    log.debug(`course planner button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I click on Open Folder for activity', async function () {
  try {
    log.debug('Clicking on open folder for activity button');
    await pages.authInstructor.populate('open_folder_activity', 'click');
    log.debug(`course planner button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open folder for activity button');
    await pages.authInstructor.populate('open_folder_chapter1_activity', 'click');
    log.debug(`course planner button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on open folder for activity button');
    await pages.authInstructor.populate('open_folder_chapterR&P_activity', 'click');
    log.debug(`course planner button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I elect to assign the course', async function () {
  try {
    log.debug('Clicking on assign course button');
    await pages.authInstructor.populate('activity_assign', 'click');
    log.debug(`activity assign course button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('assign the values to variable', async function (dataTable) {
  Assigncourse = dataTable
});
Then('I elect it with the following data:', async function () {
  try {
    log.info(Assigncourse.rows().length);
    var x;
    for (x = 0; x < Assigncourse.rows().length; x++) {
      log.info(Assigncourse.hashes()[x].values);
      log.info(Assigncourse.hashes()[x].variable);
      await pages.authInstructor.populate(Assigncourse.hashes()[x].values, Assigncourse.hashes()[x].variable);
    }
    await getDriver().navigate().refresh();
    await sleep(3000);
  } catch (err) {
    log.error(err.stack);
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

Then('I click on chapter 1 R&P folder', async function () {
  try {
    log.debug('Clicking on chapter 1 open folder');
    await pages.authInstructor.populate('open_folder_chapter1_activity', 'click');
    log.debug(`chapter 1 open folder was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('I click on Start grace period', async function () {
  try {
    await sleep(5000);
    log.debug('Clicking on start grace period');
    await pages.student.populate('start_grace_period', 'click');
    log.debug(`Purchase read&Practice button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I click on check box for purchace access for grace period', async function () {
  try {
    log.debug('Clicking on start Check box');
    await pages.student.populate('check_box_grace_period', 'click');
    log.debug(`check box button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I click on Finish Enrollment', async function () {
  try {
    log.debug('Clicking on finish enrollment button');
    await pages.student.populate('Finish_enrollment', 'click');
    log.debug(`Finish enrollment button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  await sleep(5000);
});

Then('I click on the reading material and validate whether the content is available', async function () {
  await getDriver().findElements(By.xpath("//*[@type='checkbox']")).then(function (elems) {
    countlinks = elems.length;
    console.log('countlinks' + countlinks);
  });
  var i;
  for (i = 1; i <= countlinks; i++) {
    await sleep(3000);
    // await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).isDisplayed();

    await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).click();

    // console.log(await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).getAttribute('aria-label') + 'gettext1');
    // var topicName = await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).getAttribute('aria-label');
    // var topicArray = topicName.split(':');
    /* var text = topicArray[2];
    var textuppercase = text.toLocaleUpperCase();
    console.log(textuppercase + 'testuppercas'); 
    //console.log(await getDriver().findElement(By.xpath("//*[text()='"+textuppercase+"']")).isDisplayed()); */

    // console.log( await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).getAttribute('aria-label') + 'gettext1');
    // await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).click();
    // console.log(getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + i + ']')).getText()+'gettext2');

    /* if (await pages.student.checkWebElementExists('Reading_verification')) {
      console.log('passed');
    } else {
      console.log('failed');
    } */
  }
  // await getDriver().findElement(By.xpath("(//*[@type='checkbox'])[" + 1 + ']')).click();
  await getDriver().navigate().refresh();
});
Then('I start the quiz', async function () {
  try {
    await sleep(5000);
    console.log('Clicking on Quiz');
    await pages.student.populate('Quiz', 'click');
    getDriver().findElement(By.xpath("//*[@class='btn-cdl-main AssignmentReading__takeQuizButton__r_fnP']")).click();
    log.debug(`Quiz was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I answer the questions', async function () {
  try {
    log.debug('Clicking on Multiple choice');
    await pages.student.populate('Multiple_choice', 'click');
    log.debug(`Multiple choice was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I click on submit button', async function () {
  try {
    log.debug('Clicking on submit button');
    await pages.student.populate('Submit_answer', 'click');
    log.debug(`Multiple choice was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I validate the content', async function () {
  try {
    if (await pages.authProducer.checkWebElementExists('modal_content')) {
      console.log('passed');
    } else {
      console.log('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

Then('I click on close message', async function () {
  try {
    log.debug('Clicking on close message');
    await pages.student.populate('close_message', 'click');
    log.debug(`close message was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    log.debug('Clicking on  back to study plan');
    await pages.student.populate('back_study_plan', 'click');
    log.debug(`Back to study plan was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I click on Read&Practice', async function () {
  try {
    log.debug('Clicking on close Read&Practice');
    await pages.student.populate('close_Reading&Practice', 'click');
    log.debug(`Close Read&Pratctice was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I click on Gradebook', async function () {
  try {
    log.debug('Clicking on Gradebook_button');
    await pages.student.populate('Gradebook', 'click');
    log.debug(`Gradebook was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I click on alert message', async function () {
  try {
    log.debug('Clicking on alert message');
    await pages.student.populate('alert_message', 'click');
    log.debug(`Gradebook was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
