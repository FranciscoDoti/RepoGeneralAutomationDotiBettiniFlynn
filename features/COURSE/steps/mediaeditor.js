const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

Then(/I verify that "(.*)" is present and media editor has access to it has collaborator$/, async function (courseName) {
  await pages.courseList.populate('search', courseName);
  await pages.createCourse.assertElementExists('courseCard', courseName);
  await pages.courseList.assertElementExists('courseMenu', courseName);
});

Then(/I verify that media editor has only view access to "(.*)"$/, async function (courseName) {
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseName', courseName);
  await pages.courseList.assertElementDoesNotExist('courseMenu', courseName);
  await pages.createCourse.click('courseCard', courseName);
  await pages.coursePage.click('navigation','Resources');
  await pages.resources.assertElementDoesNotExist('addFolder')
  
});
