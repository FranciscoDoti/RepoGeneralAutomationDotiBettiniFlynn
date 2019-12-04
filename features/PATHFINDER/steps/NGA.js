const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;
const driver = require(`${process.cwd()}/app/driver.js`);

When("I complete an NGA assignment with the following answers", async function (datatable) {
  for (let i=0; i < datatable.rows().length; i++){
    await driver.getDriver().sleep(1000);
    await pages.NGA.click('Multiple Choice Button', datatable.hashes()[i].Answer);
    await pages.NGA.click('Next Question Button');
// wait until next question has loaded
    await pages.NGA.waitForElementInvisibility('Save Answer Button', 'Saving');
  }

  await pages.NGA.click('Submit All Questions Button');
  await pages.NGA.click('Submit All Questions Confirmation Button');
});

Then("the user should be taken to a student preview", async function () {
  await driver.getDriver().sleep(2000);
  await pages.NGA.assertElementExists("About Student Preview Modal");
  await driver.getDriver().sleep(2000);
  await pages.NGA.assertElementExists("About Student Preview Modal Cancel Button");
  await pages.NGA.click("About Student Preview Modal Continue Button");
  await driver.getDriver().sleep(2000);
  await pages.NGA.assertElementExists("Submit All Questions Button");
  await driver.getDriver().sleep(2000);
  await pages.NGA.assertElementExists("Save Answer Button", "Save Answer");
});

Then("the user should be taken to the activity editor", async function () {
  await driver.getDriver().sleep(2000);
  await pages.NGA.assertElementExists("Assignment Preview Button");
  await driver.getDriver().sleep(2000);
  await pages.NGA.assertElementExists("Grading Settings Button");
});
