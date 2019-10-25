const { When, Then, Given } = require('cucumber');
const pages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;

const { visitURL } = require(`${process.cwd()}/app/driver`);

Given(/^navigate to my course using course id "(.*)"$/, async function (courseid) {
  var currentURL = await pages.gradebook.getCurrentURL();
  var courseURL = currentURL + `/${courseid}/mycourse`;
  await visitURL(courseURL);
});

When('I click the Gradebook menu link', async function () {
  await pages.gradebook.click('mainNav');
});

Then('I should see the settings button appear', async function () {
  await pages.gradebook.assertElementExists('settingsNav');
});
