const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const {sleep} = require(`${process.cwd()}/app/driver`);

When(/^I assign "(.*)" to the "(.*)" course$/, async function (userType, courseName) {
  let user = this.users[userType];
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName);
  await sleep(500)
  await pages.courseList.assertElementExists('courseMenu', courseName); 
  await sleep(500)
  await pages.courseList.click('courseMenu', courseName); 
  await pages.courseList.click('manageInstructor');
  await pages.courseList.populate('addInstructor', user.username);
  await pages.courseList.click('addButton');
  await pages.courseList.assertElementExists('instructorClose');
  await pages.courseList.click('instructorClose');
  await sleep (2000);
});

When(/^I check the account of "(.*)"$/, async function (userType) {
  let user = this.users[userType];
  await pages.home.assertElementExists('togglerMenu');
  await pages.home.click('togglerMenu');
  await pages.adminMenu.assertElementExists('admin');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.assertElementExists('checkAccount');
  await pages.adminMenu.click('checkAccount');
  await pages.adminMenu.assertElementExists('checkAccountEmailId');
  await pages.adminMenu.populate('checkAccountEmailId', user.username);
  await pages.adminMenu.click('checkAccountSearchButton');
})

Then(/^I verify that "(.*)" details$/, async function (userType, data_table) {
  let user = this.users[userType];
  await pages.adminMenu.assertTextIncludes('studentEmail', user.username);
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];
    let jwtpayload = this.users[userType].jwt_payload
    c.name = jwtpayload.name
    c.Id = jwtpayload.Id
    await pages.adminMenu.assertTextIncludes('accountName', c.name);
    await pages.adminMenu.assertTextIncludes('studentId', c.Id);
  }
});


When(/^I generate access code for "(.*)"$/, async function (courseName) {
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName);
  await sleep(500);
  await pages.createCourse.click('courseCard', courseName);
  await pages.createCourse.assertElementExists('courseTitle', 'E2E 301: '+ courseName )
  await pages.home.click('togglerMenu');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('admin');
  await pages.adminMenu.click('checkAccount');
  await pages.adminMenu.click('createAccesscode');
})

Then('I verify that access code is generated', async function () {
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
    await pages.adminMenu.click('admin');
    await pages.adminMenu.click('updateAccessCode');
    await pages.adminMenu.populate('updateAccessCodeInput', text);
    await pages.adminMenu.click('updateAccessCodeSearch');
    await pages.adminMenu.populate(data_table.hashes()[i].AccessCode, data_table.hashes()[i].Value);
    await pages.adminMenu.click('update');
  }
});

When(/^I search for "(.*)" in Courses tab$/, async function (courseName) {
  await pages.courseList.click('courseTemplate', 'COURSES');
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName)
})

When(/^I copy course from the "(.*)" Course with the following data$/, async function (courseName, data_table){
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseMenu', courseName);
  await sleep(500);
  await pages.coursePage.click('courseMenu')
  await pages.copyCourse.click('copyCourse');
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];
    this.data.set('code', c.courseCode);
    this.data.set('courseName',c.courseName);
    await pages.copyCourse.populate('courseName', c.courseName)
    await pages.copyCourse.populate('courseCode', c.courseCode)
  };
  await pages.copyCourse.click('save');
  await pages.home.click('closeAlert');
})
