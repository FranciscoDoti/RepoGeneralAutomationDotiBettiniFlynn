const { When, Given, Then } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const config = require('../../../config.js');
const assert_text = require('../../master-text.js');
const expect = require('chai').expect;
const _ = require('lodash');


// Create User Functionality //
async function createUser(driver, data_table, missing) {
    let missingField = missing || "none";
    let qa = new selenium(driver);
    for (let i = 0; i < data_table.rows().length; i++) {
        let USER = data_table.hashes();
        if(USER[i].element !== missingField) {
          let PAGE = await _.get(page, ['iam', 'create_account', USER[i].element]);
          let INPUT = USER[i].input
          await qa.input(PAGE, INPUT);
          if(USER[i].element === 'institution'){
              await qa.click(page.iam.create_account.institution);
              await qa.click(page.iam.create_account.first_institution);
          }
        }
    }
    await qa.click(page.iam.create_account.terms_of_service);
};

async function checkUserAccount(driver, data_table) {
    let qa = new selenium(driver);
    for (let i = 0; i < data_table.rows().length; i++) {
        let USER = data_table.hashes();
        let PAGE = await _.get(page, ['iam', 'create_account', USER[i].element]);
        let INPUT = USER[i].input;
        let VALUE;
        if(USER[i].element === 'email'){
            let EMAIL_PAGE = await _.get(page, ['iam', 'create_account', 'email_disabled']);
            VALUE = await qa.getText(EMAIL_PAGE)
            // Cannot locate this email within this div easily so going to need to add an id here
        } else if (USER[i].element === 'last_name' || USER[i].element === 'first_name') {
            let NEW_KEY = USER[i].element + '_account';
            let NAME_PAGE = await _.get(page, ['iam', 'create_account', NEW_KEY]);
            VALUE = await qa.getAttribute(NAME_PAGE, 'value');
        } else if(USER[i].element === 'password' || USER[i].element === 'confirm_password') {
            VALUE = INPUT;            
        } else {
            VALUE = await qa.getAttribute(PAGE, 'value');
        }
        expect(VALUE).to.equal(INPUT);
    }
    
};

Then('I check a user account for user from data_table', async function(data_table) {
    await checkUserAccount(this.driver, data_table);
});

When('I create a user with the data table credentials', async function(data_table) {
    await createUser(this.driver, data_table);
});

When(/^I create a user with the data table credentials but missing "(.*)"$/, async function(missing_field, data_table) {
  await createUser(this.driver, data_table, missing_field);
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