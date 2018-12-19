const { When, Given, Then } = require('cucumber');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const config = require('../../../config.js');
const assert_text = require('../../master-text.js');
const expect = require('chai').expect;
const _ = require('lodash');


// Create User Functionality //
async function createUser(driver, data_table) {
    let qa = new selenium(driver);
    for (let i = 0; i < data_table.rows().length; i++) {
        let PAGE = await _.get(page, ['iam', 'create_account', data_table.hashes()[i].element]);
        let INPUT = data_table.hashes()[i].input
        await qa.input(PAGE, INPUT);
        if(data_table.hashes()[i].element == 'institution'){
            await qa.click(page.iam.create_account.institution);
            await qa.click(page.iam.create_account.first_institution);
        }
    }
    await qa.click(page.iam.create_account.terms_of_service);
};

async function createUserFromPayload(driver, payload, missing) {
    let missingField = missing || "none";
    let qa = new selenium(driver);
    for (let key in payload) {
        if(key === missingField){
            console.log(missingField, 'missing Field');
        } else {
            let PAGE = await _.get(page, ['iam', 'create_account', key]);
            let INPUT = payload[key];
            await qa.input(PAGE, INPUT);
            if(key == 'institution'){
                await qa.click(page.iam.create_account.institution);
                await qa.click(page.iam.create_account.first_institution);
            }
        }
    }
    await qa.click(page.iam.create_account.terms_of_service);
    
};

async function checkUserAccount(driver, payload) {
    let qa = new selenium(driver);
    for (let key in payload) {
        let PAGE = await _.get(page, ['iam', 'create_account', key]);
        let INPUT = payload[key];
        let VALUE;
        if(key === 'email'){
            let EMAIL_PAGE = await _.get(page, ['iam', 'create_account', 'email_disabled']);
            VALUE = await qa.getText(EMAIL_PAGE)
            // Cannot locate this email within this div easily so going to need to add an id here
        } else if (key === 'last_name' || key === 'first_name') {
            let NEW_KEY = key + '_account';
            let NAME_PAGE = await _.get(page, ['iam', 'create_account', NEW_KEY]);
            VALUE = await qa.getAttribute(NAME_PAGE, 'value');
        } else if( key === 'password' || key === 'confirm_password') {
            VALUE = INPUT;            
        } else {
            VALUE = await qa.getAttribute(PAGE, 'value');
        }
        expect(VALUE).to.equal(INPUT);
    }
    
};

Then(/^I check a user account for user "(.*)"$/, async function(user_object) {
    let payload = require(`../../_data/user/${config.environment}/${user_object}.json`);
  
    await checkUserAccount(this.driver, payload);
  });

When(/^I have created a user "(.*)" without "(.*)" field$/, async function(user_object, missingField) {
    let payload = require(`../../_data/user/${config.environment}/${user_object}.json`);
  
    await createUserFromPayload(this.driver, payload, missingField);
});

When(/^I have created a user "(.*)"$/, async function(user_object) {
    let payload = require(`../../_data/user/${config.environment}/${user_object}.json`);
    await createUserFromPayload(this.driver, payload);
});  

When('I create a user with the data table credentials', async function(data_table) {
    await createUser(this.driver, data_table);
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
    let PAGE = await _.get(page, ['iam', 'create_account', 'password'])
    let actual_password = await qa.getAttribute(PAGE, 'value');
    expect(password_allowed).to.equal(actual_password);
})