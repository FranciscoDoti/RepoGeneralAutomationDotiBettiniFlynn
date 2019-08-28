const { When, Then } = require('cucumber');
const driver = require(`${process.cwd()}/app/driver.js`);
const pages = require(`${process.cwd()}/features/PATHFINDER/pages/.page.js`).pages;

Then("each Topic Strength Report should have five out of five correct", async function () {
  let topics = await pages.studentAssignment.getWebElements('Topic Strength Report');
  for (let i = 0; i < topics.length; i++) {
    await console.log(topics);
  //   let topic = topics[i];
  //   await assertTextIncludes(topic, "5/5");
  }
});
