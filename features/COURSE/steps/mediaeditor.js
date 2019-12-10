const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

Then(/I verify that "(.*)" is present and media editor has access to it has collaborator$/, async function (courseName) {
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName);
  await pages.courseList.assertElementExists('courseMenu', courseName);
});

Then(/^I verify that media editor has only view access to "(.*)"$/, async function (courseName) {
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName);
  await pages.courseList.assertElementDoesNotExist('courseMenu', courseName);
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.assertElementDoesNotExist('navigation','Resources');
  
});

Then(/^I verify that "(.*)" has created with following "(.*)" ISBN number by Media editor$/, async function (courseName, verifyNumber){
  await pages.home.click('closeAlert');
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('ISBNVerification', courseName);
  await pages.createCourse.assertTextIncludes('ISBNVerification', courseName, verifyNumber);
});

When(/^I update "(.*)" template and add the following data by Media editor$/, async function (courseName, data_table){
  await pages.courseList.populate('search', courseName);
  await pages.courseList.waitForElementVisibility('courseMenu', courseName);
  await pages.courseList.click('courseMenu', courseName);
  await pages.editCourse.click('editCourse');
  for (let i = 0; i < data_table.rows().length; i++) {
    var c = data_table.hashes()[i];
    await pages.editCourse.populate('courseName', c.courseName)
    await pages.editCourse.populate('courseCode', c.courseCode)
    await pages.editCourse.populate('templateStatus', c.templateStatus)
  }
  await pages.editCourse.click('save');
  await pages.home.click('closeAlert');
});
