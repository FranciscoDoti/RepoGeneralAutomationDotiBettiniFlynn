const { Then } = require('cucumber');
const { expect } = require('chai');

const pages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;

Then('I should see points displayed in the course total', async function () {
  await pages.gradebook.waitForElementVisibility('courseTotal');
  const courseTotal = await pages.gradebook.getWebElements('courseTotal');
  const text = await courseTotal[0].getText()
  expect(text).to.equal('50.00\nOut of 100');
});
Then('I should see percents displayed in the course total', async function () {
  await pages.gradebook.waitForElementVisibility('courseTotal');
  const courseTotal = await pages.gradebook.getWebElements('courseTotal');
  const text = await courseTotal[0].getText()
  expect(text).to.equal('50%');
});
Then('I should see the settings button appear', async function () {
  await pages.gradebook.waitForElementVisibility('settingsNav');
});
Then('A new category should appear in the Gradebook', async function () {

});
