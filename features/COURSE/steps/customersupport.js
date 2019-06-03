const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users/allusers.json`);

When(/^I assign "(.*)" to the "(.*)" course$/, async function (userName, courseName) {
  let user = await _.get(users, [this.environment, userName]);
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseName', courseName);
  await pages.courseList.click('courseMenu', courseName);
  await pages.courseList.click('manageInstructor');
  await pages.courseList.populate('addInstructor', user.username);
  await pages.courseList.click('addButton');
  await pages.courseList.click('instructorClose');
});
