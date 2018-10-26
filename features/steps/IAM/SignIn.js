const { When, Then} = require('cucumber');
const path = require('path');
const { By} = require('selenium-webdriver');
const { loadConfig, loadLogin, loadData, loadDataTable} = require('../../../app/util'); 
const { assert } = require('chai');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep} = require('../../../app/driver');
let pages = {
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  mainPage: new PageObject('mainPage.json', stepsPath),
  login: new PageObject('loginPage.json', stepsPath),
  navigation: new PageObject('navigation.json', stepsPath)
}

When('I click on create an account button', async function () {
  try {
    log.debug('Clicking on create_account button');
    await pages.navigation.populate('create_account_button', 'click');
    log.debug(`create_account button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});

Then('I hover on icon "i"', async function () {
  try {
    log.debug('Clicking on view_box button');
    await pages.login.populate('view_box', 'click');
    log.debug(`view box button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I verify that password info icon tooltip Information is consistent to application behavior', async function () {
  console.log('Verify that password info icon tooltip Information is consistent to application behavior')
  if (await pages.login.checkWebElementExists('Tooltip_verifiaction')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});

Then('I click on forgot password link above password field text field', async function () {
  try {
    log.debug('clicking on forgot button');
    await pages.login.populate('forgot_password', 'click');
    log.debug(`forgot button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I Verify Application should display forgot password page', async function () {
  console.log('Verify Forgot Link is redirecting to forgot password page')
  if (await pages.login.checkWebElementExists('forgot_check')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});
Then('I Verify User Sign In with existing registered account appropriately', async function () {
  console.log('Verify that Existing registered account Sign In appropriately')
  if (await pages.login.checkWebElementExists('existinguser_check')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});
When('I enter invalid username and password', async function () {
  try {
    log.debug('clicking on username and password  button');
    await pages.login.populate('txt_username', 'user');
    await pages.login.populate('txt_password', 'user');
    await pages.login.populate('sign_in', 'click');
    log.debug(`forgot button was clicked: ${clickedButton}`);
  } catch (err) {
    log.error(err);
  }
});
Then('I Verify "Invalid user name and password" message should be displayed', async function () {
  try {
    console.log('Invalid user name and password')
    const errorText = await pages.login.getElementValue('error_sign');
    if (errorText == 'Invalid username or password') {
      console.log('passed');
    } else {
      console.log('failed');
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});

When('I login using invalid login credentials for 6 times', async function (dataTable) {
  invalid = dataTable;
});

Then('I login with following credentials:', async function () {
  try {
    log.info(invalid.rows().length);
    var e;
    for (e = 0; e < invalid.rows().length; e++) {
      log.info(invalid.hashes()[e].UserName);
      log.info(invalid.hashes()[e].Password);
      await pages.login.populate(invalid.hashes()[e].UserName, invalid.hashes()[e].Password);
    }
  } catch (err) {
    log.error(err.stack);
  }
  // await sleep(5000);
});

Then('I Verify that "Too many login attempts. Wait 15 minutes and try again" message is displayed', async function () {
  try {
    console.log('Verify that invalid username and password attempt for more than 3 times will now allow user to login for 15 minutes using any browser or system')
    const errorText = await pages.login.getElementValue('userinvalid_errortext');
    console.log(errorText+'errortext');
    if (errorText == 'Too many login attempts. Wait 15 minutes and try again') {
      console.log('passed');
    } else {
      console.log('failed');
      throw new Error('failed');
    }
  } catch (err) {
    log.error(err);
  }
});


Then('I click on help Link', async function () {
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

Then('I verify the help page is displayed', async function () {
  console.log('Verify Help Link is present on the Sign In page and redirecting to appropriate page')
  if (await pages.login.checkWebElementExists('help_check')) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});

Then('I verify that user must not able to login', async function () {
  console.log('Verify whether user able to login without waiting for 15minutes')
  if (await pages.login.checkWebElementExists('existinguser_check')) {
    console.log('failed');
  } else {
    console.log('passed');
  }
});
