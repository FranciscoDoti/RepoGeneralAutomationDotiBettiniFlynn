const { Then } = require('cucumber');
const coursePages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const gradebookPages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;

// Will need to revist this once there's a data attribute available on the Status column
Then('I verify my template is active', async function () {
  const courseName = this.data.get('courseName');
  await coursePages.courseList.populate('search', courseName);
  await coursePages.createCourse.assertElementExists('courseCard', courseName)
});