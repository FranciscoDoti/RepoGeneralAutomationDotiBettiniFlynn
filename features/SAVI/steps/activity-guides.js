const { When, Then, Given } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const csvtojson = require('csvtojson');
const { visitURL, sleep } = require(`${process.cwd()}/app/driver`);
const { expect } = require('chai');
const { log } = require(`${process.cwd()}/app/logger`);

When('I navigate to the activity guide demo master link', async function () {
  //this sets the cookie, allowing the rest of the links to work
  await pages.saplingLearning.click('activityGuideDemoLink');
  console.log('loading demo');
});

Then('the activity guide loads', async function () {
  await pages.activityguide.assertElementExists('recipecard');
});

Then('all of the activity guide links can be loaded from {string}', async function (json) {
  console.log('json', json);
  const data = require(`${process.cwd()}/features/SAVI/data/${json}`);
  const urls = [];
  data.forEach(async (activity) => {
    urls.push(activity.url);
  });
  const success = [];
  const fail = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    await visitURL(url);
    const recipecard = await pages.activityguide.getWebElements('recipecard');
    if (recipecard.length) {
      success.push(url);
      log.info('Web Element recipecard is displayed on page. PASS');
      // Here we check if all links on the page are working...
      //
      // First get all link elements on the page
      //
      // Click the link element (or otherwise visit the source location) to get the result
      //
      // Report pass or fail
      //
    } else {
      fail.push(url);
      log.error('Web Element recipecard not found on page. FAIL');
    }
  }
  if (fail.length) {
    log.error(`THE FOLLOWING ${fail.length} PAGE(S) FAILED:`);
    for (var item in fail) {
      log.error(fail[item]);
    }
  } else {
    log.info(`All "${success.length}" pages loaded! PASS`)
  }
  await expect(fail.length).to.equal(0);
});
