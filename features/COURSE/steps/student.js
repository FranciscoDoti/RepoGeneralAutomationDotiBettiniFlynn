const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const Pages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const csvtojson = require('csvtojson');

When('I complete the reading activity', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.overview.click('activityName', data_table.hashes()[i].activity);
  }
  await pages.coursePlanner.click('close');
});

Then('I verify the activity status for the following activities', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.overview.assertTextIncludes('activityStatus', data_table.hashes()[i].activity, data_table.hashes()[i].status);
  }
});

When('I delete the courses', async function () {
  let elements = await pages.createCourse.getWebElements('courseCard');
  for (let x = 0; x <= elements.length; x++) {
    await pages.courseList.click('courseMenu');
    await pages.main.click('confirmDelete');
  }
});

When(/^I attempt "(.*)" premade assesment in "(.*)"$/, async function (activityName, courseName, data_table) {
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('overview')
  await pages.overview.click('activityName', activityName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.studentActivity.click('assesmnetAnswer', data_table.hashes()[i].PremadeAssesmentKey);
    await pages.studentActivity.click('saveAnswer');
    await pages.studentActivity.click('nextAssesmentQuestion');
  }
  await pages.coursePlanner.click('close')
});

When(/^I attempt "(.*)" custom made assesment in "(.*)"$/, async function (activityName, courseName, data_table) {
  await pages.coursePage.click('overview')
  await pages.overview.click('activityName', activityName);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.studentActivity.click('assesmnetAnswer', data_table.hashes()[i].key);
    await pages.studentActivity.click('saveaAswer');
    await pages.studentActivity.click('nextAssesmentQuestion');
  }
  await pages.coursePlanner.click('close')
});

Then('I verify the assignmenent grades in gradebook for below assigned activities', async function (data_table) {
  await pages.coursePage.click('navigation','Gradebook');
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.gradebook.assertTextIncludes('studentPercent', data_table.hashes()[i].activity, data_table.hashes()[i].percentage);
    await pages.gradebook.assertTextinclue('studentAssignmentpoints', data_table.hashes()[i].activity, data_table.hashes()[i].percentage);
    await pages.gradebook.assertTextIncludes('studentPercenOfTotalGrades', data_table.hashes()[i].activity, data_table.hashes()[i].PercentOfTotalgrades)
  }
});

When(/^I enroll "(.*)" in the course using "(.*)"$/, async function (userName, courseName){
  await pages.createCourse.getText('courseShortId');
  let user = await _.get(users, [this.environment, userName]);
  let text = await pages.createCourse.getText('courseShortId');
  await Pages.login.click('togglerMenu');
  await Pages.login.click('signOut');
  await Pages.login.click('signinlink');
  await Pages.login.populate('username', user.username);
  await Pages.login.populate('password', user.password);
  await Pages.login.click('signin');
  await pages.coursePage.click('enroll');
  await pages.coursePage.populate('accessModelInput', text);
  await pages.coursePage.click('enter');
  let courseReport = `${this.downloadLocation}/achieveaccesscode_${courseName}.csv`;
  const data = await csvtojson().fromFile(courseReport);
  await pages.coursePage.populate('accessModelInput', data[0]["Access Code"]);
  await pages.coursePage.click('enter');
  await pages.coursePage.click('finishEnrollement');
});
