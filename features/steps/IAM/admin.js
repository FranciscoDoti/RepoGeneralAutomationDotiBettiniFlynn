const path = require('path');
var Imap = require('imap')
var simpleParser = require("mailparser").simpleParser;
const { When, Then } = require('cucumber');
const { loadConfig, loadLogin } = require('../../../app/util');
const expect = require('chai')
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const chromePath = require('chromedriver').path;
const { log } = require('../../../app/logger');
const { getDriver, sleep } = require('../../../app/driver');
const { By } = require('selenium-webdriver'); 
const emailid = Math.random().toString(36).substr(2, 6) + '@gmail.com';

// Scenario setup
let pages = {
  authAdmin: new PageObject('auth-admin-role.json', stepsPath),
  createAccount: new PageObject('createAccount.json', stepsPath)
}
var adminRestLink = '';

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
When('I check E-mail Notification', async function () {
  // log.debug('Clicking on mail');
  // await pages.authAdmin.populate('mail', 'click');
  // const hyperlink = await getDriver().findElement(By.xpath("//*[text()='Reset your password']")).getAttribute('href');
  // log.debug(hyperlink + 'hyperlink');
  // log.debug('Clicking on reset password');
  // await getDriver().get(hyperlink);
  var imap = new Imap({
    user: 'coursewareachieve@gmail.com',
    password: 'ABCabc@123',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
  });
  
  function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
  }

  imap.once('ready', function() {
      openInbox(function(err, box) {
          if (err) throw err;
          var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
          f.on('message', function(msg, seqno) {
              // console.log('Message #%d', seqno);
              var prefix = '(#' + seqno + ') ';
              msg.on('body', function(stream, info) {
                  simpleParser(stream).then((parsed) => {
                      var regex = /(?<=If the link has expired you can initiate another password reset request<\/p><p><a href=")(.*?)(?=">)/
                      if(parsed.textAsHtml){
                          adminResetLink = parsed.textAsHtml;
                          adminResetLink = adminResetLink.match(regex);
                          adminResetLink = adminResetLink[0]
                          console.log(adminResetLink);
                      }
                  })
              });
          });
          f.once('error', function(err) {
              console.log('Fetch error: ' + err);
          });
          f.once('end', function() {
              console.log('Done fetching all messages!');
              imap.end();
          });
      });
  });
  
  // imap.once('error', function(err) {
  //   console.log(err);
  // });
  
  // imap.once('end', function() {
  //   console.log('Connection ended');
  //   console.log(adminResetLink, '~~~~~~~~~~~~on End')
  //   await getDriver().get(adminResetLink)
  // });
  
  imap.connect();
});

When(/^I enter Password and confirm password from "(.*)" account for fulfilling the validation criteria$/, async function (account) {
  const mail = await loadLogin(account);
  await sleep(5000);
  await getDriver().get(adminResetLink);
  log.debug(`clicking on Password and confirm password button, ${account}`);
  await pages.createAccount.populate('password', mail.newpassword);
  await pages.createAccount.populate('confirmPassword', mail.newpassword);
});
When('I click on Reset password', async function () {
  await sleep(10000);
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
