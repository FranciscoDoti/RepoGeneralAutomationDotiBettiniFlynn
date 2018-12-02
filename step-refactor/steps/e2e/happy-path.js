const {When, Then, After} = require('cucumber');
const {loadLogin} = require('../../../app/util');
const {PageObject} = require('../../../app/pageObject');
const {log} = require('../../../app/logger');
const coursewareStepsPath = process.cwd() + '/features/pageDefs/Courseware/';
const { loadConfig } = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const {getDriver, sleep} = require('../../../app/driver');
const {By} = require('selenium-webdriver');
const assert = require('assert');
const config = loadConfig('config');
const { connectClient } = require('../../../app/imap');
var countlinks

// const emailid = Math.random().toString(36).substr(2, 6) + '@gmail.com';(adding random email id use this)
let pages = {
  courseTemplate: new PageObject('course-template-directory.json', coursewareStepsPath),
  activityTab: new PageObject('activity-tab.json', coursewareStepsPath),
  resourceView: new PageObject('resource-tab-view.json', coursewareStepsPath),
  courseplanner: new PageObject('course-planner-teb-view.json', coursewareStepsPath),
  navigation: new PageObject('navigation.json', stepsPath)
}

After('@courseware-logout', async function () {
  const url = config['baseURL'];
  await getDriver().get(url);
  await sleep(3000);
  await pages.navigation.populate('menu_system', 'click');
  await pages.navigation.populate('logout', 'click');
})

When('I click the create_course button to create course', async function () {
  log.debug('Clicking on create course button');
  await pages.courseTemplate.populate('create_course', 'click');
});

When('I fill out the form to create a new course', async function (dataTable) {
  await pages.courseTemplate.populateDatatable(dataTable);
});

When(/^I validate the message "(.*)"$/, async function (message) {
  const coursemessage = await pages.courseTemplate.getElementValue('course_message_validation');
  assert(coursemessage === message, 'The course is not created');
});
Then('I validate that the course "$course.templatename" is listed in the courses page', async function () {
  const courseValidation = await pages.courseTemplate.checkWebElementExists('course_validation')
  assert(courseValidation, 'The course is not present')
});
When('I elect to edit the course named "course1.templatename"', async function () {
  await pages.courseTemplate.populate('edit_button', 'click');
});

Then('I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"', async function () {
  const templateValidation = await pages.courseTemplate.checkWebElementExists('Template_validate')
  assert(templateValidation, 'Its not converted into Template')
});

Then('I click on course card "Testcourse" template', async function () {
  log.debug('Clicking on course card');
  await pages.courseTemplate.populate('course_card_button', 'click', 'resources_tab');
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
    await pages.courseTemplate.populate('search_course', temp);
  } catch (err) {
    log.error(err);
  }
});

Then(/^I copy the course named "Testcourse" to the name "(.*)"$/, async function (copy) {
  await pages.courseTemplate.populate('copy_course', 'click');
  await pages.courseTemplate.populate('copy_course_name', copy);
  await sleep(3000);
  await pages.courseTemplate.populate('save_button', 'click');
  await sleep(3000);
});

When('I activate the course', async function () {
  await pages.courseTemplate.populate('Template_status', 'Active On Date', 'click');
  await sleep(3000);
  await pages.courseTemplate.populate('Active_Date1', 'click');
  await pages.courseTemplate.populate('Active_Date@now', 'click');
  await pages.courseTemplate.populate('course_end_date1', 'click');
  await pages.courseTemplate.populate('Next_Month', 'click');
  await pages.courseTemplate.populate('Next_Month', 'click');
  await pages.courseTemplate.populate('Select_Date', 'click');
  await pages.courseTemplate.populate('save_button', 'click');
})
When(/^I search "(.*?)"$/, async function (value) {
  log.debug('Clicking on search_course');
  await pages.courseTemplate.populate('search_course', value);
});
Then('I open the Manage Instructors page on the course named "$course1.name"', async function () {
  await pages.courseTemplate.populate('Manage_Instructor', 'click');
});
Then(/^I manage the instructors on the course and add the "(.*)" loginUser$/, async function (username) {
  const login = await loadLogin(username);
  log.debug('Clicking Instructor_Email button');
  await pages.courseTemplate.populate('Instructor_Email', login.username);
  log.debug('Clicking Add_instructor button');
  await pages.courseTemplate.populate('Add_instructor', 'click');
});
Then('I validate that the Course Specific Link opens the course named "$course1.name"', async function () {
  log.debug('Clicking copy link button');
  await pages.courseTemplate.populate('copy_link', 'click');
});

Then('I close the Manage Instructors page', async function () {
  log.debug('Clicking close button');
  await pages.courseTemplate.populate('close', 'click');
});
When('I elect to edit the course named "$course1.name"', async function () {
  await sleep(2000);
  log.debug('Clicking on edit_button ');
  await pages.courseTemplate.populate('edit_button', 'click');
});
Then('I capture the invite link and store to variable "inviteLink"', async function () {
  log.debug('Clicking on Invite_Students button');
  await pages.courseTemplate.populate('Invite_Students', 'click');
  log.debug('Clicking on Send_Invite button');
  await pages.courseTemplate.populate('Send_Invite', 'click');
});
Then(/^I populate the Invite Students "(.*)" page$/, async function (email) {
  const user = await loadLogin(email)
  log.debug('Clicking on enter_emailid button');
  await pages.courseTemplate.populate('enter_emailid', user.username);
  await pages.courseTemplate.populate('enter_emailid', ' ');
  await pages.courseTemplate.populate('send_button', 'click');
  await sleep(5000);
});
When('I click on course card "Testcourse"', async function () {
  log.debug('Clicking on course_card button');
  await pages.courseTemplate.populate('course_card', 'click');
});

Then('I click on courseplanner', async function () {
  await sleep(5000);
  log.debug('Clicking on course planner button');
  await pages.activityTab.populate('courseplanner_button', 'click');
});

When('I click on course card "E2E101"', async function () {
  log.debug('Clicking on course card');
  await pages.courseTemplate.populate('course_card_button_instructor', 'click', 'resource_tab');
});

When('I validate enrolled course should be displayed in instructor', async function () {
  await pages.courseTemplate.checkWebElementExists('coustomer_support_validation')
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
  await pages.courseTemplate.populate('instructor_tab', 'click');
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
When('I check E-mail for the invite link and use my "(.*)" details to login in "(.*)"', async function () {

});

// Still working on this
// When(/^I open the invite link and login with "(.*)" account details$/,async function (account) {
//   await sleep(3000);
//   await pages.courseTemplate.populate('invite_link', 'click');
//   await sleep(3000);
//   await pages.courseTemplate.scrollIntoView('course_invite_link');
//   const hyperlink = await getDriver().findElement(By.xpath("(//*[@target='_blank'])[37]")).getAttribute('href');
//   await getDriver().get(hyperlink);
//   const mail = await loadLogin(account);
//   await sleep(5000);
//   log.debug(`clicking on Password and confirm password button, ${account}`);
//   await pages.createAccount.populate('password', mail.newpassword);
//   await pages.createAccount.populate('confirmPassword', mail.newpassword);
// });