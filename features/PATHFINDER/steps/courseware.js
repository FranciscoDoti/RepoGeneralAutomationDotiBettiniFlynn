const { When, Then } = require('cucumber');
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

When(/^I launch the Pathfinder Assignment "(.*)"$/, async function (assignment) {
  await driver.getDriver().sleep(500);
  await driver.getDriver().navigate().refresh();
  await pages.coursePage.click('tab', 'COURSE PLAN')
  await pages.coursePlanner.click('activityName', assignment);
});

When('I delete automation courses', async function () {
  await pages.courseList.assertElementExists('courseTemplate', 'COURSES')
  await pages.courseList.click('courseTemplate', 'COURSES');
  await driver.getDriver().sleep(500);
  let elements = await pages.createCourse.getWebElements('courseCard','PF Automation Student Test');
  for (let i = 0; i < elements.length; i++) {
    await pages.coursePage.click('courseMenu');
    await pages.courseList.waitForElementVisibility('deleteCourse');
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
  }
});

When(/^I click on the course card for "(.*)"$/, async function (courseName) {
  await pages.createCourse.assertElementExists('courseCard', courseName);
  await pages.createCourse.click('courseCard', courseName);
});
