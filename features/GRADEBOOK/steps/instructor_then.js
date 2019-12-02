const { Then } = require('cucumber');
const { expect } = require('chai');
const { iclicker, gradebook } = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const { getCategoryName } = require('../data/test_value_generator');

Then('Points are displayed in the course total', async function () {
  await gradebook.waitForElementVisibility('courseTotal');
  const courseTotal = await gradebook.getWebElements('courseTotal');
  const text = await courseTotal[0].getText()
  expect(text).to.equal('50.00\nOut of 100');
});
Then('Percents are displayed in the course total', async function () {
  await gradebook.waitForElementVisibility('courseTotal');
  const courseTotal = await gradebook.getWebElements('courseTotal');
  const text = await courseTotal[0].getText()
  expect(text).to.equal('50%');
});
Then('The settings button is visible', async function () {
  await gradebook.waitForElementVisibility('settingsNav');
});
Then('A new category should appear in the Gradebook', async function () {
  await gradebook.waitForElementVisibility('singleCategory');
  const newCategoryName = getCategoryName();
  await gradebook.assertElementExists('categoryHeaderCells', newCategoryName);
});
Then('No categories should appear in the Gradebook', async function () {
  await gradebook.waitForElementVisibility('singleCategory');
  const cells = await gradebook.getWebElements('categoryHeaderCells');
  const text = await cells[0].getText();
  const newCategoryName = getCategoryName();
  expect(text).to.contains(newCategoryName);
});

Then('The sync button should be visible', async function () {
  await iclicker.waitForElementVisibility('syncIClicker');
});
Then('The iclicker menu should be visible', async function () {
  await iclicker.waitForElementVisibility('iClickerMenu');
});
