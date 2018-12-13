const { When, Then } = require('cucumber');
const selenium = require('../../../app/selenium.js');
const page = require('../../master-page.js');
const config = require('../../../config.js');


When(/^I verify the functionality of first name by entering "(.*)"$/, async function (firstname) {
  await pages.createAccount.populate('firstName', firstname);
});
When(/^I verify the functionality of last name by entering "(.*)"$/, async function (lastname) {
  await pages.createAccount.populate('lastName', lastname);
  if (lastname == '') {
    await pages.createAccount.populate('email', '');
  }
});
Then('I verify validation message for first name', async function () {
  const firstNameErrorText = await pages.createAccount.getElementValue('first_error');
  assert(firstNameErrorText == 'First name must not be blank and cannot contain numbers/special characters', 'Cannot verify that First Name field validations are working as expected');
});
Then('I verify validation message for last name', async function () {
  const lastNameErrorText = await pages.createAccount.getElementValue('last_error');
  assert(lastNameErrorText == 'Last name must not be blank and cannot contain numbers/special characters', 'Cannot verify that Last Name field validations are working as expected');
});

When('I verify the functionality of first name and lastname by entering large characters', async function () {
  await pages.createAccount.populate('firstName', 'abcdefghijklmnopqrstuvwxyzabcdefghijklam');
  await pages.createAccount.populate('lastName', 'abcdefghijklmnopqrstuvwxyzabcdefghijklam');
});

Then('I verify large char validation message in the first name field', async function () {
  const lastNameErrorText = await pages.createAccount.getElementValue('largechar_firstname');
  assert(lastNameErrorText == 'Limit of 40 characters reached', 'Failed to show first name character limit error');
})

Then('I verify large char validation message in the last name field', async function () {
  const firstNameErrorText = await pages.createAccount.getElementValue('largechar_lastname');
  assert(firstNameErrorText == 'Limit of 40 characters reached', 'I cannot verify large char validation message in the last name field')
});

Then('I verify the Sign up button is disabled', async function () {
  var verify = await getDriver().findElement(By.xpath(("//*[@class='pad']//button[1]"))).getAttribute('outerHTML')
  assert(verify.includes('disabled'), 'Signup button is not disabled')
});

When('I enter password having eight characters not fullfilling the criteria', async function () {
  await pages.createAccount.populate('password', 'abc2345');
});

When('I check the error message', async function () {
  const errorText = await pages.createAccount.getElementValue('password_error');
  assert(errorText == 'Not a valid password', 'Error text not showing or incorrect');
});

When(/^I enter password from "(.*)" account having eight character fullfilling the criteria$/, async function (account) {
  const user = await loadLogin(account)
  await pages.createAccount.populate('password', user.password);
});

When('I do not enter text in password field but I do enter text into confirm password field', async function () {
  await pages.createAccount.populate('password', '');
  await pages.createAccount.populate('confirmPassword', ' ');
});
When('I check the error message of confirm password', async function () {
  const errorText = await pages.createAccount.getElementValue('confirmpassword_error');
  assert(errorText == 'Passwords must match', 'Passwords must match error text incorrect or not showing');
});
When(/^I enter Password and confirm password from "(.*)" account fullfiling all password requirements$/, async function (account) {
  const user = await loadLogin(account)
  await pages.createAccount.populate('password', user.password);
  await pages.createAccount.populate('confirmPassword', user.password);
});

