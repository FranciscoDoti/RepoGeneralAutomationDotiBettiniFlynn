const { Then } = require('cucumber');
const { expect } = require('chai');
const pages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const {getCategoryName} = require('../data/test_value_generator');

Then('Points are displayed in the course total', async function () {
  await pages.gradebook.waitForElementVisibility('courseTotal');
  const courseTotal = await pages.gradebook.getWebElements('courseTotal');
  const text = await courseTotal[0].getText()
  expect(text).to.equal('50.00\nOut of 100');
});
Then('Percents are displayed in the course total', async function () {
  await pages.gradebook.waitForElementVisibility('courseTotal');
  const courseTotal = await pages.gradebook.getWebElements('courseTotal');
  const text = await courseTotal[0].getText()
  expect(text).to.equal('50%');
});
Then('The settings button is visible', async function () {
  await pages.gradebook.waitForElementVisibility('settingsNav');
});
Then('A new category should appear in the Gradebook', async function () {
  await pages.gradebook.waitForElementVisibility('singleCategory');
  const cells = await pages.gradebook.getWebElements('categoryHeaderCells');
  const newCategoryName = getCategoryName();
  let text = await cells[0].getText();
  while (!text.includes(newCategoryName)) {
    text = await cells[0].getText();
  }
  expect(text).to.contains(newCategoryName);
});
Then('No categories should appear in the Gradebook', async function () {
  await pages.gradebook.waitForElementVisibility('singleCategory');
  const cells = await pages.gradebook.getWebElements('categoryHeaderCells');
  const text = await cells[0].getText();
  const newCategoryName = getCategoryName();
  expect(text).to.contains(newCategoryName);
});
Then('The new course button should be visible', async function () {
  await pages.gradebook.waitForElementVisibility('iClickerMenuDisconnect');
});
Then('The sync button should be visible', async function () {
  await pages.gradebook.waitForElementVisibility('syncIClicker');
});
Then('The iclicker menu should be visible', async function () {
  await pages.gradebook.waitForElementVisibility('iClickerMenuDisconnect');
});

