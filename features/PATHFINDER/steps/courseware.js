const { When, Then } = require('cucumber');
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

When('I launch the Practice Test for Expressions', async function () {
  await driver.getDriver().manage().window().setRect({width: 1440, height: 900});
// This refresh is here so that the test doesn't fail if it encounters the
// courseware bug described in PSV-3956
  await driver.getDriver().navigate().refresh();
  await pages.coursePage.click('tab', 'COURSE PLAN');
  await pages.coursePlanner.click('folderName', 'Chemistry');
  await pages.coursePlanner.click('folderName', 'Expressions');
  await pages.coursePlanner.click('activityName', 'Practice Test for Expressions');
});

When('I launch the Final Test for Expressions', async function () {
  await driver.getDriver().manage().window().setRect({width: 1440, height: 900});
// This refresh is here so that the test doesn't fail if it encounters the
// courseware bug described in PSV-3956
  await driver.getDriver().navigate().refresh();
  await pages.coursePage.click('tab', 'COURSE PLAN');
  await pages.coursePlanner.click('folderName', 'Chemistry');
  await pages.coursePlanner.click('folderName', 'Expressions');
  await pages.coursePlanner.click('activityName', 'Final Test for Expressions');
});

Then('I refresh the page', async function () {
  await driver.getDriver().navigate().refresh();
  await driver.getDriver().sleep(6000);
});

Then('I refresh the page', async function () {
  await driver.getDriver().navigate().refresh();
  await driver.getDriver().sleep(6000);
});

Then('I refresh the page', async function () {
  await driver.getDriver().navigate().refresh();
  await driver.getDriver().sleep(6000);
});

Then('I refresh the page', async function () {
  await driver.getDriver().navigate().refresh();
  await driver.getDriver().sleep(6000);
});
