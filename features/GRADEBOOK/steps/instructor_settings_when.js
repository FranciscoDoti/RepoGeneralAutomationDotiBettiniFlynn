const { When } = require('cucumber');
const { gradebook, settings } = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;
const {getCategoryName} = require('../data/test_value_generator');

When('Instructor saves a new category', async function () {
  await gradebook.click('settingsNav');
  await settings.waitForElementVisibility('addCategory');
  await settings.click('addCategory');
  await settings.waitForElementVisibility('newCategoryInput');
  const newCategoryName = getCategoryName();
  await settings.populate('newCategoryInput', newCategoryName);
  await settings.scrollElementIntoView('saveCategory');
  await settings.click('saveCategory');
});

When('Instructor deletes all categories', async function () {
  await settings.waitForElementVisibility('addCategory');
  const deleteButtons = await settings.getWebElements('removeCategory');
  for (const button of deleteButtons) {
    await button.click();
  }

  await settings.scrollElementIntoView('saveCategory');
  await settings.click('saveCategory');
});
