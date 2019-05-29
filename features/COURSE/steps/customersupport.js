const { Given, When, Then } = require('cucumber');
const pages = require('../pages/.page.js').pages;
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);

When(/^I assign "(.*)" to the "(.*)" course$/, async function (userName, courseName) {
  let user = await _.get(users, [this.environment, userName]);
  await pages.course_list.populate('search', courseName);
  await pages.course_list.assertElementExists('course_name', courseName);
  await pages.course_list.click('course_menu', courseName);
  await pages.course_list.click('Manage_instructor');
  await pages.create_course.populate('add_instructor', user.username);
  await pages.create_course.click('add_instructor_button');
  await pages.create_course.click('add_instructor_close');
});
