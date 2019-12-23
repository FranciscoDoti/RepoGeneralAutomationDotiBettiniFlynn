const { Given } = require('cucumber');
const { loginAchieveCw } = require('../../shared/steps/login');
const { viewCourse, selectGradebookMenu } = require('../helpers');
const { courses: coursesPage } = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;

Given(/^navigate to my course using course "(.*)"$/, viewCourse);
Given(/^navigate to Gradebook using course "(.*)"$/, async function (course) {
  await viewCourse(course);
  await selectGradebookMenu();
});
Given('Instructor views the Gradebook for {string} as {string}', async function (course, userType) {
  await loginAchieveCw.call(this, userType);
  await coursesPage.waitForElementVisibility('createNewCourseButton');
  await viewCourse(course);
  await selectGradebookMenu();
});
Given('Instructor views the My Course for {string} as {string}', async function (course, userType) {
  await loginAchieveCw.call(this, userType);
  await coursesPage.waitForElementVisibility('createNewCourseButton');
  await viewCourse(course);
});
