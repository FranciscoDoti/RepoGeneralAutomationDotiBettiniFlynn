const { Given, When, Then } = require('cucumber');
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/PATHFINDER/data/users.json`);
const urls = require(`${process.cwd()}/config/urls.json`);
const driver = require(`${process.cwd()}/app/driver.js`);
const { visitURL } = require(`${process.cwd()}/app/driver`);
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;

Given(/^I launch the Practice Test for Expressions from the "(.*)" course as "(.*)"$/, async function (courseName, userType) {
  let url = await _.get(urls, ['Achieve-CW', this.environment]);
  let user = await _.get(users, [this.environment, userType]);

  await visitURL(url);
  await driver.getDriver().manage().window().setRect({width: 1440, height: 900});
  await pages.courseware.click('signinlink');
  await pages.courseware.populate('username', user.username);
  await pages.courseware.populate('password', user.password);
  await pages.courseware.click('signin');
  await pages.courseware.populate('search', courseName);
  await pages.courseware.assertElementExists('courseName', courseName);
  await pages.courseware.click('courseCard', courseName);
  await pages.courseware.click('coursePlanner');
  await pages.courseware.click('chemistryFolder');;
  await pages.courseware.click('expressionsFolder');
  await pages.courseware.click('expressionsPracticeTestLink');
});
