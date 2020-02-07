const {
    When,
    Then
} = require('cucumber');
const pages = require(`${process.cwd()}/features/IAM/pages/.pages.js`).pages;

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

When(/^I am redirected to Password Reset page and enter "(.*)" username and click Reset Password$/, async function (userType) {
    await pages.signIn.switchToTab('Macmillan Learning');
    let user = this.users[userType];
    await pages.forgot.populate('email', user.username);
    await pages.forgot.click('resetPassBtn');
});

Then('I enter the correct security answer {string} and I verify the following title {string}', async function (answer, text) {
    await pages.forgot.populate('answer', answer);
    await pages.forgot.click('submitBtn');
    await pages.forgot.assertText('verify', text);

    await pages.forgot.click('backToLogin');
    await pages.forgot.click('forgotLink');
    await pages.signIn.switchToTab('Macmillan Learning :: ');
});

When('I enter the incorrect security answer {string} {string} time and I verify the following message {string}', async function (answer, times, text) {
    await pages.forgot.populate('answer', answer);
    await pages.forgot.click('submitBtn');
    await pages.forgot.assertText('errorText', text);
});

When(/^on the third time I enter the incorrect security answer "(.*)" I verify the following message "(.*)"$/, async function (answer, text) {
    await pages.forgot.populate('answer', answer);
    await pages.forgot.click('submitBtn');
    await pages.forgot.assertText('lastErrorText', text);

    await pages.forgot.click('backToLogin');
    await pages.forgot.click('forgotLink');
    await pages.signIn.switchToTab('Macmillan Learning :: ');
});

/*When('I enter the incorrect security answer three times and I verify the following message', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.forgot.populate('answer', data_table.hashes()[i].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertText('errorText', data_table.hashes()[i].message);      
    
        await pages.forgot.populate('answer', data_table.hashes()[i + 1].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertText('errorText');        

        await pages.forgot.populate('answer', data_table.hashes()[i + 2].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertText('lastErrorText');
        
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
        await pages.forgot.assertText('errorText');
       
        await pages.forgot.populate('answer', data_table.hashes()[i + 1].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertText('errorText');
      
        await pages.forgot.populate('answer', data_table.hashes()[i + 2].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertText('verify');
       
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
        await pages.forgot.assertText('errorText');
       
        await pages.forgot.populate('answer', data_table.hashes()[i + 1].answers);
        await pages.forgot.click('submitBtn');
        await pages.forgot.assertText('verify');

        await pages.forgot.click('backToLogin');
        await pages.forgot.click('forgotLink'); 
        await pages.signIn.switchToTab('Macmillan Learning :: ');  
        break;       
    }
}); */

When('I login with non registered user credentials and <verify> the following message is displayed for not registered user', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.forgot.populate('email', data_table.hashes()[i].Username);
        await pages.forgot.click('resetPassBtn');
        await pages.forgot.assertText('emailSent', data_table.hashes()[i].message);
    }
});