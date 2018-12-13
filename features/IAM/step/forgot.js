const { When, Then } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const config = require('../../../config.js');
const emailid = Math.random().toString(36).substr(2, 6) + '@gmail.com'


When('I click on forgot link', async function () {
  log.debug('clicking on forgot_password');
  await pages.login.populate('forgot_password', 'click');
});

When('I hover on "?" icon', async function () {
  log.debug('clicking on ?');
  await pages.login.populate('email_forgot', 'click');
});

Then('I verify that forgot email info icon tooltip Information is consistent to application behavior', async function () {
  console.log('Verify Forgot Password page cancel Button redirects to Sign In Page')
  if (await pages.login.checkWebElementExists('email_forgot_check')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});

When('I click on cancel button', async function () {
  log.debug('clicking on cancle_button');
  await pages.login.populate('cancle_button', 'click');
});

Then('I Verify Sign In page should be displayed', async function () {
  console.log('Verify Forgot Password page cancel Button redirects to Sign In Page')
  if (await pages.login.checkWebElementExists('sign_in')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});

When('I enter the emailaddress of the account which is not registered in macmillan', async function () {
  await pages.login.populate('email_address', emailid);
});

When('click on reset password button', async function () {
  log.debug('clicking on resetPassword button');
  await pages.login.populate('reset_password', 'click');
});
Then('I Verify Error message should be displayed', async function () {
  console.log('Verify that forgot password is showing appropriate message for not registered with macmillan account e-mail address')
  const errorText = await pages.login.getElementValue('unregistered_username_check');
  console.log(errorText + 'error');
  if (errorText == 'Request failed with status code 500') {
    console.log('passed');
  } else {
    throw new Error('failed');
  }
});
When(/^I enter existed created e-mail address of "(.*)" which is registered to Macmillan account$/, async function (email) {
  const existingAccount = await loadLogin(email);
  await log.info(`Entering the existing email address: ${existingAccount.username}`);
  await pages.login.populate('email_address', existingAccount.username);
});
When(/^I enter security question from "(.*)" account$/, async function (security) {
  const existingAccount = await loadLogin(security);
  log.debug('clicking on security question button');
  await pages.login.populate('security_question', existingAccount.sq1_answer);
});
When('click on submit button', async function () {
  log.debug('clicking on submit button');
  await pages.login.populate('submit_button', 'click');
});

Then('I Verify Confirmation page says "An email has been sent to you with instructions on how to reset your password."', async function () {
  console.log('Verify that forgot password functionality working fine for existing macmillanaccounts')
  const errorText = await pages.login.getElementValue('registered_username_check');
  const message = "An email has been sent with instructions on how to reset your password and includes a link which will expire within 24 hours. If you don't receive an email shortly, check your spam or junk folders, or try again."

  if (errorText == message) {
    console.log('passed');
  } else {
    throw new Error('failed');
  }
});

Then('I click on back to login button', async function () {
  log.debug('clicking on backToLogin  button');
  await pages.login.populate('backto_login', 'click');
});

When(/^I create account "(.*)" in macmillan$/, async function (account) {
  const user = await loadLogin(account);
  await log.info(`Creating account for email: ${account}`);
  await pages.createAccount.populate('firstName', user.firstName);
  await pages.createAccount.populate('lastName', user.lastName);
  await pages.createAccount.populate('email', emailid);
  await pages.createAccount.populate('password', user.password);
  await pages.createAccount.populate('confirmPassword', user.password);
  await pages.createAccount.populate('Security_Question_1__c', user.sq1);
  await pages.createAccount.populate('Security_Question_1_Answer__c', user.sq1_answer);
  await pages.createAccount.populate('Security_Question_2__c', user.sq2);
  await pages.createAccount.populate('Security_Question_2_Answer__c', user.sq2_answer);
  await pages.createAccount.populate('Security_Question_3__c', user.sq3);
  await pages.createAccount.populate('Security_Question_3_Answer__c', user.sq3_answer);
  await pages.createAccount.populate('institution', user.primarySchool);
  await pages.createAccount.populate('OptIn', 'NA');
  await pages.createAccount.populate('termsOfService', 'click');
  await pages.createAccount.populate('signUp_btn', 'click');
  await log.debug(`Clicked Sign Up button`);
  await sleep(5000);
});
When('I enter newly created e-mail address which is registered to Macmillan account', async function () {
  log.debug('clicking on email_address');
  await pages.login.populate('email_address', emailid);
});
Then('I Verify Confirmation message', async function () {
  console.log('Verify that forgot password functionality working fine for newly created macmillan accounts')
  const errorText = await pages.login.getElementValue('registered_username_check');
  const message = "An email has been sent with instructions on how to reset your password and includes a link which will expire within 24 hours. If you don't receive an email shortly, check your spam or junk folders, or try again."

  if (errorText == message) {
    console.log('passed');
  } else {
    throw new Error('failed');
  }
});

When('I Enter incorrect Security question answer 1', async function () {
  log.debug('entering security question');
  await pages.login.populate('security_question', 'Question');
});

Then(/^I Verify Error Message is displayed as_ "(.*)"$/, async function (verify) {
  console.log('Verify that security questions incorrect attempt shows appropriate error messages and not allow user to move further')
  const errorText = await pages.login.getElementValue('security_check');
  console.log(errorText + 'error')
  if (errorText == verify) {
    console.log('passed');
  } else {
    throw new Error('failed');
  }
});

Then('I Enter incorrect Security question answer 2', async function () {
  try {
    log.debug('entering securinty question');
    await pages.login.populate('security_question', 'Question');
    log.debug(`security question is entered,${clickedButton}`)
  } catch (err) {
    log.error(err);
  }
});

Then('I Enter incorrect Security question answer 3', async function () {
  try {
    log.debug('entering securinty question');
    await pages.login.populate('security_question', 'Question');
    log.debug(`security question is entered,${clickedButton}`)
  } catch (err) {
    log.error(err);
  }
});

When('I click on help', async function () {
  const hyperlink = await getDriver().findElement(By.xpath("//*[text()='Help']")).getAttribute('href');
  log.debug(hyperlink + 'hyperlink');
  log.debug('clicking on help link');
  await getDriver().get(hyperlink);
});

Then('I Verify that Help Page is displayed', async function () {
  console.log('Verify Help Link is present on the Sign In page and redirecting to appropriate page')
  if (await pages.login.checkWebElementExists('help_check')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});
