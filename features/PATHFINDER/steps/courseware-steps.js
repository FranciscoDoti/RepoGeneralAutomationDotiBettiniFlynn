const { Given, When, Then } = require('cucumber');
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;


When('I click on the course planner tab', async function () {
  await pages.courseware.click('coursePlanner');
});

When('I launch the Practice Test for Expressions', async function () {
  await pages.courseware.click('coursePlanner')
  await pages.courseware.click('chemistryFolder');
  await pages.courseware.click('expressionsFolder')
  await pages.courseware.click('expressionsPracticeTest')
});
