const {When, Then} = require('cucumber');
const path = require('path');
const {loadConfig, loadLogin} = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const {PageObject} = require('../../../app/pageObject');
const {log} = require('../../../app/logger');
const coursewareStepsPath = process.cwd() + '/features/pageDefs/Courseware/';
const parse = require('parse-duration');
const ScenarioData = require('../../../app/scenarioData');
const StringProcessing = require('../../../app/stringProcessing');
const {getDriver, sleep} = require('../../../app/driver');
const { By } = require('selenium-webdriver');
const { Key } = require('selenium-webdriver');
// const { parser } = require('../../../../lc-parser')
var fieldValue;
var AssignValue;
var CourseValue;
// const emailid = Math.random().toString(36).substr(2, 6) + '@gmail.com';(adding random email id use this)
let pages = {
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath),
  createAccount: new PageObject('createAccount.json', stepsPath),
  CourseTemplate: new PageObject('course-template-directory.json', coursewareStepsPath),
  activityTab: new PageObject('activity-tab.json', coursewareStepsPath),
  resourceView: new PageObject('resource-tab-view.json', coursewareStepsPath)
}


When('I click the create_course button to create course', async function () {
  log.debug('Clicking on create course button');
  await pages.CourseTemplate.populate('create_course', 'click');
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
      await pages.CourseTemplate.populate(fieldValue.hashes()[e].variablename, fieldValue.hashes()[e].value);
    }
  } catch (err) {
    log.error(err.stack);
  }
});

When(/^I validate the message "(.*)"$/, async function (message) {
  const coursemessage = await pages.CourseTemplate.getElementValue('course_message_validation');
  if (coursemessage == message) {
    console.log('passed')
  } else {
    throw new Error('failed')
  }
});
Then('I validate that the course "$course.templatename" is listed in the courses page', async function () {
  if (await pages.CourseTemplate.checkWebElementExists('course_validation')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});
When('I elect to edit the course named "course1.templatename"', async function () {
  await pages.CourseTemplate.populate('edit_button', 'click');
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
      await pages.CourseTemplate.populate(AssignValue.hashes()[x].variablesname, AssignValue.hashes()[x].value);
    }
  } catch (err) {
    log.error(err.stack);
  }
  await pages.CourseTemplate.populate('save_button', 'click');
});

Then('I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"', async function () {
  if (await pages.CourseTemplate.checkWebElementExists('Template_validate')) {
    console.log('passed');
  } else {
    throw new Error('Failed');
  }
});

Then('I click on course card "Testcourse" template', async function () {
  log.debug('Clicking on course card');
  await pages.CourseTemplate.populate('course_card_button', 'click', 'resources_tab');
});
Then('I click on Resource tab', async function () {
  await sleep(3000);
  log.debug('Clicking on resources tab');
  await pages.activityTab.populate('resources_tab', 'click');
});
Then('add content into chapter by clicking "+" button', async function () {
  await pages.resourceView.populate('Add_button', 'click');
});
When(/^I click on Activity search button and enter "(.*)"$/, async function (chapterName) {
  log.debug('Clicking search and entering the value');
  await pages.resourceView.populate('ActivitySearchInput', chapterName);
  await sleep(5000);
});
Then(/^I click on Activity search button and pass the value "(.*)"$/, async function (chapterName) {
  await pages.resourceView.populate('ActivitySearchInput', chapterName);
  await sleep(5000);
});

Then('I click on link of the file', async function () {
  log.debug('Clicking on file');
  await pages.resourceView.populate('file_open', 'click');
  await getDriver().navigate().back();
  await sleep(5000);
});
Then('I click on add content', async function () {
  try {
    log.debug('Clicking on add content');
    await pages.resourceView.populate('Adding_chapter_content', 'click');
    log.debug('CLicking on add selection button');
    await pages.resourceView.populate('AddSelectionsToResource', 'click');
    await sleep(5000);
  } catch (err) {
    log.error(err.stack);
  }
});
When(/^I search for "(.*)"$/, async function (temp) {
  try {
    log.debug('Clicking on search button');
    await sleep(3000);
    await pages.CourseTemplate.populate('search_course', temp);
  } catch (err) {
    log.error(err);
  }
});

