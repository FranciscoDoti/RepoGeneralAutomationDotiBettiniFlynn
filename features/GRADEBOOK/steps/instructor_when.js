const { When } = require('cucumber');
const pages = require(`${process.cwd()}/features/GRADEBOOK/pages/.page.js`).pages;

When('I toggle percents', async function () {
  await pages.gradebook.waitForElementVisibility('percentsToggleButton');
  await pages.gradebook.click('percentsToggleButton');
});

When('I toggle points', async function () {
  await pages.gradebook.waitForElementVisibility('pointsToggleButton');
  await pages.gradebook.click('pointsToggleButton');
});
