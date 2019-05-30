const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);

When(/^I assign "(.*)" to the "(.*)" course$/, async function (userName, courseName) {
  let user = await _.get(users, [this.environment, userName]);
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('course_name', courseName);
  await pages.courseList.click('course_menu', courseName);
  await pages.courseList.click('Manage_instructor');
  await pages.createCourse.populate('add_instructor', user.username);
  await pages.createCourse.click('add_instructor_button');
  await pages.createCourse.click('add_instructor_close');
});
