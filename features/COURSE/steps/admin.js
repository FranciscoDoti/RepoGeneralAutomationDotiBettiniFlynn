const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/allusers.json`);

When(/^I enroll the "(.*)" in "(.*)" course$/, async function (user, courseName) {
  let payload = await _.get(users, [this.environment, user]);
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName);
  await pages.createCourse.click('courseCard', courseName);
  await pages.home.click('togglerMenu');
  await pages.adminMenu.assertElementExists('admin');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('manageEnrollments');
  await pages.adminMenu.populate('emailInput', payload.username);
  await pages.adminMenu.click('addUserButton');
  await pages.adminMenu.click('closeManageRoles');
});

When(/^I search for "(.*)" and click on course card$/, async function (courseName) {
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseName', courseName);
  await pages.createCourse.click('courseCard', courseName);
});
