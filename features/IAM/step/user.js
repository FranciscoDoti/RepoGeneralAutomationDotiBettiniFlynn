const { When, Then } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const config = require('../../../config.js');
const assert_text = require('../../master-text.js');
const expect = require('chai').expect;
const _ = require('lodash');


// Create User Functionality //
async function createUser(driver, element, input, missing) {
    let missingField = missing || "none";
    let qa = new selenium(driver);
    if(element !== missingField) {
      let PAGE = await _.get(page, ['iam', 'create_account', element]);
      await qa.input(PAGE, input);
      if(element === 'institution'){
          await qa.click(page.iam.create_account.institution);
          await qa.click(page.iam.create_account.first_institution);
      }
    }
};

async function checkUserAccount(driver, element, input) {
  let qa = new selenium(driver);
      let PAGE = await _.get(page, ['iam', 'create_account', element]);
      if(element === 'email'){
          let emailPage = await _.get(page, ['iam', 'create_account', 'email_disabled']);
          valueAttribute = await qa.getText(emailPage)
          // Cannot locate this email within this div easily so going to need to add an id here
      } else if (element === 'last_name' || element === 'first_name') {
          let newKey = element + '_account';
          let NAME_PAGE = await _.get(page, ['iam', 'create_account', newKey]);
          valueAttribute = await qa.getAttribute(NAME_PAGE, 'value');
      } else if(element === 'password' || element === 'confirm_password') {
          valueAttribute = input;            
      } else {
          valueAttribute = await qa.getAttribute(PAGE, 'value');
      }
        expect(valueAttribute).to.equal(input);    
};

Then('I check a user account for user from data_table', async function(data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
      let user = data_table.hashes()[i];
      await checkUserAccount(this.driver, user.element, user.input);
    }
});

When('I create a user with the data table credentials', async function(data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    let user = data_table.hashes()[i];
    await createUser(this.driver, user.element, user.input);
  }
  await qa.click(page.iam.create_account.terms_of_service);
});

When(/^I create a user with the data table credentials but missing "(.*)"$/, async function(missing_field, data_table) {
  let qa = new selenium(this.driver);
  for (let i = 0; i < data_table.rows().length; i++) {
    let user = data_table.hashes()[i];
    await createUser(this.driver, user.element, user.input, missing_field);
  }
  await qa.click(page.iam.create_account.terms_of_service);

});

// Generic Text Assetion //
Then(/^I verify for "(.*)" system "(.*)" feature "(.*)" element that "(.*)" feature "(.*)" message is displayed$/, async function(feature, screen, element, message_screen,text) {
    let qa = new selenium(this.driver);
    let ASSERT_TEXT = await _.get(assert_text, [feature, message_screen, text]);
    let PAGE = await _.get(page, [feature, screen, element]);

    let PAGE_TEXT = await qa.getText(PAGE);
    expect(PAGE_TEXT).to.equal(ASSERT_TEXT);
});

Then(/^I verify the password inputed "(.*)" is not the same as the one that was allowed "(.*)"$/, async function (password, password_allowed) {
    let qa = new selenium(this.driver);
    let PAGE = page.iam.create_account.password;
    let actual_password = await qa.getAttribute(PAGE, 'value');
    expect(password_allowed).to.equal(actual_password);
    expect(password).to.not.equal(actual_password);
})