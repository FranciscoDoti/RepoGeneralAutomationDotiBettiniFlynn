const { Given, When, Then } = require('cucumber');
const expect = require('chai').expect;
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;

Then(/^there should be a "(.*)" in NGA$/, async function (locator) {
  await pages.NGA.assertElementExists(locator);
})

When(/^I click on the "(.*)" in NGA$/, async function (locator) {
  await pages.NGA.click(locator);
})

Then("the user should be taken to a student preview", async function () {
  await pages.NGA.assertElementExists("aboutStudentPreviewModal");
  await pages.NGA.assertElementExists("aboutStudentPreviewModalCancelButton");
  await pages.NGA.click("aboutStudentPreviewModalContinueButton");
  await pages.NGA.assertElementExists("studentPreviewBar");
  await pages.NGA.assertElementExists("submitAllQuestionsButton");
  // await driver.sleep(3000)
  await pages.NGA.assertElementExists("saveAnswerButton");
})

Then("the user should be taken to the activity editor", async function () {
  await pages.NGA.assertElementExists("assignmentPreviewButton");
  await pages.NGA.assertElementExists("resetPreviewAttemptsButton");
})
