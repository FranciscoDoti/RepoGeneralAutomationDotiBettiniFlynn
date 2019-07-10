const { Given, When } = require('cucumber');
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const pages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
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

Given(/^navigate to a course having course id "(.*)"$/, async function (courseid){
  var currentURL = await pages.login.getCurrentURL();
  var courseURL = currentURL + "course/view.php?id=" + courseid;
  await visitURL(courseURL);
});

Given(/^I login to IBISCMS as "(.*)"/, async function (userType) {
  let url = await _.get(urls, ['IBISCMS', this.environment]);
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

When('I logout IBISCMS', async function () {
  await pages.login.click('userMenuButton');
  await pages.login.click('logoutMenu');
});
