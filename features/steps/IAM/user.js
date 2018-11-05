const { When, Then} = require('cucumber');
const path = require('path');
const { By, until } = require('selenium-webdriver');
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
When(/^I verify the functionality of first name by entering "(.*)"$/, async function (firstname) {
  try {
    await pages.createAccount.populate('firstName', firstname);
  } catch (err) {
    log.error(err);
  }
});
When(/^I verify the functionality of last name by entering "(.*)"$/, async function (lastname) {
  try {
    await pages.createAccount.populate('lastName', lastname);
    if (lastname == '') {
      await pages.createAccount.populate('email', '');
    }
  } catch (err) {
    log.error(err);
  }
});
Then('I verify validation message for first name', async function () {
  const firstNameErrorText = await pages.createAccount.getElementValue('first_error');
  if (firstNameErrorText == 'First name must not be blank and cannot contain numbers/special characters') {
    console.log('Passed: Verify that First Name field validations are working as expected');
  } else {
    throw new Error('failed');
  }
});
Then('I verify validation message for last name', async function () {
  const lastNameErrorText = await pages.createAccount.getElementValue('last_error');
  if (lastNameErrorText == 'Last name must not be blank and cannot contain numbers/special characters') {
    console.log('Passed: Verify that Last Name field validations are working as expected');
  } else {
    throw new Error('failed');
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

Then('I verify large char validation message in the first name field', async function () {
  console.log('Verify that First Name field validations are working as expected')
  const lastNameErrorText = await pages.createAccount.getElementValue('largechar_firstname').catch((err)=>{
    throw new Error('Failed to show first name character limit error', err)
  });
  if (lastNameErrorText == 'Limit of 40 characters reached') {
    console.log('Passed: I verify large char validation message in the first name field');
  } else {
    throw new Error('Failed to show first name character limit error');
  }
})

Then('I verify large char validation message in the last name field', async function () {
  console.log('Verify that Last Name field validations are working as expected')
  const firstNameErrorText = await pages.createAccount.getElementValue('largechar_lastname');
  if (firstNameErrorText == 'Limit of 40 characters reached') {
    console.log('Passed: I verify large char validation message in the last name field');
  } else {
    throw new Error('Failed to show last name character limit error');
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
  console.log('Verify that password field validations are working as expected')
  const errorText = await pages.createAccount.getElementValue('password_error');
  if (errorText == 'Not a valid password') {
    console.log('passed');
  } else {
    throw new Error('failed');
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

When('I do not enter text in password field but I do enter text into confirm password field', async function () {
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

When(/^I verify that if I Select Security Questions of the "(.*)" account then I enter an empty string for the answers$/, async function (account) {
  // try {    
    const user = await loadLogin(account)
    log.debug('clicking on Security Question button');
    await pages.createAccount.populate('Security_Question_1__c', user.sq1);
    await pages.createAccount.populate('Security_Question_1_Answer__c', '');
    await pages.createAccount.populate('Security_Question_2__c', user.sq2);
    await pages.createAccount.populate('Security_Question_2_Answer__c', '');
    await pages.createAccount.populate('Security_Question_3__c', user.sq3);
    await pages.createAccount.populate('Security_Question_3_Answer__c', '');
    await pages.createAccount.populate('institution', '');
  // } catch (err) {
  //   log.error(err);
  // }
});

When(/^I enter the value of "(.*)" for each security question answer$/, async function (answer) {
  log.debug('Filling out each Security Question button');
  await pages.createAccount.populate('Security_Question_1_Answer__c', answer);
  await pages.createAccount.populate('Security_Question_2_Answer__c', answer);
  await pages.createAccount.populate('Security_Question_3_Answer__c', answer);
  await pages.createAccount.populate('institution', '');
});

Then(/^I verify the content of the security question error messages displayed is "(.*)" in preprod$/, async function (message) {

  const sqOneErrorText = await pages.createAccount.getElementValue('Security_question_1_error_preprod');
  if (sqOneErrorText == message) {
    console.log('passed with preprod expectations')
  } else {
    throw new Error('Failed to show correct error message for Security Question 1, for preprod expectations');
  }
  const sqTwoErrorText = await pages.createAccount.getElementValue('Security_question_2_error_preprod');
  if (sqTwoErrorText == message) {
    console.log('passed with preprod expectations')
  } else {
    throw new Error('Failed to show correct error message for Security Question 2, for preprod expectations');
  }
  const sqThreeErrorText = await pages.createAccount.getElementValue('Security_question_3_error_preprod');
  if (sqThreeErrorText == message) {
    console.log('passed with preprod expectations')
  } else {
    throw new Error('Failed to show correct error message for Security Question 3, for preprod expectations');
  }

})

Then(/^I verify the content of the security question error messages displayed is "(.*)" in preprod_blank$/, async function (message) {

  const sqOneErrorText = await pages.createAccount.getElementValue('Security_question_1_error_preprod_blank');
  if (sqOneErrorText == message) {
    console.log('passed with preprod_blank expectations')
  } else {
    throw new Error('Failed to show correct error message for Security Question 1, for preprod_blank expectations');
  }
  const sqTwoErrorText = await pages.createAccount.getElementValue('Security_question_2_error_preprod_blank');
  if (sqTwoErrorText == message) {
    console.log('passed with preprod_blank expectations')
  } else {
    throw new Error('Failed to show correct error message for Security Question 2, for preprod_blank expectations');
  }
  const sqThreeErrorText = await pages.createAccount.getElementValue('Security_question_3_error_preprod_blank');
  if (sqThreeErrorText == message) {
    console.log('passed with preprod_blank expectations')
  } else {
    throw new Error('Failed to show correct error message for Security Question 3, for preprod_blank expectations');
  }

})

Then(/^I verify the content of the security question error messages displayed is "(.*)" in int$/, async function (message) {

  const sqOneErrorText = await pages.createAccount.getElementValue('Security_question_1_error_int');
  if (sqOneErrorText == message) {
    console.log('passed with int expectations')
  } else {
    throw new Error('Failed to show correct error message for Security Question 1, for int expectations');
  }
  const sqTwoErrorText = await pages.createAccount.getElementValue('Security_question_2_error_int');
  if (sqTwoErrorText == message) {
    console.log('passed with int expectations')
  } else {
    throw new Error('Failed to show correct error message for Security Question 2, for int expectations');
  }
  const sqThreeErrorText = await pages.createAccount.getElementValue('Security_question_3_error_int');
  if (sqThreeErrorText == message) {
    console.log('passed with int expectations')
  } else {
    throw new Error('Failed to show correct error message for Security Question 3, for int expectations');
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

Then(/^I verify list of Primary Institutions or schools will display starting with the letter "(.*)"$/, async function (Primary) {
  try {
    log.debug('Clickig on primary institute button');
    await pages.createAccount.populate('institution', Primary);
    await pages.createAccount.populate('first_institution', 'click');
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
    log.debug('Primary institute field filled');
    await pages.createAccount.populate('institution', usacollege);
    // I know this sleep is not the best but the populate click does not seem to be working. 
    // It must have something to do with the type of element.
    // await pages.createAccount.populate('first_institution', 'click');
    await sleep(2000)
    const dropdown = await getDriver().findElement(By.xpath(("//*[@id='react-autowhatever-1--item-0']")))
    await dropdown.click();
});

When('I verify the opt-in checkbox is not checked', async function () {
  const optInBoolean = await pages.createAccount.getElementValue('OptIn', 'selected');
  if(optInBoolean === false) {
    console.log('Passed optin is not checked');
  } else {
    throw new Error('Checkbox is checked');
  }

});

When('I verify the opt-in checkbox is checked', async function () {
  const optInBoolean = await pages.createAccount.getElementValue('OptIn', 'selected');
  if(optInBoolean === true) {
    console.log('Passed optin is checked');
  } else {
    throw new Error('Checkbox is not checked');
  }

});

// This is not DRY code, this step function is repeated 6 or seven times
// Then('I verify the Sign up button is disabled when Primary Institution or School text box', async function () {
//   try {
//     console.log('Verify that on selecting a US college in "Primary Institution or School" text box, the application automatically checks the "Opt IN" check box');
//     var verify = await getDriver().findElement(By.xpath(("//*[@class='pad']//button[1]"))).getAttribute('outerHTML')
//     if (verify.includes('disabled')) {
//       console.log('passed');
//     } else {
//       console.log('failed');
//     }
//   } catch (err) {
//     log.error(err);
//   }
// });

Then(/^I verify the password inputed "(.*)" is not the same as the one that was allowed$/, async function (password) {
  const passwordAllowed = await pages.createAccount.getElementValue('password', 'value')
  
  if(password === passwordAllowed) {
    throw new Error('The password that was allowed was too long, passwordAllowed', passAllowed, 'password inputed: ', password);
  } else {
    console.log('Passed: The Password that was allowed was ', passwordAllowed, 'even though the password inputed was ', password);
  }
})

When(/^I Select "(.*)" in Primary Institution text box$/, async function (canadacollege) {
  try {
    log.debug('Clickig on primary institute button');
    await pages.createAccount.populate('institution', canadacollege);
    log.debug(`primary institute button is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});


// Then('I verify the Sign up button is disabled when canada college is selected', async function () {
//   try {
//     console.log('Verify that on selecting a canada college in "Primary Institution or School" text box, the application automatically checks the "Opt IN" check box');
//     var verify = await getDriver().findElement(By.xpath(("//*[@class='pad']//button[1]"))).getAttribute('outerHTML')
//     if (verify.includes('disabled')) {
//       console.log('passed');
//     } else {
//       console.log('failed');
//     }
//   } catch (err) {
//     log.error(err);
//   }
// });

Then('I click on checkbox', async function () {
  try {
    log.debug('Clickig on checkbox');
    await pages.createAccount.populate('OptIn', 'click');
    log.debug(`checkbox is clicked, ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
// Then('I verify the Sign up button is disabled when I click on check box', async function () {
//   try {
//     console.log('Verify that Checkbox "Opt IN" is selectable and E-mail notification should generate');
//     var verify = await getDriver().findElement(By.xpath(("//*[@class='pad']//button[1]"))).getAttribute('outerHTML')
//     if (verify.includes('disabled')) {
//       console.log('failed');
//     } else {
//       console.log('passed');
//     }
//   } catch (err) {
//     log.error(err);
//   }
// });
When('I click on privacy notice link', async function () {
    await pages.createAccount.populate('Privacy_notice', 'selected');
});
Then('I verify that I am redirected to privacy notice link page', async function () {
  await pages.createAccount.checkWebElementExists('privacy_check')
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
    await pages.createAccount.assert('signUp_btn', 'disabled');
    console.log(check)
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

When(/^User has filled out the form with password: "(.*)"$/, async function (password) {
  try {
    await pages.createAccount.populate('password', password);
    await pages.createAccount.populate('confirmPassword', password);
  } catch {
    log.error(err);
  }

})

When(/^User "(.*)" has filled all mandatory fields except password$/, async function (user) {
  try {
    const Login = await loadLogin(user);
    await pages.createAccount.populate('firstName', Login.firstName);
    await pages.createAccount.populate('lastName', Login.lastName);
    await pages.createAccount.populate('email', Login.username);
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

//This test case is deprecated
// When('I verify Email- address is disabled', async function () {
//     console.log('Verify that E-mail Address shown is disabled and it is same as user created account');
//     await pages.createAccount.assert('Email_disabled', 'disabled');
// });

When(/^I verify that the account information for "(.*)" displayed is correct$/, async function (user) {
  const Login = await loadLogin(user);
  const firstName = await pages.createAccount.getElementValue('firstNameAccount', 'value');
  const lastName = await pages.createAccount.getElementValue('lastNameAccount', 'value');
  const email = await pages.createAccount.getElementValue('Email_disabled');
  const sq1answer = await pages.createAccount.getElementValue('Security_Question_1_Answer__c', 'value');
  const sq2answer = await pages.createAccount.getElementValue('Security_Question_2_Answer__c', 'value');
  const sq3answer = await pages.createAccount.getElementValue('Security_Question_3_Answer__c', 'value');
  const institution = await pages.createAccount.getElementValue('institution', 'value');
  if(firstName !== Login.firstName){
    throw new Error('Not the correct first name ', firstName, ' is displayed instead');
  }
  if(lastName !== Login.lastName){
    throw new Error('Not the correct last name ', lastName, ' is displayed instead');
  }
  if(email !== Login.username){
    throw new Error('Not the correct email ', email, ' is displayed instead');
  }
  if(sq1answer !== 'answer'){
    throw new Error('Not the correct security question 1 answer ', sq1answer, ' is displayed instead');
  }
  if(sq2answer !== 'answer'){
    throw new Error('Not the correct security question 2 answer ', sq2answer, ' is displayed instead');
  }
  if(sq3answer !== 'answer'){
    throw new Error('Not the correct security question 3 answer ', sq3answer, ' is displayed instead');
  }
  if(institution !== 'Macmillan Education'){
    throw new Error('Not the institution ', institution, ' is displayed instead');
  }

});

When('I click on "OPT-OUT@macmillanlearning.com"', async function () {
  // try {
    // log.debug('Clickig on OPt-outlink');
    await pages.createAccount.populate('Opt', 'click');
    // log.debug(`Account button is clicked, ${clickedButton}`);
  // } catch (err) {
  //   log.error(err);
  // }
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

Then('I input too many characters into the Primary Institution field', async function () {
    await pages.createAccount.populate('institution', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTU');
});

Then('I verify the primary institution error message of too many characters', async function () {
  const errorText = await pages.createAccount.getElementValue('institution_message');
  if (errorText == 'Limit of 150 characters reached') {
  } else {
    throw new Error('Primary institution error message of too many characters not showing')
  }
});

Then('I verify the primary institution field does not allow more than 150 characters', async function () {
  const institutionText = await pages.createAccount.getElementValue('institution', 'value');
  if (institutionText.length !== 150) {
    throw new Error('Primary institution error message of too many characters not showing')
  } else {
    log.debug('Institution field does not allow more than 150 characters');
  }
});

When('I click on cancel button in User Acccount Menu', async function () {
  await pages.createAccount.populate('cancel_account', 'click');
});

When('I verify home page is displayed', async function () {
  await pages.createAccount.checkWebElementExists('cancle_account_verification')
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
    await pages.createAccount.populate('setpassword_button', 'click');
});
When('I click on newpassword', async function () {
    await pages.createAccount.populate('password', 'ABCabc@123');
});
When('I click on save changes button', async function () {
    await pages.createAccount.populate('save_button', 'click');
    await sleep(3000);
});
