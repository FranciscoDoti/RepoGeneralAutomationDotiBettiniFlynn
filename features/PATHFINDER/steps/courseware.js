const {Given, When, Then } = require('cucumber');
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

When(/^I launch the Pathfinder Assignment "(.*)"$/, async function (assignment) {
  // await driver.getDriver().manage().window().setRect({width: 1440, height: 900});
// This refresh is here so that the test doesn't fail if it encounters the
// courseware bug described in PSV-3956
  await driver.getDriver().navigate().refresh();
  await pages.coursePage.click('tab', 'COURSE PLAN')
  await pages.coursePlanner.click('activityName', assignment);
});

When('I delete all automation courses', async function () {
  await pages.courseList.populate('search', 'PF Automation');
  await driver.getDriver().sleep(500);
  let elements = await pages.courseList.getWebElements('courseCard');
  for (let i = 0; i < elements.length; i++) {
    await pages.coursePage.click('courseMenu');
    await driver.getDriver().sleep(500);
    await pages.courseList.click('deleteCourse');
    await pages.courseList.click('confirmDelete');
  }
});

When(/^I click on the course card for "(.*)"$/, async function (courseName) {
  await pages.courseList.click('courseCard', courseName);
});
