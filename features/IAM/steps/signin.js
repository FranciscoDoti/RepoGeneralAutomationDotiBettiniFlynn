const { Given, When, Then } = require('cucumber');
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const pages = require(`${process.cwd()}/features/IAM/pages/.pages.js`).pages;
const { visitURL, sleep } = require(`${process.cwd()}/app/driver.js`);
const users = require(`${process.cwd()}/features/shared/data/users.json`);
var window = window;

Given('I have opened Achieve "Achieve-CW"', async function () {
    let url = await _.get(urls, ['Achieve-CW', this.environment]);
        await visitURL(url);
        await pages.signIn.click('signinlink');
});

When('I login with invalid credentials and I verify the message', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.signIn.populate('username', data_table.hashes()[i].Username);
        await pages.signIn.populate('password', data_table.hashes()[i].Password);
        await pages.signIn.click('signin');
        await pages.signIn.getText('verify', data_table.hashes()[i].verify)
    }
}); 
  
Then(/^I verify that I am able to login with correct credentials as "(.*)"$/, async function (userType) {
    let url = await _.get(urls, ['Achieve-CW', this.environment]);
    let user = await _.get(users, [this.environment, userType]);
        await visitURL(url);
        await pages.signIn.click('signinlink');
        await pages.signIn.populate('username', user.username);
        await pages.signIn.populate('password', user.password);
        await pages.signIn.click('signin');
});

When('I sign out of Achieve', async function () {
    await pages.login.click('togglerMenu');
    await pages.login.click('signOut');
}); 

When('I have logged in as {string}', async function (userType) {
    let user = await _.get(users, [this.environment, userType]);
        await pages.signIn.populate('username', user.username);
        await pages.signIn.populate('password', user.password);
        await pages.signIn.click('signin');
});

Then('I verify that I am able to login in as existing user before deployement.', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.login.assertElementExists('username', data_table.hashes()[i].verify);
    }
});
    
When('I click on footer links, I verify that each link is directed to correct page', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {       
        await pages.signIn.click('footerLinks', data_table.hashes()[i].Objects);
        await pages.signIn.switchToTab('Privacy Notice');
        await pages.signIn.getText('privacy', data_table.hashes()[i].verify);    

        await pages.signIn.switchToTab('Macmillan Learning :: ');            
        await pages.signIn.click('footerLinks', data_table.hashes()[i + 1].Objects);
        await pages.signIn.switchToTab('Terms of Purchase');
        await pages.signIn.getText('termsOfPurchase', data_table.hashes()[i + 1].verify) 

        await pages.signIn.switchToTab('Macmillan Learning :: ');           
        await pages.signIn.click('footerLinks', data_table.hashes()[i + 2].Objects);
        await pages.signIn.switchToTab('Anti-Piracy');
        await pages.signIn.getText('anti-Piracy', data_table.hashes()[i + 2].verify)

        await pages.signIn.switchToTab('Macmillan Learning :: ');       
        await pages.signIn.click('footerLinks', data_table.hashes()[i + 3].Objects);
        await sleep(2000);
        await pages.signIn.switchToTab('Home');
        await pages.signIn.getText('home', data_table.hashes()[i + 3].verify)

        await pages.signIn.switchToTab('Macmillan Learning :: ');            
        await pages.signIn.click('footerLinks', data_table.hashes()[i + 4].Objects);
        await pages.signIn.switchToTab('Instructor Store');
        await pages.signIn.getText('instructorStore', data_table.hashes()[i + 4].verify); 
        break   
    }
}); 

When('I hover on "?" icon', async function () { 
    await pages.signIn.click('helpInfo');
});    

Then('I verify the help as following information', async function (dataTable) {
    for (let i = 0; i < dataTable.rows().length; i++) {
        await pages.signIn.getText('helpInfo', dataTable.hashes()[i].verify);
    }
});

When('I hover on "i" icon', async function () { 
    await pages.signIn.click('viewBox');
}); 

Then('I verify the password as following information', async function (dataTable) {
    await pages.signIn.click('id')
    for (let i = 0; i < dataTable.rows().length; i++) {    
        await pages.signIn.getText('id', dataTable.hashes()[i].verify);
    }
});
