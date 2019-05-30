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

When('I click on Manage roles', async function () {
  await pages.home.click('toggler_menu');
  await pages.user.click('admin');
  await pages.adminMenu.click('manage_roles')
});

Then('I verify Manage roles is displayed', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.adminMenu.assertElementExists(data_table.hashes()[i].field)
    await pages.adminMenu.elementDisabled(data_table.hashes()[i].disabled)
  }
});

When(/^I revoke "(.*)" of "(.*)"$/, async function (roles, user) {
  let payload = await _.get(users, [this.environment, user]);
  await pages.home.click('toggler_menu');
  await pages.user.click('admin');
  await pages.adminMenu.click('manage_roles')
  await pages.adminMenu.populate('manage_role_email_input', payload.username);
  await pages.adminMenu.populate('manage_role_select_list', roles);
  await pages.adminMenu.click('revokerole');
  await pages.home.click('close_alert');
});

When(/^I grant "(.*)" to the "(.*)"$/, async function (roles, user) {
  let payload = await _.get(users, [this.environment, user]);
  await pages.adminMenu.populate('manage_role_email_input', payload.username);
  await pages.adminMenu.populate('manage_role_select_list', roles);
  await pages.adminMenu.click('grantrole');
});

Then(/^I verify the message for each "(.*)"$/, async function (message) {
  await pages.home.assertTextIncludes('alert', message);
});
