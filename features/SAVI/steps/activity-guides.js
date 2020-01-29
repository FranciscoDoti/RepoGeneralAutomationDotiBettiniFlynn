const { When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const { visitURL, sleep, getDriver } = require(`${process.cwd()}/app/driver`);
const { expect } = require('chai');
const { log } = require(`${process.cwd()}/app/logger`);

When('I navigate to the activity guide demo master link', async function () {
  await pages.saplingLearning.click('activityGuideDemoLink');
});

Then('the activity guide loads', async function () {
  await pages.activityguide.assertElementExists('recipecard');
});
