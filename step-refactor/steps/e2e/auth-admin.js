// features/support/steps.js

const path = require('path');

const { When, Then } = require('cucumber');
const { loadConfig, loadLogin } = require('../../../app/util');

const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const {getDriver, sleep} = require('../../../app/driver');

// Scenario setup
let pages = {
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  authInstructor: new PageObject('auth-instructor.json', stepsPath),
  checkAccount: new PageObject('checkAccount.json', stepsPath)
};

When(/^I elect to manage the role of user '(.*)'$/, async function (userLogin) {
  try {
    const login = await loadLogin(userLogin);
    await pages.authAdmin.populate('menu_system', 'click');
    await sleep(2000);
    await pages.authAdmin.populate('admin_panel', 'click');
    await pages.authAdmin.populate('manage_roles', 'click');
    await pages.authAdmin.populate('enter_email_address', login.username);
  } catch (err) {
    log.error(err)
  }
});

When(/^I grant the role of '(.*)'$/, async function (role) {
  log.debug(`Grant Role email: ${role}`);
  await pages.authAdmin.populate('choose_role', role);
  await pages.authAdmin.populate('grant_role', 'click');
});

When(/^I revoke the role of '(.*)'$/, async function (role) {
  log.debug(`Revoke Role email: ${role}`);
  await pages.authAdmin.populate('choose_role', role);
  await pages.authAdmin.populate('revoke_role', 'click');
});

Then('Verify Successful permission grant message', async function () {
  await pages.authAdmin.assertText('choose_role', 'Admin');
});

When(/^I elect to check the account for '(.*)'$/, async function (account) {
  log.debug(`Checking login:" ${account}`);
  const loginFile = await loadLogin(account);
  log.debug(`Checking the account:" ${loginFile.username}`);
  await pages.authAdmin.populate('menu_system', 'click');
  await pages.authAdmin.populate('admin_panel', 'click');
  await pages.authAdmin.populate('check_account', 'click');
  await pages.checkAccount.populate('email_field', loginFile.username);
  await pages.checkAccount.populate('search_btn', 'click');
  await pages.authAdmin.populate('close_cheackAccount', 'click');
});
