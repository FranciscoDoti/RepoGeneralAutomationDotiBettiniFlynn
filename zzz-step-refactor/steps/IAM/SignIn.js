const { When, Then } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../../page/a_master.js');
const chai = require('chai');

When('I click on create an account button', async function() {
  await pages.navigation.populate('create_account_button', 'click');
});

Then('I hover on icon "i"', async function() {
  await pages.login.populate('view_box', 'click');
});
Then('I verify that password info icon tooltip Information is consistent to application behavior', async function() {
  await pages.login.checkWebElementExists('Tooltip_verifiaction');
});

Then('I click on forgot password link above password field text field', async function() {
  await pages.login.populate('forgot_password', 'click');
});
Then('I Verify Application should display forgot password page', async function() {
  await pages.login.checkWebElementExists('forgot_check')
});

Then('I Verify User Sign In with existing registered account appropriately', async function() {
  await pages.login.checkWebElementExists('existinguser_check');
});

When('I enter invalid username and password', async function() {
  await pages.login.populate('txt_username', 'user');
  await pages.login.populate('txt_password', 'user');
  await pages.login.populate('sign_in', 'click');
});

// Are we sure we are testing this correctly, it seems to be passing the tests but logging an error in the terminal from one of these tests or more
// TODO: Find which test is logging an error, find out why and remove noisy console logs
Then('I Verify "Invalid user name and password" message should be displayed', async function() {
  const errorText = await pages.login.getElementValue('error_sign');
  if (errorText == 'Invalid username or password') {} else {
    throw new Error('failed');
  }
});

When('I login using invalid login credentials for 6 times', async function(dataTable) {
  invalid = dataTable;
});

Then('I login with following credentials:', async function() {
  var e;
  for (e = 0; e < invalid.rows().length; e++) {
    await pages.login.populate(invalid.hashes()[e].UserName, invalid.hashes()[e].Password);
  }
});

Then('I Verify that "Too many login attempts. Wait 15 minutes and try again" message is displayed', async function() {
  await pages.login.getElementValue('userinvalid_errortext');
});

Then('I click on help Link', async function() {
  const hyperlink = await getDriver().findElement(By.xpath("//*[text()='Help']")).getAttribute('href');
  await getDriver().get(hyperlink);
});

Then('I verify the help page is displayed', async function() {
  await pages.login.checkWebElementExists('help_check');
});

Then('I verify that user must not able to login', async function() {
  await pages.login.checkWebElementExists('existinguser_check')) {});
