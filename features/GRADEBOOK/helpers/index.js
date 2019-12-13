const { gradebook } = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const { visitURL } = require(`${process.cwd()}/app/driver`);
const { getCourseData } = require('../data/courses');

async function viewCourse (course) {
  const courses = getCourseData();
  const currentURL = await gradebook.getCurrentURL();
  const urlSplit = currentURL.split('/');
  const baseURL = `${urlSplit[0]}//${urlSplit[2]}`;
  const courseURL = `${baseURL}/courses/${courses[course].courseId}/mycourse`;
  await visitURL(courseURL);
};

async function selectGradebookMenu () {
  await gradebook.waitForElementVisibility('mainNav');
  await gradebook.click('mainNav');
};

module.exports = {
  viewCourse,
  selectGradebookMenu
}
