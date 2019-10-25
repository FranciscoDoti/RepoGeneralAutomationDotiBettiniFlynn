const { When, Then, Given } = require('cucumber');
const { sleep } = require(`${process.cwd()}/app/driver`);
const pages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;

const { visitURL } = require(`${process.cwd()}/app/driver`);

Given(/^navigate to my course using course id "(.*)"$/, async function (courseid) {
  var currentURL = await pages.login.getCurrentURL();
  var courseURL = currentURL + `courses/${courseid}/mycourse`;
  await visitURL(courseURL);
});

When('I click the Gradebook menu link', async function (courseId) {
  await sleep(15000);
  console.log('------------- Instructor When');
});

Then('I should see the settings button appear', async function () {
  console.log('------------- Instructor Then');
});
