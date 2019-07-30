const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);


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

When(/^I check the account of "(.*)"$/, async function (userName){
  let user = await _.get(users, [this.environment, userName]);
  await pages.home.click('togglerMenu');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('checkAccount');
  await pages.adminMenu.populate('checkAccountEmailId', user.username);
  await pages.adminMenu.click('checkAccountSearchButton');
})

Then(/^I verify that "(.*)" details$/, async function (userName, data_table){
  let user = await _.get(users, [this.environment, userName]);
  await pages.adminMenu.assertTextIncludes('studentEmail', user.username);
  for (let i = 0; i < data_table.rows().length; i++) {
    await pages.adminMenu.assertTextIncludes(data_table.hashes()[i].Details, data_table.hashes()[i].Value);
  }
})

When(/^I generate access code for "(.*)"$/, async function (courseName){
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseName', courseName);
  await pages.createCourse.click('courseCard', courseName);
  await pages.createCourse.assertTextIncludes('courseTitle', 'E2E 301: '+courseName )
  await pages.home.click('togglerMenu');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('checkAccount');
  await pages.adminMenu.click('createAccesscode');
})

Then('I verify that access code is generated', async function (){
  await pages.adminMenu.assertElementExists('accessCode');
})

When('I update the access code', async function (data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
  await pages.adminMenu.getText('accessCode');
  let text = await pages.adminMenu.getText('accessCode');
  await pages.adminMenu.click('closeGenerateAccessCode');
  await pages.home.click('achieveHome');
  await pages.home.click('togglerMenu');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('updateAccessCode');
  await pages.adminMenu.populate('updateAccessCodeInput', text);
  await pages.adminMenu.click('updateAccessCodeSearch');
  await pages.adminMenu.populate(data_table.hashes()[i].AccessCode, data_table.hashes()[i].Value);
  await pages.adminMenu.click('update');
  }
});
