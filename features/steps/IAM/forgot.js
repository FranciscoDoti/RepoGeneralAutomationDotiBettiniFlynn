const { When, Then, And } = require('cucumber');
const path = require('path');

const { loadConfig, loadLogin } = require('../../../app/util');
const { assert } = require('chai');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { By } = require('selenium-webdriver');
const { log } = require('../../../app/logger');
const { getDriver, sleep } = require('../../../app/driver');
// const emailid = Math.random().toString(36).substr(2, 6) + '@gmail.com';
const randomex = Math.random().toString(36).substr(2, 6)
const emailid = randomex + '@gmail.com'
var answer;
var value;
var account;
let pages = {
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath),
  navigation: new PageObject('navigation.json', stepsPath),
  createAccount: new PageObject('createAccount.json', stepsPath)
}
When('I click on forgot link', async function () {
  try {
    log.debug('clicking on forgot_password');
    await pages.login.populate('forgot_password', 'click');
    log.debug(`forgot_password was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('I hover on "?" icon', async function () {
  try {
    log.debug('clicking on ?');
    await pages.login.populate('email_forgot', 'click');
    log.debug(`? was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
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
  try {
    log.debug('clicking on cancle_button');
    await pages.login.populate('cancle_button', 'click');
    log.debug(`cancle_button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
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
  try {
    log.debug('clicking on email_address');
    await pages.login.populate('email_address', emailid);
    log.debug(`emailAddress was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('click on reset password button', async function () {
  try {
    log.debug('clicking on resetPassword button');
    await pages.login.populate('reset_password', 'click');
    const existingAccount = await loadLogin(email);
  } catch (err) {
    log.error(err);
  }
});
Then('I Verify Error message should be displayed', async function () {
  try {
    console.log('Verify that forgot password is showing appropriate message for not registered with macmillan account e-mail address')
    const errorText = await pages.login.getElementValue('unregistered_username_check');
    console.log(errorText + 'error');
    if (errorText == 'Request failed with status code 500') {
      console.log('passed');
    } else {
      console.log('failed');
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});
When(/^I enter existed created e-mail address of "(.*)" which is registered to Macmillan account$/, async function (email) {
  try {
    const existingAccount = await loadLogin(email);
    await log.info(`Entering the existing email address: ${account}`);
    await pages.login.populate('email_address', existingAccount.username);
  } catch (err) {
    log.error(err);
  }
});
When(/^I enter security question from "(.*)" account$/, async function (security) {
  try {
    const existingAccount = await loadLogin(security);
    log.debug('clicking on security question button');
    await pages.login.populate('security_question', existingAccount.sq1_answer);
    log.debug(`security question was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('click on submit button', async function () {
  try {
    log.debug('clicking on submit button');
    await pages.login.populate('submit_button', 'click');
    log.debug(`submit_button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I Verify Confirmation page says "An email has been sent to you with instructions on how to reset your password."', async function () {
  try {
    console.log('Verify that forgot password functionality working fine for existing macmillanaccounts')
    const errorText = await pages.login.getElementValue('registered_username_check');
    const message = "An email has been sent with instructions on how to reset your password and includes a link which will expire within 24 hours. If you don't receive an email shortly, check your spam or junk folders, or try again."

    if (errorText == message) {
      console.log('passed');
    } else {
      console.log('failed');
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

Then('I click on back to login button', async function () {
  try {
    log.debug('clicking on backToLogin  button');
    await pages.login.populate('backto_login', 'click');
    log.debug(`backToLogin button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When(/^I create account "(.*)" in macmillan$/, async function (account) {
  try {
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
  } catch (err) {
    log.error(err);
  }
  await sleep(5000);
});
When('I enter newly created e-mail address which is registered to Macmillan account', async function () {
  try {
    log.debug('clicking on email_address');
    await pages.login.populate('email_address', emailid);
    log.debug(`emailAddress was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I Verify Confirmation message', async function () {
  try {
    console.log('Verify that forgot password functionality working fine for newly created macmillan accounts')
    const errorText = await pages.login.getElementValue('registered_username_check');
    const message = "An email has been sent with instructions on how to reset your password and includes a link which will expire within 24 hours. If you don't receive an email shortly, check your spam or junk folders, or try again."

    if (errorText == message) {
      console.log('passed');
    } else {
      console.log('failed');
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

When('I Enter incorrect Security question answer 1', async function () {
  try {
    log.debug('entering security question');
    await pages.login.populate('security_question', 'Question');
    log.debug(`security question is entered,${clickedButton}`)
  } catch (err) {
    log.error(err);
  }
});

Then(/^I Verify Error Message is displayed as_ "(.*)"$/, async function (verify) {
  try {
    console.log('Verify that security questions incorrect attempt shows appropriate error messages and not allow user to move further')
    const errorText = await pages.login.getElementValue('security_check');
    console.log(errorText + 'error')
    if (errorText == verify) {
      console.log('passed');
    } else {
      console.log('failed');
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
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
  try {
    const hyperlink = await getDriver().findElement(By.xpath("//*[text()='Help']")).getAttribute('href');
    log.debug(hyperlink + 'hyperlink');
    log.debug('clicking on help link');
    await getDriver().get(hyperlink);
    // await pages.login.populate('help_link', 'click');
    log.debug(`help_link was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I Verify that Help Page is displayed', async function () {
  console.log('Verify Help Link is present on the Sign In page and redirecting to appropriate page')
  if (await pages.login.checkWebElementExists('help_check')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});
