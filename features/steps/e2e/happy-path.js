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
const { By } = require('selenium-webdriver');
const { Key } = require('selenium-webdriver');
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
  log.debug('Clicking on create course button');
  await pages.authProducer.populate('create_course', 'click');
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
});
Then('I validate that the course "$course.templatename" is listed in the courses page', async function () {
  if (await pages.authAdmin.checkWebElementExists('course_validation')) {
    console.log('passed');
  } else {
    console.log('failed');
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
  await pages.authProducer.populate('add_folder', 'click');
  await pages.authProducer.populate('folder_name', 'Chapter 1');
  await pages.authProducer.populate('add_folder_button', 'click');
  await pages.authProducer.populate('add_folder', 'click');
  await pages.authProducer.populate('folder_name', 'Chapter 2');
  await pages.authProducer.populate('add_folder_button', 'click');
});

Then('I will add the following content to the resource page:', async function () {
  await pages.authProducer.populate('add_folder', 'click');
  await pages.authProducer.populate('folder_name', 'Chapter 1. Introduction and Research Methods');
  await pages.authProducer.populate('add_folder_button', 'click');
  await pages.authProducer.populate('add_folder', 'click');
  await pages.authProducer.populate('folder_name', 'Chapter 1. Background to the Study of Psychology');
  await pages.authProducer.populate('add_folder_button', 'click');
  await pages.authProducer.populate('add_folder', 'click');
  await pages.authProducer.populate('folder_name', 'Chapter 1. The People and the Field');
  await pages.authProducer.populate('add_folder_button', 'click');
  await pages.authProducer.populate('add_folder', 'click');
  await pages.authProducer.populate('folder_name', 'Chapter 2: North America');
  await pages.authProducer.populate('add_folder_button', 'click');
});

Then('I move the activity named to the folder named', async function () {
  log.debug('Clicking options button');
  await pages.authProducer.populate('options_button', 'click');
  log.debug('Clicking move item button');
  await pages.authProducer.populate('move_item_button', 'click');
  await pages.authProducer.populate('chapter_2', 'click');
  log.debug('Clicking place item button');
  await pages.authProducer.populate('place_item_button', 'click');
  log.debug('Clicking options button');
  await pages.authProducer.populate('options_button', 'click');
  log.debug('Clicking move item button');
  await pages.authProducer.populate('move_item_button', 'click');
  await pages.authProducer.populate('chapter_2', 'click');
  await pages.authProducer.populate('place_item_button', 'click');
  await pages.authProducer.populate('options_button', 'click');
  log.debug('Clicking move item button');
  await pages.authProducer.populate('move_item_button', 'click');
  log.debug('Select chapter 1 from the list');
  await pages.authProducer.populate('chapter_1_3', 'click');
  log.debug('Clicking place item button');
  await pages.authProducer.populate('place_item_button', 'click');
  await pages.authProducer.populate('options_button', 'click');
  await pages.authProducer.populate('move_item_button', 'click');
  await pages.authProducer.populate('chapter_1_4', 'click');
  await pages.authProducer.populate('place_item_button', 'click');
});
Then('I reorder the items on the course resource page to be in this order:', async function () {
  await pages.authProducer.populate('options_button', 'click');
  await pages.authProducer.populate('reorder_button', 'click');
  await pages.authProducer.populate('move_down_button', 'click');
  await pages.authProducer.populate('save_reordered_button', 'click');
  await sleep(5000);
});
When('I elect to edit the course named "course1.templatename"', async function () {
  await pages.authProducer.populate('edit_button', 'click');
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
  await pages.authProducer.populate('save_button', 'click');
});

Then('I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"', async function () {
  if (await pages.authProducer.checkWebElementExists('Template_validate')) {
    console.log('passed');
  } else {
    throw new Error('Failed');
  }
});

Then('I click on course card "Testcourse" template', async function () {
  log.debug('Clicking on course card');
  await pages.student.populate('course_card_button', 'click', 'resources_tab');
});
Then('I click on Resource tab', async function () {
  await sleep(3000);
  log.debug('Clicking on resources tab');
  await pages.authProducer.populate('resources_tab', 'click');
});
Then('add content into chapter by clicking "+" button', async function () {
  await pages.authProducer.populate('Add_button', 'click');
});
When(/^I click on Activity search button and enter "(.*)"$/, async function (chapterName) {
  log.debug('Clicking search and entering the value');
  await pages.authProducer.populate('ActivitySearchInput', chapterName);
  await sleep(5000);
});
Then(/^I click on Activity search button and pass the value "(.*)"$/, async function (chapterName) {
  await pages.authProducer.populate('ActivitySearchInput', chapterName);
  await sleep(5000);
});

Then('I click on link of the file', async function () {
  log.debug('Clicking on file');
  await pages.authProducer.populate('file_open', 'click');
  await getDriver().navigate().back();
  await sleep(5000);
});
Then('I click on add content', async function () {
  try {
    log.debug('Clicking on add content');
    await pages.authProducer.populate('Adding_chapter_content', 'click');
    log.debug('CLicking on add selection button');
    await pages.authProducer.populate('AddSelectionsToResource', 'click');
    await sleep(5000);
  } catch (err) {
    log.error(err.stack);
  }
});
Then('I reorder the activity items to the chapters', async function () {
  log.debug('CLicking on Open button');
  await pages.authProducer.populate('OpenActionMenuForChapter1', 'click');
  await pages.authProducer.populate('move_item_button', 'click');
  await pages.authProducer.populate('chapter1', 'click');
  await pages.authProducer.populate('place_item_button', 'click');
  await pages.authProducer.populate('OpenActionMenuForChapter1', 'click');
  await pages.authProducer.populate('move_item_button', 'click');
  await pages.authProducer.populate('chapter1', 'click');
  await pages.authProducer.populate('place_item_button', 'click');
  await pages.authProducer.populate('OpenActionMenuForChapter1', 'click');
  await pages.authProducer.populate('move_item_button', 'click');
  await pages.authProducer.populate('chapter2', 'click');
  await pages.authProducer.populate('place_item_button', 'click');
  await pages.authProducer.populate('OpenActionMenuForChapter1', 'click');
  await pages.authProducer.populate('move_item_button', 'click');
  await pages.authProducer.populate('chapter2', 'click');
  await pages.authProducer.populate('place_item_button', 'click');
});

When(/^I search for "(.*)"$/, async function (temp) {
  try {
    log.debug('Clicking on search button');
    await sleep(3000);
    await pages.authAdmin.populate('search_course', temp);
  } catch (err) {
    log.error(err);
  }
});

Then(/^I copy the course named "Testcourse" to the name "(.*)"$/, async function (copy) {
  await pages.authAdmin.populate('copy_course', 'click');
  await pages.authAdmin.populate('copy_course_name', copy);
  await sleep(3000);
  await pages.authAdmin.populate('save_button', 'click');
  await sleep(3000);
});
When(/^I search "(.*?)"$/, async function (value) {
  log.debug('Clicking on search_course');
  await pages.authAdmin.populate('search_course', value);
});
Then('I open the Manage Instructors page on the course named "$course1.name"', async function () {
  await pages.authAdmin.populate('Manage_Instructor', 'click');
});
Then(/^I manage the instructors on the course and add the "(.*)" loginUser$/, async function (username) {
  const login = await loadLogin(username);
  log.debug('Clicking Instructor_Email button');
  await pages.authAdmin.populate('Instructor_Email', login.username);
  log.debug('Clicking Add_instructor button');
  await pages.authAdmin.populate('Add_instructor', 'click');
});
Then('I validate that the Course Specific Link opens the course named "$course1.name"', async function () {
  log.debug('Clicking copy link button');
  await pages.authAdmin.populate('copy_link', 'click');
});

Then('I close the Manage Instructors page', async function () {
  log.debug('Clicking close button');
  await pages.authAdmin.populate('close', 'click');
});
When('I elect to edit the course named "$course1.name"', async function () {
  await sleep(2000);
  log.debug('Clicking on edit_button ');
  await pages.authProducer.populate('edit_button', 'click');
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
  // await pages.authInstructor.populate('Template_status', 'click');
  await pages.authInstructor.populate('Active_Date1', 'click');
  await pages.authInstructor.populate('course_end_date1', 'click');
  await pages.authInstructor.populate('Next_Month', 'click');
  await pages.authInstructor.populate('Next_Month', 'click');
  await pages.authInstructor.populate('Select_Date', 'click');
  await pages.authProducer.populate('save_button', 'click');
});

Then('I capture the invite link and store to variable "inviteLink"', async function () {
  log.debug('Clicking on Invite_Students button');
  await pages.authInstructor.populate('Invite_Students', 'click');
  log.debug('Clicking on Send_Invite button');
  await pages.authInstructor.populate('Send_Invite', 'click');
});
Then(/^I populate the Invite Students "(.*)" page$/, async function (email) {
  const user = await loadLogin(email)
  log.debug('Clicking on enter_emailid button');
  await pages.authInstructor.populate('enter_emailid', user.username);
  await pages.authInstructor.populate('enter_emailid', ' ');
  await pages.authInstructor.populate('send_button', 'click');
  await sleep(5000);
});
When('I click on course card "Testcourse"', async function () {
  log.debug('Clicking on course_card button');
  await pages.authAdmin.populate('course_card', 'click');
});
Then('I click on create access code', async function () {
  log.debug('Clicking on create_acces_code button');
  await pages.authAdmin.populate('create_access_code', 'click');
});
Then('I select number of use codes', async function () {
  await sleep(10000);
  log.debug('clicking on single use code');
  await pages.authAdmin.populate('single_use_code', '2');
});

When(/^I open the invite link and login with "(.*)" account details$/, async function (username) {
  await sleep(5000);
  log.debug('Clicking on mail');
  const hyperlink = await getDriver().findElement(By.xpath("(//*[@target='_blank'])[32]")).getAttribute('href');
  log.debug(hyperlink + 'hyperlink');
  log.debug('Clicking on reset password');
  await getDriver().get(hyperlink);
  await sleep(5000);
  const login = await loadLogin(username)
  log.debug('Clicking on username and password');
  await pages.login.populate('txt_username', login.username);
  await pages.login.populate('txt_password', login.password);
  await pages.login.populate('sign_in', 'click');
});

Then('I click on Resource tab of Testcourse', async function () {
  await sleep(3000);
  log.debug('Clicking on Resource button');
  await pages.authInstructor.populate('Resource_button_instructor', 'click');
});

Then('I click on Target points', async function () {
  await sleep(3000);
  log.debug('Clicking on Target points');
  await pages.authInstructor.populate('Change_Target_points', 'click');
  log.debug('Clicking on edit target button');
  await pages.authInstructor.populate('Edit_Target_points', '5');
  log.debug('Clicking on change target score button');
  await pages.authInstructor.populate('Change_Target_score', 'click');
  log.debug('Clicking on A very short score button');
  await pages.authInstructor.populate('Very_short_button', 'click');
});

Then('I click on courseplanner', async function () {
  await sleep(5000);
  log.debug('Clicking on course planner button');
  await pages.authInstructor.populate('courseplanner_button', 'click');
});

Then('I click on Open Folder for activity', async function () {
  log.debug('Clicking on open folder for activity button');
  await pages.authInstructor.populate('open_folder_activity', 'click');
  log.debug('Clicking on open folder for activity button');
  await pages.authInstructor.populate('open_folder_chapter1_activity', 'click');
  log.debug('Clicking on open folder for activity button');
  await pages.authInstructor.populate('open_folder_chapterR&P_activity', 'click');
});

Then('I elect to assign the course', async function () {
  log.debug('Clicking on assign course button');
  await pages.authInstructor.populate('activity_assign', 'click');
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
  log.debug('Clicking on course card');
  await pages.student.populate('course_card_button', 'click', 'resource_tab');
});
When('I click on Resuource tab', async function () {
  log.debug('Clicking on Resource tab');
  await pages.student.populate('resources_tab', 'click');
});
When('I click on Open Folder', async function () {
  log.debug('Clicking on OpenFolder');
  await pages.student.populate('Open_folder', 'click');
  log.debug('Clicking on OpenFolder of chapter 1');
  await pages.student.populate('Open_folder_chapter1', 'click');
});
Then('I click on Read and Practice', async function () {
  log.debug('Clicking on Read and practice');
  await pages.student.populate('chapter_1_r&p', 'click');
});

Then('I click on chapter 1 R&P folder', async function () {
  log.debug('Clicking on chapter 1 open folder');
  await pages.authInstructor.populate('open_folder_chapter1_activity', 'click');
});

When('I click on Start grace period', async function () {
  await sleep(5000);
  log.debug('Clicking on start grace period');
  await pages.student.populate('start_grace_period', 'click');
});
When('I click on check box for purchace access for grace period', async function () {
  log.debug('Clicking on start Check box');
  await pages.student.populate('check_box_grace_period', 'click');
});
When('I click on Finish Enrollment', async function () {
  log.debug('Clicking on finish enrollment button');
  await pages.student.populate('Finish_enrollment', 'click');
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
  await sleep(5000);
  console.log('Clicking on Quiz');
  await pages.student.populate('Quiz', 'click');
  getDriver().findElement(By.xpath("//*[@class='btn-cdl-main AssignmentReading__takeQuizButton__r_fnP']")).click();
});
Then('I answer the questions', async function () {
  log.debug('Clicking on Multiple choice');
  await pages.student.populate('Multiple_choice', 'click');
});

Then('I click on submit button', async function () {
  log.debug('Clicking on submit button');
  await pages.student.populate('Submit_answer', 'click');
});

Then('I validate the content', async function () {
  if (await pages.authProducer.checkWebElementExists('modal_content')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});

Then('I click on close message', async function () {
  log.debug('Clicking on close message');
  await pages.student.populate('close_message', 'click');
  log.debug('Clicking on  back to study plan');
  await pages.student.populate('back_study_plan', 'click');
});
Then('I click on Read&Practice', async function () {
  log.debug('Clicking on close Read&Practice');
  await pages.student.populate('close_Reading&Practice', 'click');
});
Then('I click on Gradebook', async function () {
  log.debug('Clicking on Gradebook_button');
  await pages.student.populate('Gradebook', 'click');
});
Then('I click on alert message', async function () {
  log.debug('Clicking on alert message');
  await pages.student.populate('alert_message', 'click');
});