const { Given, When, Then } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const config = require('../../../config.js');


/*
When(/^I enter "(.*)" and "(.*)"$/, async function (username, password) {
  const loginFile = await loadLogin('failed');
  log.debug(`Entering username: ${loginFile.username} and password`);
  await pages.login.populate('txt_username', loginFile.username);
  await pages.login.populate('txt_password', loginFile.password);
});

*/

When(/^If the (.*) does not exist then create one$/, async function (account) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When(/^I create an account for '(.*)' user$/, async function (account) {
  const login = await loadLogin(account);
  await log.info(`Creating account for email: ${login.username}`);
  await pages.navigation.populate('create_account_button', 'click');
  await pages.createAccount.populate('firstName', login.firstName);
  await pages.createAccount.populate('lastName', login.lastName);
  await pages.createAccount.populate('email', login.username);
  await pages.createAccount.populate('password', login.password);
  await pages.createAccount.populate('confirmPassword', login.password);
  await pages.createAccount.populate('Security_Question_1__c', login.sq1);
  await pages.createAccount.populate('Security_Question_1_Answer__c', login.sq1_answer);
  await pages.createAccount.populate('Security_Question_2__c', login.sq2);
  await pages.createAccount.populate('Security_Question_2_Answer__c', login.sq2_answer);
  await pages.createAccount.populate('Security_Question_3__c', login.sq3);
  await pages.createAccount.populate('Security_Question_3_Answer__c', login.sq3_answer);
  await pages.createAccount.populate('institution', login.primarySchool);
  await pages.createAccount.populate('OptIn', 'NA');
  await pages.createAccount.populate('termsOfService', 'click');
  await pages.createAccount.populate('signUp_btn', 'click');
  await log.debug(`Clicked Sign Up button`);
});

When('If the account exists, log out of Achieve', async function () {
  log.debug(`Checking to see if account exists for the email already and recover.`);
  // if the account exists, reset to login
  if (await pages.createAccount.checkWebElementExists('errorText')) {
    const email = await pages.createAccount.getElementValue('email');
    log.info(`Account already exists for ${email}.  Continuing...`)
  } else {
    // reset to login again
    log.info(`Account created.  Logging out.`);
    pages.navigation.populate('menu_system', 'click');
    pages.navigation.populate('logout', 'click');
    pages.navigation.populate('main_signin', 'click');
  }
});
