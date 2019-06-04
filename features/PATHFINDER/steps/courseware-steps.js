const { Given, When, Then } = require('cucumber');
const expect = require('chai').expect;
const _ = require('lodash');
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/COURSE/pages/.page.js`).pages;
const pf_pages = require(`${process.cwd()}/features/PATHFINDER/pages/page.js`).pf_pages;


When(/^I go to course "(.*)"$/, async function (courseName) {
  await pages.create_course.click('course_card', courseName);
});

When('I click on the course planner tab', async function () {
  await pages.course_page.click('course_planner');
});

When('I click on the Chemistry folder', async function () {
  await pf_pages.pf_course.click('chemistry_folder');
});
