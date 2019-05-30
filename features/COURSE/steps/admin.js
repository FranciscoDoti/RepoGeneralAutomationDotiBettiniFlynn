const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);

When(/^I enroll the "(.*)" in "(.*)" course$/, async function (user, courseName) {
  let payload = await _.get(users, [this.environment, user]);
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('course_card', courseName);
  await pages.createCourse.click('course_card', courseName);
  await pages.home.click('toggler_menu');
  await pages.user.assertElementExists('admin');
  await pages.user.click('admin');
  await pages.home.click('manage_enrollments');
  await pages.home.populate('manage_enrollements_input', payload.username);
  await pages.home.click('add_user_button');
  await pages.home.click('close_manage_roles');
});

When(/^I search for "(.*)" and click on course card$/, async function (courseName) {
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('course_name', courseName);
  await pages.createCourse.click('course_card', courseName);
});
