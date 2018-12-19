const { When, Then } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const config = require('../../../config.js');


When('I click on user menu', async function () {
  log.debug('Clicking menu_system button');
  await pages.authAdmin.populate('menu_system', 'click');
  await sleep(7000);
});

When('I click on Admin Panel', async function () {
  log.debug('Clicking admin_panel button');
  await pages.authAdmin.populate('admin_panel', 'click');
});

When('I click on Password reset', async function () {
  log.debug('Clicking password_reset button');
  await pages.authAdmin.populate('password_reset', 'click');
});

Then('I click on Close Icon', async function () {
  log.debug('Clicking close button');
  await pages.authAdmin.populate('close', 'click');
});

Then('I enter Invalid E-mail Address not regitered in macmillan account', async function () {
  log.debug('Clicking password_reset_input button');
  var emailid = Math.random().toString(36).substr(2, 6) + '@gmail.com';
  await pages.authAdmin.populate('password_reset_input', emailid);
});

Then(/^I enter "(.*)" account details which is registered in macmillan account$/, async function (passwordreset) {
  const user = await loadLogin(passwordreset);
  log.debug('Entering email address');
  await pages.authAdmin.populate('password_reset_input', user.username);
});

Then('I click on Reset button', async function () {
  log.debug('Clicking reset_button ');
  await pages.authAdmin.populate('reset_button', 'click');
  await sleep(4000);
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
  log.debug(`Entering account details: ${account}`);
  await pages.authAdmin.populate('temp_username', account.username);
  await pages.authAdmin.populate('temp_next', 'click');
  await sleep(5000);
  await pages.authAdmin.populate('temp_password', account.password);
  await pages.authAdmin.populate('temp_password_next', 'click');
  await sleep(3000);
  await pages.authAdmin.populate('gmail', 'click');
  await sleep(3000);
});

When(/^I check E-mail Notification of "(.*)" for "(.*)"$/, async function (Login, regexChoice) {
  const account = await loadLogin(Login);
  var hrefLink = await connectClient(account.username, account.password, regexChoice);
  await getDriver().get(hrefLink);
});

When(/^I enter Password and confirm password from "(.*)" account for fulfilling the validation criteria$/, async function (account) {
  const mail = await loadLogin(account);
  await sleep(5000);
  log.debug(`clicking on Password and confirm password button, ${account}`);
  await pages.createAccount.populate('password', mail.newpassword);
  await pages.createAccount.populate('confirmPassword', mail.newpassword);
});

When('I click on Reset password', async function () {
  await sleep(1000);
  console.log('Clicking on Reset password');
  await pages.authAdmin.populate('reset_password_email', 'click');
});

Then('I click on login button to return to login page', async function () {
  await sleep(5000);
  log.debug('Clicking on login');
  await pages.authAdmin.populate('back_login', 'click');
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
    console.log('failed');
  }
});
