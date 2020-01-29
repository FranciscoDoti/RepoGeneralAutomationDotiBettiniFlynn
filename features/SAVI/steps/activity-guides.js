const { When, Then, Given } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const csvtojson = require('csvtojson');
const { visitURL, sleep } = require(`${process.cwd()}/app/driver`);
const { expect } = require('chai');
const { log } = require(`${process.cwd()}/app/logger`);

When('I navigate to the activity guide demo master link', async function () {
  await pages.saplingLearning.click('activityGuideDemoLink');
  console.log('loading demo');
});

Then('the activity guide loads', async function () {
  await pages.activityguide.assertElementExists('recipecard');
});

When('I test all of the Activity Guide master links', async function () {
  var data = await csvtojson().fromFile(`${process.cwd()}/features/SAVI/data/activityguides.csv`);
  const urls = [];
  data.forEach(async (activity) => {
    urls.push(activity.url);
  });
  for (let i = 0; i < urls.length; i++) {
    await visitURL(urls[i]);
    await pages.activityguide.assertElementExists('recipecard');
  }
});
