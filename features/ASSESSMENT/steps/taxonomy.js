const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/ASSESSMENT/pages/.page.js`).pages;
const { amslib } = require(`${process.cwd()}/features/ASSESSMENT/lib/index.js`);

When("I access to the taxonomy page", async function (datatable) {
  let path = datatable.hashes()[0];
  await amslib.navigateToTopic(path);
});

When(/^I create a new topic called "(.*)"$/, async function (topicName) {
  let topicTitle = topicName + " " + Date.now();
  this.data.set('Topic Title', topicTitle);
  await amslib.addTopic(topicTitle);
});

Then("The new topic is displayed", async function () {
  let topic = this.data.get('Topic Title');
  await pages.taxonomy.assertElementExists("Topic Selector", topic);
});

Then("I delete the created Topic", async function () {
  let topicTitle = this.data.get('Topic Title');
  await amslib.deleteTopic(topicTitle);
});

Then("I verify the Topic is not present", async function () {
  let topic = this.data.get('Topic Title');
  await pages.taxonomy.assertElementDoesNotExist("Topic Selector", topic);
});