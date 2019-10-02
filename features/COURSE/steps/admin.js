const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const expect = require('chai').expect;
const csvtojson = require('csvtojson');
const driver = require(`${process.cwd()}/app/driver.js`);

When(/^I enroll the "(.*)" in "(.*)" course$/, async function (userType, courseName) {
  let user = this.users[userType];
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName);
  await pages.createCourse.click('courseCard', courseName);
  await driver.getDriver().navigate().refresh();
  await pages.createCourse.assertElementExists('courseTitle', 'E2E 301: '+courseName )
  await pages.home.scrollElementIntoView('togglerMenu');
  await pages.home.assertElementExists('togglerMenu');
  await pages.home.click('togglerMenu');
  await pages.adminMenu.waitForElementVisibility('admin');
  await pages.adminMenu.assertElementExists('admin');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.assertElementExists('manageEnrollments');
  await pages.adminMenu.click('manageEnrollments');
  await pages.adminMenu.populate('emailInput', user.username);
  await pages.adminMenu.click('addUserButton');
  await pages.home.click('closeAlert');
  await pages.adminMenu.click('closeManageRoles');
});

When(/^I search for "(.*)" and click on course card$/, async function (courseName) {
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseName', courseName);
  await pages.createCourse.click('courseCard', courseName);
});

When('I click on Manage roles', async function () {
  await pages.home.assertElementExists('togglerMenu');
  await pages.home.click('togglerMenu');
  await pages.adminMenu.assertElementExists('admin');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.waitForElementVisibility('manageRoles');
  await pages.adminMenu.assertElementExists('manageRoles');
  await pages.adminMenu.click('manageRoles')
});

Then('I verify Manage roles is displayed', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.adminMenu.assertElementExists(data_table.hashes()[i].field)
    await pages.adminMenu.assertElementDisabled(data_table.hashes()[i].disabled)
  }
});

When(/^I revoke "(.*)" of "(.*)"$/, async function (roles, userType) {
  let user = this.users[userType];
  await pages.adminMenu.populate('manageRolesEmailInput', user.username);
  await pages.adminMenu.populate('chooseRole', roles);
  await pages.adminMenu.click('revokeRole');
  await pages.home.click('closeAlert');
});

When(/^I grant "(.*)" to the "(.*)"$/, async function (roles, userType) {
  let user = this.users[userType];
  await pages.adminMenu.populate('manageRolesEmailInput', user.username);
  await pages.adminMenu.populate('chooseRole', roles);
  await pages.adminMenu.click('grantRole');
});

Then(/^I verify the message for each "(.*)"$/, async function (message) {
  await pages.home.assertTextIncludes('alert', message);
});

When('I generate and export course report', async function (){
  await pages.home.click('togglerMenu');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('courseReport');
  await pages.adminMenu.click('generateReport')
  await pages.adminMenu.click('exportReport');
});

Then('I verify the report is dowloaded with following data', async function (datatable) {
  const current = new Date();
  let month = current.getDate();
  let courseReport = `${this.downloadLocation}/course_report_${current.toString().split(' ')[1]}-${month<10?("0"+month):(month)}-${current.getFullYear()}.csv`;
  const data = await csvtojson().fromFile(courseReport);
  for (let i = 0; i < datatable.rows().length; i++) {
      expect(data[0]).to.have.property(datatable.hashes()[i].ColumnName);
  }
});


When(/^I click on "(.*)" Tab$/, async function (tabName){
  await pages.coursePage.click('Tab', tabName)
});

Then('I verify that following Tab are present', async function (data_table){
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.coursePage.assertElementExists('Tab', data_table.hashes()[i].Tabs)
  }
})

When(/^I click on "(.*)" card$/, async function (courseName){
  await pages.courseList.click('courseCard')
});
