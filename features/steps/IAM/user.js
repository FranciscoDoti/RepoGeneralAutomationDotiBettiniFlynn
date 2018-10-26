const { When, Then} = require('cucumber');
const path = require('path');
const { By} = require('selenium-webdriver');
const { loadConfig, loadLogin } = require('../../../app/util');
const { assert } = require('chai');
const expect = require('chai')
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep} = require('../../../app/driver');
let pages = {
  createAccount: new PageObject('createAccount.json', stepsPath),
  navigation: new PageObject('navigation.json', stepsPath)
}
When('I verify the functionality of first name and lastname by not entering', async function () {
  try {
    await pages.createAccount.populate('firstName', '');
    await pages.createAccount.populate('lastName', '');
  } catch (err) {
    log.error(err);
  }
});
Then('I verify validation message for first name and last name', async function () {
  try {
    console.log('Verify that First Name field and last name validations are working as expected')
    const errorText = await pages.createAccount.getElementValue('first_error');
    if (errorText == 'First name must not be blank and cannot contain numbers/special characters') {
      console.log('passed');
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
  try {
    const errorText = await pages.createAccount.getElementValue('Last_error');
    if (errorText == 'Last name must not be blank and cannot contain numbers/special characters') {
      console.log('passed');
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

When('I verify the functionality of first name and lastname by entering large characters', async function () {
  try {
    await pages.createAccount.populate('firstName', 'abcdefghijklmnopqrstuvwxyzabcdefghijklam');
    await pages.createAccount.populate('lastName', 'abcdefghijklmnopqrstuvwxyzabcdefghijklam');
  } catch (err) {
    log.error(err);
  }
});

Then('I verify validation message in first name and last name', async function () {
  try {
    console.log('Verify that First Name field and last name validations are working as expected')
    const errorText = await pages.createAccount.getElementValue('largechar_firstname');
    if (errorText == 'Limit of 40 characters reached') {
      console.log('passed');
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
  try {
    const errorText = await pages.createAccount.getElementValue('largechar_lastname');
    if (errorText == 'Limit of 40 characters reached') {
      console.log('passed');
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

Then('I verify the Sign up button is disabled', async function () {
  try {
    console.log('Verify that Security Question & Answer validations are working as expected by fullfilling all the criteria');
    var verify = await getDriver().findElement(By.xpath(("//*[@class='pad']//button[1]"))).getAttribute('outerHTML')
    if (verify.includes('disabled')) {
      console.log('passed');
    } else {
      console.log('failed');
    }
  } catch (err) {
    log.error(err);
  }
});
When('I verify the functionality of first name and lastname by entering numbers', async function () {
  try {
    await pages.createAccount.populate('firstName', '1234');
    await pages.createAccount.populate('lastName', '1234');
  } catch (err) {
    log.error(err);
  }
});

When('I verify the functionality of first name and lastname by entering symbols', async function () {
  try {
    await pages.createAccount.populate('firstName', 'w@0r%');
    await pages.createAccount.populate('lastName', 'w@0r%');
  } catch (err) {
    log.error(err);
  }
});

Then(/^I enter the first name, lastname and email address without symbols and number using the "(.*)" account details$/, async function (account) {
  try {
    const user = await loadLogin(account)
    await pages.createAccount.populate('firstName', user.firstName);
    await pages.createAccount.populate('lastName', user.lastName);
    await pages.createAccount.populate('email', user.username);
  } catch (err) {
    log.error(err);
  }
});

When('I enter password having eight characters not fullfilling the criteria', async function () {
  try {
    log.debug('clicking on password button');
    await pages.createAccount.populate('password', 'abc2345');
    log.debug(`forgot button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I check the error message', async function () {
  try {
    console.log('Verify that password field validations are working as expected')
    const errorText = await pages.createAccount.getElementValue('password_error');
    if (errorText == 'Not a valid password') {
      console.log('passed');
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

When(/^I enter password from "(.*)" account having eight character fullfilling the criteria$/, async function (account) {
  try {
    const user = await loadLogin(account)
    log.debug('clicking on password button');
    await pages.createAccount.populate('password', user.password);
    console.log(`forgot button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('I do not enter text in password field and click on confirm password', async function () {
  try {
    log.debug('clicking on password button');
    await pages.createAccount.populate('password', '');
    await pages.createAccount.populate('confirmPassword', ' ');
    log.debug(`forgot button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I check the error message of confirm password', async function () {
  try {
    console.log('Verify that confirm password field validations are working as expected')
    const errorText = await pages.createAccount.getElementValue('confirmpassword_error');
    if (errorText == 'Passwords must match') {
      console.log('passed');
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});
When(/^I enter Password and confirm password from "(.*)" account fullfiling all password requirements$/, async function (account) {
  try {
    const user = await loadLogin(account)
    log.debug('clicking on password button');
    await pages.createAccount.populate('password', user.password);
    await pages.createAccount.populate('confirmPassword', user.password);
    log.debug(`forgot button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When(/^I Select SecurityQuestions from "(.*)" account and I enter 150 character value$/, async function (account) {
  try {
    const user = await loadLogin(account)
    log.debug('clicking on Security Question button');
    await pages.createAccount.populate('Security_Question_1__c', user.sq1);
    await pages.createAccount.populate('Security_Question_1_Answer__c', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    await pages.createAccount.populate('Security_Question_2__c', user.sq2);
    await pages.createAccount.populate('Security_Question_2_Answer__c', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    await pages.createAccount.populate('Security_Question_3__c', user.sq3);
    await pages.createAccount.populate('Security_Question_3_Answer__c', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    await pages.createAccount.populate('institution', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  } catch (err) {
    log.error(err);
  }
});

Then('I verify the message displayed', async function () {
  try {
    const errorText = await pages.createAccount.getElementValue('Security_question_1_message');
    if (errorText == 'Limit of 150 characters reached') {
      console.log('passed')
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
  try {
    const errorText = await pages.createAccount.getElementValue('Security_question_2_message');
    if (errorText == 'Limit of 150 characters reached') {
      console.log('passed')
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
  try {
    const errorText = await pages.createAccount.getElementValue('Security_question_3_message');
    if (errorText == 'Limit of 150 characters reached') {
      console.log('passed')
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

When(/^I Select SecurityQuestions from "(.*)" account and I dont answer any questions$/, async function (account) {
  try {
    const user = await loadLogin(account)
    log.debug('clicking on Security Question button');
    await pages.createAccount.populate('Security_Question_1__c', user.sq1);
    await pages.createAccount.populate('Security_Question_1_Answer__c', '');
    await pages.createAccount.populate('Security_Question_2__c', user.sq2);
    await pages.createAccount.populate('Security_Question_2_Answer__c', '');
    await pages.createAccount.populate('Security_Question_3__c', user.sq3);
    await pages.createAccount.populate('Security_Question_3_Answer__c', '');
    await pages.createAccount.populate('institution', '');
  } catch (err) {
    log.error(err);
  }
});
Then('I Verify Error message is displayed', async function () {
  try {
    console.log('Verify that Security Question & Answer validations are working as expected without entering the question and answers');
    const errorText = await pages.createAccount.getElementValue('sq1');
    if (errorText == 'Must not be blank') {
      console.log('passed')
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
  try {
    const errorText = await pages.createAccount.getElementValue('sq2');
    if (errorText == 'Must not be blank') {
      console.log('passed')
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
  try {
    const errorText = await pages.createAccount.getElementValue('sq3');
    if (errorText == 'Must not be blank') {
      console.log('passed')
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});
When(/^I Answer all the three security questions by comparing it to "(.*)" account$/, async function (account) {
  try {
    const user = await loadLogin(account)
    console.log('clicking on securityQuestion button');
    await pages.createAccount.populate('Security_Question_1__c', user.sq1);
    await pages.createAccount.populate('Security_Question_1_Answer__c', user.sq1_answer);
    await pages.createAccount.populate('Security_Question_2__c', user.sq2);
    await pages.createAccount.populate('Security_Question_2_Answer__c', user.sq2_answer);
    await pages.createAccount.populate('Security_Question_3__c', user.sq3);
    await pages.createAccount.populate('Security_Question_3_Answer__c', user.sq3_answer);
    await pages.createAccount.populate('institution', '');
  } catch (err) {
    log.error(err);
  }
});
Then(/^I verify list of Primary Institutions or schools will display starting with the letter "(.*)"$/, async function (Primary) {
  try {
    log.debug('Clickig on primary institute button');
    await pages.createAccount.populate('institution', Primary);
    log.debug(`primary institute button is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I verify the Sign up is disabled', async function () {
  try {
    console.log('Verify that Primary Institution or School drop down and field working as expected');
    var verify = await getDriver().findElement(By.xpath(("//*[@class='pad']//button[1]"))).getAttribute('outerHTML')
    if (verify.includes('disabled')) {
      console.log('passed');
    } else {
      console.log('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

Then(/^I Select "(.*)" in Primary Institution or School text box$/, async function (usacollege) {
  try {
    log.debug('Clickig on primary institute button');
    await pages.createAccount.populate('institution', usacollege);
    log.debug(`primary institute button is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I verify the Sign up button is disabled when Primary Institution or School text box', async function () {
  try {
    console.log('Verify that on selecting a US college in "Primary Institution or School" text box, the application automatically checks the "Opt IN" check box');
    var verify = await getDriver().findElement(By.xpath(("//*[@class='pad']//button[1]"))).getAttribute('outerHTML')
    if (verify.includes('disabled')) {
      console.log('passed');
    } else {
      console.log('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

When(/^I Select "(.*)" in Primary Institution text box$/, async function (canadacollege) {
  try {
    log.debug('Clickig on primary institute button');
    await pages.createAccount.populate('institution', canadacollege);
    log.debug(`primary institute button is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I verify the Sign up button is disabled when canada college is selected', async function () {
  try {
    console.log('Verify that on selecting a canada college in "Primary Institution or School" text box, the application automatically checks the "Opt IN" check box');
    var verify = await getDriver().findElement(By.xpath(("//*[@class='pad']//button[1]"))).getAttribute('outerHTML')
    if (verify.includes('disabled')) {
      console.log('passed');
    } else {
      console.log('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

Then('I click on checkbox', async function () {
  try {
    log.debug('Clickig on checkbox');
    await pages.createAccount.populate('OptIn', 'click');
    log.debug(`checkbox is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I verify the Sign up button is disabled when I click on check box', async function () {
  try {
    console.log('Verify that Checkbox "Opt IN" is selectable and E-mail notification should generate');
    var verify = await getDriver().findElement(By.xpath(("//*[@class='pad']//button[1]"))).getAttribute('outerHTML')
    if (verify.includes('disabled')) {
      console.log('failed');
    } else {
      console.log('passed');
    }
  } catch (err) {
    log.error(err);
  }
});
When('I click on privacy notice link', async function () {
  try {
    log.debug('Clickig on privacy noticelink');
    await pages.createAccount.populate('Privacy_notice', 'click');
    log.debug(`Privacy notice link is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I verify that I am redirected to privacy notice link page', async function () {
  console.log('Verify that Privacy Notice Link redirects to appropriate page')
  if (await pages.createAccount.checkWebElementExists('privacy_check')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});

When('I click on user agreement checkbox', async function () {
  try {
    log.debug('Clickig on agree');
    await pages.createAccount.populate('termsOfService', 'click');
    log.debug(`Privacy notice link is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I verify that all the fields are empty', async function () {
  try {
    console.log('Verify that Checkbox "Opt IN" is selectable and E-mail notification should generate');
    var verify = await getDriver().findElement(By.xpath(("//*[@class='pad']//button[1]"))).getAttribute('outerHTML')
    if (verify.includes('disabled')) {
      console.log('passed');
    } else {
      console.log('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

When('I click on Terms of use link', async function () {
  try {
    log.debug('Clickig on Terms use link');
    await pages.createAccount.populate('TermsOfUse', 'click');
    log.debug(`Privacy notice link is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I verify that I am redirected to terms of use page', async function () {
  console.log('Verify that Terms of use link redirects to appropriate page')
  if (await pages.createAccount.checkWebElementExists('TermsOfUse_check')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});

When(/^User "(.*)" has filled all mandatory fields except first name$/, async function (account) {
  const login = await loadLogin(account)
  await pages.createAccount.populate('firstName', '');
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
});
When(/^I verify the Sign up button is disabled "(.*)"$/, async function (check) {
  try {
    console.log(check);
    var verify = await getDriver().findElement(By.xpath(("//*[@class='pad']//button[1]"))).getAttribute('outerHTML')
    if (verify.includes('disabled')) {
      console.log('passed');
    } else {
      console.log('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

When(/^User "(.*)" has filled all mandatory fields except last name$/, async function (account) {
  const login = await loadLogin(account)
  await pages.createAccount.populate('firstName', login.firstName);
  await pages.createAccount.populate('lastName', '');
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
});

Then(/^User "(.*)" has filled all mandatory fields except email$/, async function (account) {
  const login = await loadLogin(account)
  await pages.createAccount.populate('firstName', login.firstName);
  await pages.createAccount.populate('lastName', login.lastName);
  await pages.createAccount.populate('email', '');
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
});

Then(/^User "(.*)" {2}has filled all mandatory fields except security questions and answers$/, async function (account) {
  const login = await loadLogin(account)
  await pages.createAccount.populate('firstName', login.firstName);
  await pages.createAccount.populate('lastName', login.lastName);
  await pages.createAccount.populate('email', login.username);
  await pages.createAccount.populate('password', login.password);
  await pages.createAccount.populate('confirmPassword', login.password);
  await pages.createAccount.populate('Security_Question_1__c', login.sq1);
  await pages.createAccount.populate('Security_Question_1_Answer__c', '');
  await pages.createAccount.populate('Security_Question_2__c', login.sq2);
  await pages.createAccount.populate('Security_Question_2_Answer__c', '');
  await pages.createAccount.populate('Security_Question_3__c', login.sq3);
  await pages.createAccount.populate('Security_Question_3_Answer__c', '');
  await pages.createAccount.populate('institution', login.primarySchool);
  await pages.createAccount.populate('OptIn', 'NA');
  await pages.createAccount.populate('termsOfService', 'click');
});

When(/^User "(.*)" has filled all mandatory fields except institution$/, async function (account) {
  const login = await loadLogin(account)
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
  await pages.createAccount.populate('institution', '');
  await pages.createAccount.populate('OptIn', 'NA');
  await pages.createAccount.populate('termsOfService', 'click');
});

When('I click on privacy link', async function () {
  try {
    const hyperlink = await getDriver().findElement(By.xpath("//*[text()='Privacy']")).getAttribute('href');
    log.debug(hyperlink + 'hyperlink');
    log.debug('Clickig on privacy link');
    await getDriver().get(hyperlink);
    log.debug(`Privacy notice link is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I verify that privacy link is directed to privacy page', async function () {
  console.log('Verify that Privacy Link redirects to appropriate page')
  if (await pages.createAccount.checkWebElementExists('privacy_link_check')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});
When('I click on piracy link', async function () {
  try {
    const hyperlink = await getDriver().findElement(By.xpath("//*[text()='Piracy']")).getAttribute('href');
    log.debug(hyperlink + 'hyperlink');
    log.debug('Clickig on piracylink');
    await getDriver().get(hyperlink);
    log.debug(`Privacy notice link is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I verify that piracy link is directed to piracy page', async function () {
  console.log(' Verify that Piracy Link redirects to appropriate page')
  if (await pages.createAccount.checkWebElementExists('piracy_check')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});
When('I click on macmillan learning link', async function () {
  try {
    const hyperlink = await getDriver().findElement(By.xpath("//*[text()='macmillanlearning.com']")).getAttribute('href');
    log.debug(hyperlink + 'hyperlink');
    log.debug('Clickig on macmillan learning link');
    await getDriver().get(hyperlink);
    log.debug(`macmillan learning link is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I verify that macmillan link is directed to macmillan learning page', async function () {
  console.log(' Verify that macmillan learning redirects to appropriate page')
  if (await pages.createAccount.checkWebElementExists('macmillanlearning_check')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});

When('I click on Terms of Purchase', async function () {
  try {
    const hyperlink = await getDriver().findElement(By.xpath("//*[text()='Terms of Purchase']")).getAttribute('href');
    log.debug(hyperlink + 'hyperlink');
    log.debug('Clickig on Terms of Purchase link');
    await getDriver().get(hyperlink);
    log.debug(`Terms of purchase link is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I verify that purchase link is directed to Terms of Purchase', async function () {
  console.log('Verify the Terms of Purchase link directs to the page')
  if (await pages.createAccount.checkWebElementExists('product_purchase')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});

When(/^User "(.*)" has filled all mandatory fields except password$/, async function (user) {
  try {
    const Login = await loadLogin(user)
    await pages.createAccount.populate('firstName', Login.firstName);
    await pages.createAccount.populate('lastName', Login.lastName);
    await pages.createAccount.populate('email', Login.username);
    await pages.createAccount.populate('password', '');
    await pages.createAccount.populate('confirmPassword', '');
    await pages.createAccount.populate('Security_Question_1__c', Login.sq1);
    await pages.createAccount.populate('Security_Question_1_Answer__c', Login.sq1_answer);
    await pages.createAccount.populate('Security_Question_2__c', Login.sq2);
    await pages.createAccount.populate('Security_Question_2_Answer__c', Login.sq2_answer);
    await pages.createAccount.populate('Security_Question_3__c', Login.sq3);
    await pages.createAccount.populate('Security_Question_3_Answer__c', Login.sq3_answer);
    await pages.createAccount.populate('institution', Login.primarySchool);
    await pages.createAccount.populate('OptIn', 'NA');
    await pages.createAccount.populate('termsOfService', 'click');
  } catch (err) {
    log.error(err);
  }
});

When('I click on Account', async function () {
  try {
    log.debug('Clickig on Account ');
    await pages.createAccount.populate('Account', 'click');
    log.debug(`Account button is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

When('I verify Email- address is disabled', async function () {
  try {
    console.log('Verify that E-mail Address shown is disabled and it is same as user created account');
    var verify = await getDriver().findElement(By.xpath(("//*[@id='app']/div/div/div/div/div/div[4]/div"))).getAttribute('outerHTML')
    if (verify.includes('disabled')) {
      console.log('passed');
    } else {
      console.log('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

When('I click on "OPT-OUT@macmillanlearning.com"', async function () {
  try {
    log.debug('Clickig on OPt-outlink');
    await pages.createAccount.populate('Opt', 'click');
    log.debug(`Account button is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I verify it redirects to E-mail', async function () {
  console.log('Verify that on sharing e-mail to the e-mail address OPT-OUT@macmillanlearning.com link no -emial updates should be recived regarding macmillan updates')
  if (await pages.createAccount.checkWebElementExists('compose')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});
When('I click on checkbox in account', async function () {
  try {
    log.debug('Clickig on checkbox');
    await pages.createAccount.populate('checkbox', 'click');
    log.debug(`checkbox is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I click on Primary Institution', async function () {
  try {
    log.debug('Clickig on Primary Institution');
    await pages.createAccount.populate('institution', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    log.debug(`Primary Institution is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I verify the message', async function () {
  try {
    const errorText = await pages.createAccount.getElementValue('institution_message');
    if (errorText == 'Limit of 150 characters reached') {
      console.log('passed');
    } else {
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

When('I click on cancle button', async function () {
  try {
    log.debug('Clickig on cancle');
    await pages.createAccount.populate('cancle_account', 'click');
    log.debug(`cancle button was clicked, ${clickedButton}`);
    await sleep(5000);
  } catch (err) {
    log.error(err);
  }
});

When('I verify home page is displayed', async function () {
  if (await pages.createAccount.checkWebElementExists('cancle_account_verification')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});

When('I click on compose', async function () {
  try {
    await sleep(3000);
    log.debug('Clickig on compose');
    await pages.createAccount.populate('compose', 'click');
    log.debug(`compose button was clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    await sleep(3000);
    log.debug('Clickig on To button');
    await pages.createAccount.populate('To_email', 'OPT-OUT@macmillanlearning.com', 'click');
    log.debug(`To button was clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    await sleep(3000);
    log.debug('Clickig on subject');
    await pages.createAccount.populate('Subject_email', 'verification');
    log.debug(`subject was clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
  try {
    await sleep(3000);
    log.debug('Clickig on send button');
    await pages.createAccount.populate('send_email', 'click');
    log.debug(`send button was clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
    await sleep(3000);
  }
  try {
    await sleep(3000);
    log.debug('Clickig on inbox');
    await pages.createAccount.populate('Inbox_email', 'click');
    log.debug(`Inbox was clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
    await sleep(3000);
  }
});
When('I Verify that on sharing e-mail to the e-mail address "OPT-OUT@macmillanlearning.com" link no -emial updates should be recived regarding macmillan updates', async function () {
  await sleep(10000);
  if (await pages.createAccount.checkWebElementExists('opt_verfication')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});
When('I click setpassword button', async function () {
  try {
    log.debug('Clickig on setpassword button');
    await pages.createAccount.populate('setpassword_button', 'click');
    log.debug(`setpassword button  was clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I click on newpassword', async function () {
  try {
    log.debug('Clickig on new password button');
    await pages.createAccount.populate('password', 'ABCabc@123');
    log.debug(`new password button  was clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
When('I click on save changes button', async function () {
  try {
    log.debug('Clickig on savechanges button');
    await pages.createAccount.populate('save_button', 'click');
    log.debug(`save changes button  was clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
