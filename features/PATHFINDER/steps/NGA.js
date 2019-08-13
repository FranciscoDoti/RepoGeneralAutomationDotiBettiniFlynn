const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;

// When('I complete an NGA assignment with the following answers', async function (datatable) {
//   for (let i = 0; i < datatable.rows().length: i++) {
    
//   }
// })

Then("the user should be taken to a student preview", async function () {
  await pages.NGA.assertElementExists("About Student Preview Modal");
  await pages.NGA.assertElementExists("About Student Preview Modal Cancel Button");
  await pages.NGA.click("About Student Preview Modal Continue Button");
  await pages.NGA.assertElementExists("Student Preview Bar");
  await pages.NGA.assertElementExists("Submit All Questions Button");
  await pages.NGA.assertElementExists("Save Answer Button");
})

Then("the user should be taken to the activity editor", async function () {
  await pages.NGA.assertElementExists("Assignment Preview Button");
  await pages.NGA.assertElementExists("Grading Settings Button");
})
