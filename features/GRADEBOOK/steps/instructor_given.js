const { getCourseData } = require('../data/courses');

const { Given } = require('cucumber');
const pages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const { visitURL } = require(`${process.cwd()}/app/driver`);
const { loginAchieveCw } = require('../../shared/steps/login')

async function viewCourse (course) {
  await pages.courses.waitForElementVisibility('createNewCourseButton');
  const courses = getCourseData();
  var currentURL = await pages.gradebook.getCurrentURL();
  var courseURL = currentURL + `/${courses[course].courseId}/mycourse`;
  await visitURL(courseURL);
};

async function selectGradebookMenu () {
  await pages.gradebook.waitForElementVisibility('mainNav');
  await pages.gradebook.click('mainNav');
};

Given(/^navigate to my course using course "(.*)"$/, viewCourse);

Given('Instructor views the Gradebook for {string} as {string}', async function (course, userType) {
  await loginAchieveCw.call(this, userType);
  await viewCourse.call(this, course);
  await selectGradebookMenu();
});
