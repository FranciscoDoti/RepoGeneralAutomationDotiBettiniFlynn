const { Given, When } = require('cucumber');
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const pages = require('../pages/.page.js').pages;
const { visitURL } = require(`${process.cwd()}/app/driver`);
const users = require(`${process.cwd()}/features/shared/data/users.json`);

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

// When(/^I go back to sapling page and logout$/, async function(){
//   let url = await _.get(urls, ['sapling', this.environment]);
//   await pages.saplingLearning.switchToTab('Sapling');
//   await visitURL(url);
//   await pages.saplingLearning.click('RaptorAdmin');
//   await pages.saplingLearning.click('logout');
//   });

Given(/^I login to Achieve-CW as "(.*)"/, async function (userType) {
  let url = await _.get(urls, ['Achieve-CW', this.environment]);
  let user = await _.get(users, [this.environment, userType]);

  await visitURL(url);
  await pages.login.click('signinlink');
  await pages.login.populate('username', user.username);
  await pages.login.populate('password', user.password);
  await pages.login.click('signin');
});

When('I sign out of Achieve', async function () {
  await pages.login.click('togglerMenu');
  await pages.login.click('signOut');
});
