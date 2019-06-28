
const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;

When(/^I click Edit under Topic section in Item Details window$/, async function () {
  await pages.raptorAms.click('menuBarMore');
  await pages.raptorAms.click('moreItemDetails');
  await pages.raptorAms.click('itemDetailsTopicEdit');
});

Then(/^the subjects are displayed$/, async function () {
  await pages.raptorAms.assertElementExists('topic', 'Algebra');
  await pages.raptorAms.assertElementExists('topic', 'Astronomy');
  await pages.raptorAms.assertElementExists('topic', 'Biochemistry');
  await pages.raptorAms.assertElementExists('topic', 'Biology');
  await pages.raptorAms.assertElementExists('topic', 'Calculus');
  await pages.raptorAms.assertElementExists('topic', 'English');
  await pages.raptorAms.assertElementExists('topic', 'Geography');
});

When(/^I select Rogawski 5.3 section under Calculus and confirm$/, async function () {
  await pages.raptorAms.click('topic', 'Calculus');
  await pages.raptorAms.click('topicRogawski');
  await pages.raptorAms.click('topicIntegration', 'Chapter 5: Integration');
  await pages.raptorAms.click('topicIntegration', '5.3 The Indefinite Integral');
  await pages.raptorAms.click('topicSection5');
  await pages.raptorAms.click('topicConfirmButton');
});

Then(/^I verify the selected section shows under the Topic category$/, async function () {
  await pages.raptorAms.assertTextIncludes('topicConfirm', 'Section 5.3 Questions_ID 47511 (Rog4e)');
});

Then(/^I submit Item Details$/, async function () {
  await pages.raptorAms.click('itemDetailsSubmit');
});
