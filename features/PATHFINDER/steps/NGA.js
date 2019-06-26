const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;

Then(/^there should be a "(.*)" in NGA$/, async function (locator) {
  await pages.NGA.assertElementExists(locator);
})

When(/^I click on the "(.*)" in NGA$/, async function (locator) {
  await pages.NGA.click(locator);
})

Then("the user should be taken to a student preview", async function () {
  await pages.instructorAssignment.assertElementExists("Pathfinder Modal");
  await pages.NGA.assertElementExists("About Student Preview Modal Cancel Button");
  await pages.NGA.click("About Student Preview Modal Continue Button");
  await pages.NGA.assertElementExists("Student Preview Bar");
  await pages.NGA.assertElementExists("Submit All Questions Button");
  await pages.NGA.assertElementExists("Save Answer Button");
})

Then("the user should be taken to the activity editor", async function () {
  await pages.NGA.assertElementExists("Assignment Preview Button");
  await pages.NGA.assertElementExists("Reset Preview Attempts Button");
})
