const { When, Then } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const config = require('../../../config.js');


// Login Functionality //
async function signIn(driver, username, password) {
  let qa = new selenium(driver);

  await qa.input(page.iam.login.username, username, true);
  await qa.input(page.iam.login.password, password, true);
  await qa.click(page.iam.login.sign_in);
};

When('I login with the following credentials', async function(data_table) {
  for (let i = 0; i < data_table.rows().length; i++) {
    await signIn(this.driver, data_table.hashes()[i].username, data_table.hashes()[i].password);
  }
});

When(/^I have logged in as "(.*)"$/, async function(user_object) {
  let payload = require(`../../_data/user/${config.environment}/${user_object}.json`);

  await signIn(this.driver, payload.username, payload.password);
});

When(/^I have logged in with a new password "(.*)" as "(.*)"$/, async function(password, user_object) {
  let payload = require(`../../_data/user/${config.environment}/${user_object}.json`);

  await signIn(this.driver, payload.username, password);
});

// Refactor //
When('I click on create an account button', async function() {
  await pages.navigation.populate('create_account_button', 'click');
});

When('I enter invalid username and password', async function() {
  await pages.login.populate('txt_username', 'user');
  await pages.login.populate('txt_password', 'user');
  await pages.login.populate('sign_in', 'click');
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

// Are we sure we are testing this correctly, it seems to be passing the tests but logging an error in the terminal from one of these tests or more
// TODO: Find which test is logging an error, find out why and remove noisy console logs
Then('I Verify "Invalid user name and password" message should be displayed', async function() {
  const errorText = await pages.login.getElementValue('error_sign');
  if (errorText == 'Invalid username or password') {} else {
    throw new Error('failed');
  }
});

Then('I click on help Link', async function() {
  const hyperlink = await getDriver().findElement(By.xpath("//*[text()='Help']")).getAttribute('href');
  await getDriver().get(hyperlink);
});

Then('I verify the help page is displayed', async function() {
  await pages.login.checkWebElementExists('help_check');
});

Then('I verify that user must not able to login', async function() {
  await pages.login.checkWebElementExists('existinguser_check');
});
