const { Given, When } = require('cucumber');
const _ = require('lodash');
const urls = require('../../../config/urls.json');
const users = require('../_data/users.json');
const { getURL } = require('../../../app/driver');
let pages = require('../pages/_page.js').pages;

/* Verifies Sapling login, AMS page and navigation to AuthorApp page by clicking new Raptor item link */
Given(/^I login to AMS as "(.*)"/, async function (userType) {
  let url = await _.get(urls, ['sapling', this.environment]);
  let user = await _.get(users, [this.environment, userType]);

  await getURL(url);
  await pages.login.populate('username', user.username);
  await pages.login.populate('password', user.password);
  await pages.login.click('submit');
});

When(/^I click on the New Raptor item in the AMS page$/, async function () {
  await pages.ams.click('raptorNewItem');
});

When(/^I navigate to AuthorApp tab$/, async function () {
  await qa.changeWindow(1);
  await qa.exists(page.math.raptorAms.titleName);
});