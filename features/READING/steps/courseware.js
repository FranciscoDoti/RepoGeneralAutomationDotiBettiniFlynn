const { When, Then } = require('cucumber');
const { sleep } = require('test-automation-pack/utils');
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

When('I launch a reading', async function () {
  await driver.getDriver().manage().window().setRect({width: 1440, height: 900});
  await pages.coursePage.click('tab', 'COURSE PLAN');
  await pages.coursePlanner.click('activityName', 'Dialectal English');
  await sleep(5000);
})
