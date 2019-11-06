const { When, Then } = require('cucumber');
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

When('I launch a reading', async function () {
  await driver.getDriver().manage().window().setRect({width: 1440, height: 900});
  await pages.coursePage.click('tab', 'COURSE PLAN');
  await pages.coursePlanner.click('activityName', 'Dialectal English');
  await driver.getDriver().sleep(5000);
})
