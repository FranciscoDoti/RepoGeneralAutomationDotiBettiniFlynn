const { When, Then } = require('cucumber');
const _ = require('lodash');
const pages = require(`${process.cwd()}/features/IAM/pages/.pages.js`).pages;
const users = require(`${process.cwd()}/features/shared/data/users.json`);

When('I click on Forgot link', async function () {
    await pages.forgot.click('forgotLink');
}); 

When('I click on Cancel Button', async function () {
    await pages.forgot.click('cancelBtn');
});

Then('I verify that I am redirected to Login page', async function () {
    await pages.signIn.switchToTab('Macmillan Learning :: ');
});

Then('I verify that I am redirected to forgot page', async function () {
    await pages.signIn.switchToTab('Macmillan Learning :: ');
});

When(/^I am redirected to Password Reset page and enter "(.*)" email address and click Reset Password$/, async function (userType) {    
    let user = await _.get(users, [this.environment, userType]);
        await pages.forgot.populate('email', user.username);
        await pages.forgot.click('resetPassBtn');
});

Then('I enter all correct security answers and I verify the following message', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.forgot.populate('answer', data_table.hashes()[i].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.getText('verify', data_table.hashes()[i].verify) 
    }
});

When('I enter the incorrect security answer three times and I verify the following message', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.forgot.populate('answer', data_table.hashes()[i].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertElementExists('errorText', data_table.hashes()[i].verify);
        console.log('errorText');
    
        await pages.forgot.populate('answer', data_table.hashes()[i + 1].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertElementExists('errorText', data_table.hashes()[i + 1].verify);
        console.log('errorText');

        await pages.forgot.populate('answer', data_table.hashes()[i + 2].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertElementExists('lastErrorText', data_table.hashes()[i + 2].verify);
        console.log('lastErrorText');

        await pages.forgot.click('backToLogin');
        await pages.forgot.click('forgotLink'); 
        await pages.signIn.switchToTab('Macmillan Learning :: ');  
        break;         
    }
}); 

When('I enter incorrect security answer two times and I verify the following message', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.forgot.populate('answer', data_table.hashes()[i].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertElementExists('errorText', data_table.hashes()[i].verify);
        console.log('errorText');

        await pages.forgot.populate('answer', data_table.hashes()[i + 1].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertElementExists('errorText', data_table.hashes()[i + 1].verify);
        console.log('errorText');

        await pages.forgot.populate('answer', data_table.hashes()[i + 2].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertElementExists('verify', data_table.hashes()[i + 2].verify);
       
        await pages.forgot.click('backToLogin');
        await pages.forgot.click('forgotLink'); 
        await pages.signIn.switchToTab('Macmillan Learning :: ');  
        break;         
    }
}); 

When('I enter incorrect security answer one time and I verify the following message', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.forgot.populate('answer', data_table.hashes()[i].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertElementExists('errorText', data_table.hashes()[i].verify);
        console.log('errorText');

        await pages.forgot.populate('answer', data_table.hashes()[i + 1].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertElementExists('verify', data_table.hashes()[i + 1].verify);

        await pages.forgot.click('backToLogin');
        await pages.forgot.click('forgotLink'); 
        await pages.signIn.switchToTab('Macmillan Learning :: ');  
        break;       
    }
}); 

When('I login with non registered user credentials and <verify> the following message is displayed for not registered user', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.forgot.populate('email', data_table.hashes()[i].Username);
        await pages.forgot.click('resetPassBtn');
        await pages.forgot.assertElementExists('emailSent', data_table.hashes()[i].verify);
        console.log('emailSent');
    }
});  
