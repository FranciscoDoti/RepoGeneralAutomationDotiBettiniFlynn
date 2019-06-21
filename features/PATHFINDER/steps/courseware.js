const { Given, When, Then } = require('cucumber');
const expect = require('chai').expect;
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;
const cwpages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;

When('I launch the Practice Test for Expressions', async function () {
  await driver.getDriver().manage().window().setRect({width: 1440, height: 900});
  await cwpages.coursePage.click('coursePlanner');
  await pages.courseware.click('chemistryFolder');
  await pages.courseware.click('expressionsFolder');
  await pages.courseware.click('expressionsPracticeTestLink');
});
