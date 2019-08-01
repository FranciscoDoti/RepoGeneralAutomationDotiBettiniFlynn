const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/IAM/pages/.pages.js`).pages;
//const singin = require(`${process.cwd()}/feature/IAM/steps/signin.js`);

When('I click on Forgot link', async function () {
    await pages.forgot.click('forgotLink');
    await pages.forgot.assertElementExists('passwordResetPage');
}); 

When('I click on Cancel Button', async function () {
    await pages.forgot.click('cancelBtn');
    await pages.signIn.assertElementExists('login');
});

Then('I verify that I am redirected to {string} page', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
    await pages.forgot.assertElementExists('createAccount', data_table.hashes()[i].verify);
    }
});

When(/^I am redirected to Password Reset page and enter "(.*)" email address and click Reset Password$/, async function (username) {
//    await pages.forgot.onClick('passwordResetPage');
    await pages.login.populate('username');
    await pages.forgot.assertElementExists('resetPassBtn');
    await pages.forgot.click('resetPassBtn');
    await pages.forgot.assertElementExists('verifyID');
});

Then('I enter all correct security answers and I verify the following message', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
    await pages.forgot.populate('answer', data_table.hashes()[i].answers);
    await pages.forgot.assertElementExists('submitBtn');
    await pages.forgot.click('submitBtn');
    await pages.forgot.assertElementExists('verify');
    let test = await pages.forgot.getText('verify'); 
        if (test === data_table.hashes()[i].verify);
        console.log(test); 
    }
});

When(/^I enter incorrect security answer (.*) times and I verify the following message$/, async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
    await pages.forgot.populate('answer', data_table.hashes()[i].answers);
    await pages.forgot.assertElementExists('submitBtn');
    await pages.forgot.click('submitBtn');
    await pages.forgot.assertElementExists('verify');
    let test = await pages.forogt.getText('verify'); 
        if (test === data_table.hashes()[i].verify); 
        console.log(test);
    }
}); 

When(/^I login with non registered (.*) credentials and verify the following message is displayed for not registered user$/, async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
    await pages.forgot.populate('Username', data_table.hashes()[i].Username);
    await pages.forgot.assertElementExists('submitBtn');
    await pages.forgot.click('submitBtn');
    await pages.forgot.assertElementExists('verify');
    let test = await pages.forogt.getText('verify'); 
        if (test === data_table.hashes()[i].verify); 
        console.log(test);
    }
});  
