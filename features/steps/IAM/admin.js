const path = require('path');

const { When, Then } = require('cucumber');
const { loadConfig, loadLogin } = require('../../../app/util');
const expect = require('chai')
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const chromePath = require('chromedriver').path;
const { log } = require('../../../app/logger');
const {getDriver, getWebDriver, sleep} = require('../../../app/driver');
const { By} = require('selenium-webdriver'); 
const emailid = Math.random().toString(36).substr(2, 6) + '@gmail.com';

// Scenario setup
let pages = {
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  createAccount: new PageObject('createAccount.json', stepsPath)
}
When('I click on user menu', async function () {
  try {
    log.debug('Clicking menu_system button');
    await pages.authAdmin.populate('menu_system', 'click');
    log.debug(`menu_system was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  await sleep(5000);
});
When('I click on Admin Panel', async function () {
  try {
    log.debug('Clicking admin_panel button');
    await pages.authAdmin.populate('admin_panel', 'click');
    log.debug(`admin_panel was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I click on Password reset', async function () {
  try {
    log.debug('Clicking password_reset button');
    await pages.authAdmin.populate('password_reset', 'click');
    log.debug(`password_reset button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I click on Close Icon', async function () {
  try {
    log.debug('Clicking close button');
    await pages.authAdmin.populate('close', 'click');
    log.debug(`close button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I enter Invalid E-mail Address not regitered in macmillan account', async function () {
  try {
    log.debug('Clicking password_reset_input button');
    await pages.authAdmin.populate('password_reset_input', emailid);
    log.debug(`password_reset_input button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then(/^I enter "(.*)" account details which is registered in macmillan account$/, async function (passwordreset) {
  try {
    const user = await loadLogin(passwordreset);
    log.debug('Entering email address');
    await pages.authAdmin.populate('password_reset_input', user.username);
    log.debug(`email address is entered, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I click on Reset button', async function () {
  try {
    log.debug('Clicking reset_button ');
    await pages.authAdmin.populate('reset_button', 'click');
    log.debug(` reset_button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

/* Then('I Verify error message',async function () {
  try {
    const acctual = await driver().switchTo().alert().getText('An unexpected error');
  console.log('acctual'+acctual);
  } catch (err) {
    log.error(err);
  }
}); */

When(/^I log in as "(.*)"$/, async function (Login) {
  const account = await loadLogin(Login);
  try {
    log.debug(`Entering account details: ${account}`);
    await pages.authAdmin.populate('temp_username', account.username);
    await pages.authAdmin.populate('temp_next', 'click');
    await sleep(5000);
    await pages.authAdmin.populate('temp_password', account.password);
    await pages.authAdmin.populate('temp_password_next', 'click');
    await sleep(3000);
    await pages.authAdmin.populate('gmail', 'click');
  } catch (err) {
    log.error(err);
  }
});
When('I check E-mail Notification', async function () {
  try {
    log.debug('Clicking on mail');
    await pages.authAdmin.populate('mail', 'click');
    log.debug(`mail was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    const hyperlink = await getDriver().findElement(By.xpath("//*[text()='Reset your password']")).getAttribute('href');
    log.debug(hyperlink + 'hyperlink');
    log.debug('Clicking on reset password');
    await getDriver().get(hyperlink);
    log.debug(`reset password was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('I verfiy the reset password functionality is working fine', async function () {
  try {
    await sleep(5000);
    await pages.createAccount.populate('password', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoPQRSTUVWXYZ12345678900987654321@');
    await pages.createAccount.populate('confirmPassword', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoPQRSTUVWXYZ12345678900987654321@');
  } catch (err) {
    log.error(err);
  }
  try {
    await pages.createAccount.populate('password', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoPQRSTUVWXYZ12345678900987654321@');
    await pages.createAccount.populate('confirmPassword', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoPQRSTUVWXYZ12345678900987654321@');
  } catch (err) {
    log.error(err);
  }
  try {
    await pages.createAccount.populate('password', 'AB123');
    await pages.createAccount.populate('confirmPassword', 'ABC123');
  } catch (err) {
    log.error(err);
  }
  try {
    await pages.createAccount.populate('password', 'abc123');
    await pages.createAccount.populate('confirmPassword', 'abc123');
  } catch (err) {
    log.error(err);
  }
  try {
    await pages.createAccount.populate('password', 'ABab123');
    await pages.createAccount.populate('confirmPassword', 'ABab123');
  } catch (err) {
    log.error(err);
  }
});

When('I verify the reset password functionality', async function () {
  console.log('Password Fuctionality is working fine');
  var verify = await getDriver().findElement(By.xpath("//*[@id='update']")).getAttribute('outerHTML');
  if (verify.includes('disabled')) {
    console.log('passed');
  } else {
    throw new Error('failed');
  }
});

When(/^I enter Password and confirm password from "(.*)" account for fulfilling the validation criteria$/, async function (account) {
  try {
    const mail = await loadLogin(account);
    await sleep(5000);
    log.debug(`clicking on Password and confirm password button, ${account}`);
    await pages.createAccount.populate('password', mail.newpassword);
    await pages.createAccount.populate('confirmPassword', mail.newpassword);
  } catch (err) {
    log.error(err);
  }
});
When('I click on Reset password', async function () {
  try {
    await sleep(5000);
    console.log('Clicking on Reset password');
    await pages.authAdmin.populate('reset_password_email', 'click');
    log.debug(`mail was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I click on login button to return to login page', async function () {
  try {
    await sleep(5000);
    log.debug('Clicking on login');
    await pages.authAdmin.populate('back_login', 'click');
    log.debug(`login was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then(/^I verify Message is displayed as "(.*)"$/, async function (verify) {
  console.log('Verify the user is able to luanch the url and reset the password')
  if (await pages.authAdmin.checkWebElementExists('back_login')) {
    console.log('passed');
  } else {
    throw new Error('failed');
  }
});
Then('Verify that user is able to login using newly created password', async function () {
  console.log(' Verify that user is able to Sign In using new password');
  if (await pages.authAdmin.checkWebElementExists('check')) {
    console.log('passed');
  } else {
    throw new Error('failed');
  }
});
