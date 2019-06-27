const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);

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
  await pages.home.click('closeAlert');
});

When(/^I search for "(.*)" and click on course card$/, async function (courseName) {
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseName', courseName);
  await pages.createCourse.click('courseCard', courseName);
});

When('I click on Manage roles', async function () {
  await pages.home.click('togglerMenu');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('manageRoles')
});

Then('I verify Manage roles is displayed', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.adminMenu.assertElementExists(data_table.hashes()[i].field)
    await pages.adminMenu.assertDisabled(data_table.hashes()[i].disabled)
  }
});

When(/^I revoke "(.*)" of "(.*)"$/, async function (roles, user) {
  let payload = await _.get(users, [this.environment, user]);
  await pages.adminMenu.populate('manageRolesEmailInput', payload.username);
  await pages.adminMenu.populate('chooseRole', roles);
  await pages.adminMenu.click('revokeRole');
  await pages.home.click('closeAlert');
});

When(/^I grant "(.*)" to the "(.*)"$/, async function (roles, user) {
  let payload = await _.get(users, [this.environment, user]);
  await pages.adminMenu.populate('manageRolesEmailInput', payload.username);
  await pages.adminMenu.populate('chooseRole', roles);
  await pages.adminMenu.click('grantRole');
});

Then(/^I verify the message for each "(.*)"$/, async function (message) {
  await pages.home.assertTextIncludes('alert', message);
});
