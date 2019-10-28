const { When, Then, Given } = require('cucumber');
const pages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const { visitURL } = require(`${process.cwd()}/app/driver`);

Given(/^navigate to my course using course "(.*)"$/, async function (course) {
  await pages.gradebook.waitForElementVisibility('menuUserName')
  const courses = this.getCourseData();
  var currentURL = await pages.gradebook.getCurrentURL();
  var courseURL = currentURL + `/${courses[course].courseId}/mycourse`;
  await visitURL(courseURL);
});

When('I click the Gradebook menu link', async function () {
  await pages.gradebook.waitForElementVisibility('mainNav')
  await pages.gradebook.click('mainNav');
});

Then('I should see the settings button appear', async function () {
  await pages.gradebook.waitForElementVisibility('settingsNav')
});
