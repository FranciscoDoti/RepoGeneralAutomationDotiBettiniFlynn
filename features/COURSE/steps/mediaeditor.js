const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

Then(/I verify that "(.*)" is present and media editor has access to it has collaborator$/, async function (courseName) {
  await pages.courseList.populate('search', courseName);
  await pages.courseList.assertElementExists('courseName', courseName);
  await pages.courseList.assertElementExists('courseMenu', courseName);
});
