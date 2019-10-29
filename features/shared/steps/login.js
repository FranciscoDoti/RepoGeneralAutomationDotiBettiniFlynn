const { Given, When } = require('cucumber');
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const pages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const { driver, visitURL } = require(`${process.cwd()}/app/driver`);
const mathPages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;

/* Verifies Sapling login */
Given(/^I login to AMS as "(.*)"/, async function (userType) {
  let url = await _.get(urls, ['AMS', this.stack]);
  let user = this.users[userType];
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

// This step function was required as browser was retaining the username 
// And was causing issue with second time user login in a graphing scenario

Given(/^I login back to AMS again as "(.*)"/, async function (userType) {
  let url = await _.get(urls, ['AMS', this.stack]);
  let user = this.users[userType];

  await visitURL(url);
  if (this.environment == 'local') {
    await pages.login.populate('password-local', user.password);
    await pages.login.click('submit-local')
  } else {
    await pages.login.populate('password', user.password);
    await pages.login.click('submit')
  };
});

When(/^I go back to sapling page and logout$/, async function () {
  let url = await _.get(urls, ['IBISCMS', this.stack]);
  await mathPages.saplingLearning.switchToTab('Sapling');
  await visitURL(url);
  await mathPages.saplingLearning.click('RaptorAdmin');
  await mathPages.saplingLearning.click('logout');
});

Given(/^I login to Achieve-CW as "(.*)"/, async function (userType) {
  let url = await _.get(urls, ['Achieve-CW', this.stack]);
  let user = this.users[userType];
  await visitURL(url);
  await pages.login.waitForElementVisibility('Button','SIGN IN', 10);
  await pages.login.click('Button','SIGN IN');
  await pages.login.populate('username', user.username);
  await pages.login.populate('password', user.password);
  await pages.login.click('signin');
});

When('I sign out of Achieve', async function () {
  await pages.login.scrollElementIntoView('togglerMenu');
  await pages.login.assertElementExists('togglerMenu');
  await pages.login.click('togglerMenu');
  await pages.login.click('signOut');
});

Given(/^navigate to a course having course id "(.*)"$/, async function (courseid) {
  var currentURL = await pages.login.getCurrentURL();
  var courseURL = currentURL + "course/view.php?id=" + courseid;
  await visitURL(courseURL);
});

Given(/^I login to IBISCMS as "(.*)"/, async function (userType) {
  let url = await _.get(urls, ['IBISCMS', this.stack]);
  let user = this.users[userType];

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
  await pages.login.click('User Menu Button');
  await pages.login.click('Logout Menu');
});

Given(/^I login to Brightcove Media as "(.*)"$/, async function (userType) {
  let url = await _.get(urls, ['Brightcove', this.stack]);
  let user = this.users[userType];

  await visitURL(url);
  await pages.login.assertElementExists('loginForm');
  await pages.login.assertElementExists('email');
    await pages.login.populate('email', user.username);
    await pages.login.populate('password', user.password);
    await pages.login.click('signinButton')
});