Then(/^I copy the course named "Testcourse" to the name "(.*)"$/, async function (copy) {
  await pages.CourseTemplate.populate('copy_course', 'click');
  await pages.CourseTemplate.populate('copy_course_name', copy);
  await sleep(3000);
  await pages.CourseTemplate.populate('save_button', 'click');
  await sleep(3000);
});
When(/^I search "(.*?)"$/, async function (value) {
  log.debug('Clicking on search_course');
  await pages.CourseTemplate.populate('search_course', value);
});
Then('I open the Manage Instructors page on the course named "$course1.name"', async function () {
  await pages.CourseTemplate.populate('Manage_Instructor', 'click');
});
Then(/^I manage the instructors on the course and add the "(.*)" loginUser$/, async function (username) {
  const login = await loadLogin(username);
  log.debug('Clicking Instructor_Email button');
  await pages.CourseTemplate.populate('Instructor_Email', login.username);
  log.debug('Clicking Add_instructor button');
  await pages.CourseTemplate.populate('Add_instructor', 'click');
});
Then('I validate that the Course Specific Link opens the course named "$course1.name"', async function () {
  log.debug('Clicking copy link button');
  await pages.CourseTemplate.populate('copy_link', 'click');
});

Then('I close the Manage Instructors page', async function () {
  log.debug('Clicking close button');
  await pages.CourseTemplate.populate('close', 'click');
});
When('I elect to edit the course named "$course1.name"', async function () {
  await sleep(2000);
  log.debug('Clicking on edit_button ');
  await pages.CourseTemplate.populate('edit_button', 'click');
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
      await pages.CourseTemplate.populate(CourseValue.hashes()[x].values, CourseValue.hashes()[x].course);
    }
  } catch (err) {
    log.error(err.stack);
  }
  await pages.CourseTemplate.populate('Template_status', 'Active On Date');
  await pages.CourseTemplate.populate('Active_Date1', 'click');
  await pages.CourseTemplate.populate('Active_Date@now', 'click');
  await pages.CourseTemplate.populate('course_end_date1', 'click');
  await pages.CourseTemplate.populate('Next_Month', 'click');
  await pages.CourseTemplate.populate('Next_Month', 'click');
  await pages.CourseTemplate.populate('Select_Date', 'click');
  await pages.CourseTemplate.populate('save_button', 'click');
});

Then('I capture the invite link and store to variable "inviteLink"', async function () {
  log.debug('Clicking on Invite_Students button');
  await pages.CourseTemplate.populate('Invite_Students', 'click');
  log.debug('Clicking on Send_Invite button');
  await pages.CourseTemplate.populate('Send_Invite', 'click');
});
Then(/^I populate the Invite Students "(.*)" page$/, async function (email) {
  const user = await loadLogin(email)
  log.debug('Clicking on enter_emailid button');
  await pages.CourseTemplate.populate('enter_emailid', user.username);
  await pages.CourseTemplate.populate('enter_emailid', ' ');
  await pages.CourseTemplate.populate('send_button', 'click');
  await sleep(5000);
});
When('I click on course card "Testcourse"', async function () {
  log.debug('Clicking on course_card button');
  await pages.CourseTemplate.populate('course_card', 'click');
});
When('I click on invite link send by instructor', async function () {
  await sleep(3000);

  await pages.CourseTemplate.populate('Invite_link', 'click');
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


Then('I click on courseplanner', async function () {
  await sleep(5000);
  log.debug('Clicking on course planner button');
  await pages.activityTab.populate('courseplanner_button', 'click');
});

When('I click on course card "E2E101"', async function () {
  log.debug('Clicking on course card');
  await pages.CourseTemplate.populate('course_card_button_instructor', 'click', 'resource_tab');
});

When('I validate enrolled course should be displayed in instructor', async function () {
  await pages.CourseTemplate.checkWebElementExists('coustomer_support_validation')
});


// I am still working on this (learning curve)
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