const { When } = require('cucumber');

const pages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const {getCategoryName} = require('../data/test_value_generator');

When('I toggle percents', async function () {
  await pages.gradebook.waitForElementVisibility('percentsToggleButton');
  await pages.gradebook.click('percentsToggleButton');
});

When('I toggle points', async function () {
  await pages.gradebook.waitForElementVisibility('pointsToggleButton');
  await pages.gradebook.click('pointsToggleButton');
});

When('I save a new category', async function () {
  await pages.settings.waitForElementVisibility('addCategory');
  await pages.settings.click('addCategory');
  await pages.settings.waitForElementVisibility('newCategoryInput');
  const newCategoryName = getCategoryName();
  await pages.settings.populate('newCategoryInput', newCategoryName);
  await pages.settings.click('saveCategory');
});