When(/^I Select SecurityQuestions from "(.*)" account and I enter 150 character value$/, async function (account) {
  const user = await loadLogin(account)
  await pages.createAccount.populate('Security_Question_1__c', user.sq1);
  await pages.createAccount.populate('Security_Question_1_Answer__c', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  await pages.createAccount.populate('Security_Question_2__c', user.sq2);
  await pages.createAccount.populate('Security_Question_2_Answer__c', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  await pages.createAccount.populate('Security_Question_3__c', user.sq3);
  await pages.createAccount.populate('Security_Question_3_Answer__c', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  await pages.createAccount.populate('institution', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
});

When(/^I verify that if I Select Security Questions of the "(.*)" account then I enter an empty string for the answers$/, async function (account) {
  const user = await loadLogin(account)
  await pages.createAccount.populate('Security_Question_1__c', user.sq1);
  await pages.createAccount.populate('Security_Question_1_Answer__c', '');
  await pages.createAccount.populate('Security_Question_2__c', user.sq2);
  await pages.createAccount.populate('Security_Question_2_Answer__c', '');
  await pages.createAccount.populate('Security_Question_3__c', user.sq3);
  await pages.createAccount.populate('Security_Question_3_Answer__c', '');
  await pages.createAccount.populate('institution', '');
});

When(/^I enter the value of "(.*)" for each security question answer$/, async function (answer) {
  await pages.createAccount.populate('Security_Question_1_Answer__c', answer);
  await pages.createAccount.populate('Security_Question_2_Answer__c', answer);
  await pages.createAccount.populate('Security_Question_3_Answer__c', answer);
  await pages.createAccount.populate('institution', '');
});

Then(/^I verify the content of the security question error messages displayed is "(.*)" in preprod$/, async function (message) {
  const sqOneErrorText = await pages.createAccount.getElementValue('Security_question_1_error_preprod');
  assert(sqOneErrorText == message, 'Failed to show correct error message for Security Question 1, for preprod expectations');
  const sqTwoErrorText = await pages.createAccount.getElementValue('Security_question_2_error_preprod');
  assert(sqTwoErrorText == message,'Failed to show correct error message for Security Question 2, for preprod expectations');
  const sqThreeErrorText = await pages.createAccount.getElementValue('Security_question_3_error_preprod');
  assert(sqThreeErrorText == message, 'Failed to show correct error message for Security Question 3, for preprod expectations');
})

Then(/^I verify the content of the security question error messages displayed is "(.*)" in preprod_blank$/, async function (message) {
  const sqOneErrorText = await pages.createAccount.getElementValue('Security_question_1_error_preprod_blank');
  assert(sqOneErrorText == message, 'Failed to show correct error message for Security Question 1, for preprod_blank expectations');
  const sqTwoErrorText = await pages.createAccount.getElementValue('Security_question_2_error_preprod_blank');
  assert(sqTwoErrorText == message, 'Failed to show correct error message for Security Question 2, for preprod_blank expectations');
  const sqThreeErrorText = await pages.createAccount.getElementValue('Security_question_3_error_preprod_blank');
  assert(sqThreeErrorText == message, 'Failed to show correct error message for Security Question 3, for preprod_blank expectations');
})

When(/^I Select SecurityQuestions from "(.*)" account and I dont answer any questions$/, async function (account) {
  const user = await loadLogin(account)
  await pages.createAccount.populate('Security_Question_1__c', user.sq1);
  await pages.createAccount.populate('Security_Question_1_Answer__c', '');
  await pages.createAccount.populate('Security_Question_2__c', user.sq2);
  await pages.createAccount.populate('Security_Question_2_Answer__c', '');
  await pages.createAccount.populate('Security_Question_3__c', user.sq3);
  await pages.createAccount.populate('Security_Question_3_Answer__c', '');
  await pages.createAccount.populate('institution', '');
});

Then(/^I verify list of Primary Institutions or schools will display starting with the letter "(.*)"$/, async function (Primary) {
  await pages.createAccount.populate('institution', Primary);
  await pages.createAccount.populate('first_institution', 'click');
});

Then(/^I Select "(.*)" in Primary Institution or School text box$/, async function (usacollege) {
  await pages.createAccount.populate('institution', usacollege);
  await sleep(2000)
  const dropdown = await getDriver().findElement(By.xpath(("//*[@id='react-autowhatever-1--item-0']")))
  await dropdown.click();
});

When('I verify the opt-in checkbox is not checked', async function () {
  const optInBoolean = await pages.createAccount.getElementValue('OptIn', 'selected');
  assert(optInBoolean === false, 'Checkbox is checked when it should not be clicked');
});

When('I verify the opt-in checkbox is checked', async function () {
  const optInBoolean = await pages.createAccount.getElementValue('OptIn', 'selected');
  assert(optInBoolean === true, 'Checkbox is not checked');
});

Then(/^I verify the password inputed "(.*)" is not the same as the one that was allowed$/, async function (password) {
  const passwordAllowed = await pages.createAccount.getElementValue('password', 'value')
  const passwordStatement = 'The password that was allowed was too long, passwordAllowed' + passwordAllowed + 'password inputed: ' + password;
  assert(password !== passwordAllowed, passwordStatement);
})

When(/^I Select "(.*)" in Primary Institution text box$/, async function (canadacollege) {
  await pages.createAccount.populate('institution', canadacollege);
});

Then('I click on checkbox', async function () {
  await pages.createAccount.populate('OptIn', 'click');
});

When('I click on privacy notice link', async function () {
  await sleep(2000);
  await pages.createAccount.populate('Privacy_notice', 'selected');
});

When('I click on privacy notice link within user account view', async function () {
  await sleep(2000);
  await pages.createAccount.populate('Privacy_notice_account', 'selected');
});

Then('I verify that I am redirected to privacy notice link page', async function () {
  await pages.createAccount.checkWebElementExists('privacy_check')
});

When('I click on user agreement checkbox', async function () {
  await pages.createAccount.populate('termsOfService', 'click');
});
Then('I verify that all the fields are empty', async function () {
  var verify = await getDriver().findElement(By.xpath(("//*[@class='pad']//button[1]"))).getAttribute('outerHTML')
  assert(verify.includes('disabled'), 'Checkbox is not selectable');
});

When('I click on Terms of use link', async function () {
  await pages.createAccount.populate('TermsOfUse', 'click');
});

Then('I verify that I am redirected to terms of use page', async function () {
  assert(await pages.createAccount.checkWebElementExists('TermsOfUse_check'), 'Terms of use does not exist');
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
  const hyperlink = await getDriver().findElement(By.xpath("//*[text()='Privacy']")).getAttribute('href');
  await getDriver().get(hyperlink);
});

Then('I verify that privacy link is directed to privacy page', async function () {
  assert(await pages.createAccount.checkWebElementExists('privacy_link_check'), 'Link does not exist');
});

When('I click on piracy link', async function () {
  const hyperlink = await getDriver().findElement(By.xpath("//*[text()='Piracy']")).getAttribute('href');
  await getDriver().get(hyperlink);
});

Then('I verify that piracy link is directed to piracy page', async function () {
  assert(await pages.createAccount.checkWebElementExists('piracy_check'), 'Piracy link does not exist');
});

When('I click on macmillan learning link', async function () {
  const hyperlink = await getDriver().findElement(By.xpath("//*[text()='macmillanlearning.com']")).getAttribute('href');
  await getDriver().get(hyperlink);
});

Then('I verify that macmillan link is directed to macmillan learning page', async function () {
  assert(await pages.createAccount.checkWebElementExists('macmillanlearning_check'), 'Macmillan learning link does not exist');
});

When('I click on Terms of Purchase', async function () {
  const hyperlink = await getDriver().findElement(By.xpath("//*[text()='Terms of Purchase']")).getAttribute('href');
  await getDriver().get(hyperlink);
});
When('I verify that purchase link is directed to Terms of Purchase', async function () {
  assert(await pages.createAccount.checkWebElementExists('product_purchase'), 'purchase link does not exist');
});

When(/^User has filled out the form with password: "(.*)"$/, async function (password) {
  await pages.createAccount.populate('password', password);
  await pages.createAccount.populate('confirmPassword', password);
});

When(/^User "(.*)" has filled all mandatory fields except password$/, async function (user) {
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
});

When('I click on Account', async function () {
  await sleep(3000)
  await pages.createAccount.populate('Account', 'click');
});

When(/^I verify that the account information for "(.*)" displayed is correct$/, async function (user) {
  const Login = await loadLogin(user);
  const firstName = await pages.createAccount.getElementValue('firstNameAccount', 'value');
  const lastName = await pages.createAccount.getElementValue('lastNameAccount', 'value');
  const email = await pages.createAccount.getElementValue('Email_disabled');
  const sq1answer = await pages.createAccount.getElementValue('Security_Question_1_Answer__c', 'value');
  const sq2answer = await pages.createAccount.getElementValue('Security_Question_2_Answer__c', 'value');
  const sq3answer = await pages.createAccount.getElementValue('Security_Question_3_Answer__c', 'value');
  const institution = await pages.createAccount.getElementValue('institution', 'value');
  assert(firstName === Login.firstName,'Not the correct first name ' + firstName + ' is displayed instead');
  assert(lastName === Login.lastName,'Not the correct last name ' + lastName + ' is displayed instead');
  assert(email === Login.username,'Not the correct email ' + email + ' is displayed instead');
  assert(sq1answer === 'answer','Not the correct security question 1 answer ' + sq1answer + ' is displayed instead');
  assert(sq2answer === 'answer','Not the correct security question 2 answer ' + sq2answer + ' is displayed instead');
  assert(sq3answer === 'answer','Not the correct security question 3 answer ' + sq3answer + ' is displayed instead');
  assert(institution === Login.primarySchool,'Not the institution ' + institution + ' is displayed instead');
});

When('I click on "OPT-OUT@macmillanlearning.com"', async function () {
  await pages.createAccount.populate('Opt', 'click');
});

When('I verify it redirects to E-mail', async function () {
  const composeEmail = await pages.createAccount.checkWebElementExists('compose_opt_out')
  assert(composeEmail, 'Compose link does not exist')
});

When('I click on checkbox in account', async function () {
  await pages.createAccount.populate('checkbox', 'click');
});

Then('I input too many characters into the Primary Institution field', async function () {
  await pages.createAccount.populate('institution', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTU');
});

Then('I verify the primary institution error message of too many characters', async function () {
  const errorText = await pages.createAccount.getElementValue('institution_message');
  assert(errorText === 'Limit of 150 characters reached','Primary institution error message of too many characters not showing ' + errorText);
});

Then('I verify the primary institution field does not allow more than 150 characters', async function () {
  const institutionText = await pages.createAccount.getElementValue('institution');
  assert(institutionText.length !== 150, 'Primary institution error message of too many characters not showing');
});

When('I click on cancel button in User Acccount Menu', async function () {
  await pages.createAccount.populate('cancel_account', 'click');
  await sleep(3000);
});

When('I verify home page is displayed', async function () {
  await pages.createAccount.checkWebElementExists('cancle_account_verification')
});

When('I click on compose', async function () {
  await sleep(3000);
  await pages.createAccount.populate('compose', 'click');
  await sleep(3000);
  await pages.createAccount.populate('To_email', 'OPT-OUT@macmillanlearning.com', 'click');
  await sleep(3000);
  await pages.createAccount.populate('Subject_email', 'verification');
  await sleep(3000);
  await pages.createAccount.populate('send_email', 'click');
  await sleep(3000);
  await pages.createAccount.populate('Inbox_email', 'click');
  await sleep(3000);
});

When('I Verify that on sharing e-mail to the e-mail address "OPT-OUT@macmillanlearning.com" link no -emial updates should be recived regarding macmillan updates', async function () {
  await sleep(10000);
  assert(await pages.createAccount.checkWebElementExists('opt_verfication'), 'Opt-out link exists');
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
