const { Given, When } = require('cucumber');
const _ = require('lodash');
const urls = require('../../../config/urls.json');
const users = require('../data/users.json');
const { visitURL } = require('../../../app/driver');
const pages = require('../pages/.page').pages;

/* Verifies Sapling login, AMS page and navigation to AuthorApp page by clicking new Raptor item link */
Given(/^I login to AMS as "(.*)"/, async function (userType) {
  let url = await _.get(urls, ['AMS', this.environment]);
  let user = await _.get(users, [this.environment, userType]);

  await visitURL(url);
  if (this.environment == 'local') {
    await pages.login.populate('username-local', user.username);
    await pages.login.populate('password-local', user.password);
    await pages.login.click('submit-local')
  } else {
    await pages.login.populate('username', user.username);
    await pages.login.populate('password', user.password);
    await pages.login.click('submit')
  };
});