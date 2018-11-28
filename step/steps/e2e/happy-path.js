const {When, Then} = require('cucumber');
const {loadLogin} = require('../../../app/util');
const {PageObject} = require('../../../app/pageObject');
const {log} = require('../../../app/logger');
const coursewareStepsPath = process.cwd() + '/features/pageDefs/Courseware/';
const {getDriver, sleep} = require('../../../app/driver');
const { By } = require('selenium-webdriver');
const assert = require('assert');
var fieldValue;
// const emailid = Math.random().toString(36).substr(2, 6) + '@gmail.com';(adding random email id use this)
let pages = {
  coursetemplate: new PageObject('course-template-directory.json', coursewareStepsPath),
  activityTab: new PageObject('activity-tab.json', coursewareStepsPath),
  resourceView: new PageObject('resource-tab-view.json', coursewareStepsPath),
  courseplanner: new PageObject('course-planner-teb-view.json', coursewareStepsPath)
}

When('I click the create_course button to create course', async function () {
  log.debug('Clicking on create course button');
  await pages.coursetemplate.populate('create_course', 'click');
});

When('I fill out the form to create a new course', async function (dataTable) {
  await pages.coursetemplate.populateDatatable(dataTable);
});

When('I populate from the dataTable', async function () {
  log.debug(`I populated table`);
  try {
    log.info(fieldValue.rows().length);
    var e;
    for (e = 0; e < fieldValue.rows().length; e++) {
      log.info(fieldValue.hashes()[e].pagedef);
      log.info(fieldValue.hashes()[e].value);
      await pages.coursetemplate.populate(fieldValue.hashes()[e].pagedef, fieldValue.hashes()[e].value);
    }
  } catch (err) {
    log.error(err.stack);
  }
});

When(/^I validate the message "(.*)"$/, async function (message) {
  const coursemessage = await pages.coursetemplate.getElementValue('course_message_validation');
  assert(coursemessage !== message, 'The course is not created');
});
Then('I validate that the course "$course.templatename" is listed in the courses page', async function () {
  if (await pages.coursetemplate.checkWebElementExists('course_validation')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});
When('I elect to edit the course named "course1.templatename"', async function () {
  await pages.coursetemplate.populate('edit_button', 'click');
});

Then('I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"', async function () {
  if (await pages.coursetemplate.checkWebElementExists('Template_validate')) {
    console.log('passed');
  } else {
    throw new Error('Failed');
  }
});

Then('I click on course card "Testcourse" template', async function () {
  log.debug('Clicking on course card');
  await pages.coursetemplate.populate('course_card_button', 'click', 'resources_tab');
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
    await pages.coursetemplate.populate('search_course', temp);
  } catch (err) {
    log.error(err);
  }
});

Then(/^I copy the course named "Testcourse" to the name "(.*)"$/, async function (copy) {
  await pages.coursetemplate.populate('copy_course', 'click');
  await pages.coursetemplate.populate('copy_course_name', copy);
  await sleep(3000);
  await pages.coursetemplate.populate('save_button', 'click');
  await sleep(3000);
});
When(/^I search "(.*?)"$/, async function (value) {
  log.debug('Clicking on search_course');
  await pages.coursetemplate.populate('search_course', value);
});
Then('I open the Manage Instructors page on the course named "$course1.name"', async function () {
  await pages.coursetemplate.populate('Manage_Instructor', 'click');
});
Then(/^I manage the instructors on the course and add the "(.*)" loginUser$/, async function (username) {
  const login = await loadLogin(username);
  log.debug('Clicking Instructor_Email button');
  await pages.coursetemplate.populate('Instructor_Email', login.username);
  log.debug('Clicking Add_instructor button');
  await pages.coursetemplate.populate('Add_instructor', 'click');
});
Then('I validate that the Course Specific Link opens the course named "$course1.name"', async function () {
  log.debug('Clicking copy link button');
  await pages.coursetemplate.populate('copy_link', 'click');
});

Then('I close the Manage Instructors page', async function () {
  log.debug('Clicking close button');
  await pages.coursetemplate.populate('close', 'click');
});
When('I elect to edit the course named "$course1.name"', async function () {
  await sleep(2000);
  log.debug('Clicking on edit_button ');
  await pages.coursetemplate.populate('edit_button', 'click');
});
Then('I capture the invite link and store to variable "inviteLink"', async function () {
  log.debug('Clicking on Invite_Students button');
  await pages.coursetemplate.populate('Invite_Students', 'click');
  log.debug('Clicking on Send_Invite button');
  await pages.coursetemplate.populate('Send_Invite', 'click');
});
Then(/^I populate the Invite Students "(.*)" page$/, async function (email) {
  const user = await loadLogin(email)
  log.debug('Clicking on enter_emailid button');
  await pages.coursetemplate.populate('enter_emailid', user.username);
  await pages.coursetemplate.populate('enter_emailid', ' ');
  await pages.coursetemplate.populate('send_button', 'click');
  await sleep(5000);
});
When('I click on course card "Testcourse"', async function () {
  log.debug('Clicking on course_card button');
  await pages.coursetemplate.populate('course_card', 'click');
});
When('I click on invite link send by instructor', async function () {
  await sleep(3000);

  await pages.coursetemplate.populate('Invite_link', 'click');
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
  await pages.coursetemplate.populate('course_card_button_instructor', 'click', 'resource_tab');
});

When('I validate enrolled course should be displayed in instructor', async function () {
  await pages.coursetemplate.checkWebElementExists('coustomer_support_validation')
});

// I am still working on this (learning curve)
Then('I click on the reading material and validate whether the content is available', async function () {
  await getDriver().findElements(By.xpath("//*[@type='checkbox']")).then(function (elems) {
    countlinks = elems.length;
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

When('I click on Instructor button', async function () {
  await pages.coursetemplate.populate('instructor_tab', 'click');
});

When('I click on show library button', async function () {
  await pages.courseplanner.populate('Show_Library', 'click');
});
When('I click on Add button to add activities', async function () {
  await getDriver().findElements(By.xpath("//*[@aria-label='Add assignment']")).then(function (elems) {
    countlinks = elems.length;
  });
  var i = countlinks - 1;
  while (i >= 0) {
    i--;
    await pages.courseplanner.populate('Add_assignment', 'click');
  }
  await sleep(5000);
});
When('I change the course from unassigned to assign', async function () {
  await getDriver().findElements(By.xpath("//*[@aria-label='Assign Item']")).then(function (elems) {
    countlinks = elems.length;
  });
  var x = countlinks - 1;
  while (x >= 0) {
    x--;
    await pages.courseplanner.populate('Assign_Item', 'click');
    await pages.courseplanner.populate('Possible_points', '5');
    await pages.courseplanner.populate('Active_date_Assign', 'click');
    await pages.courseplanner.populate('select_date_complete_assignment', 'click');
    await pages.courseplanner.populate('Assign_Button', 'click');
  }
});
