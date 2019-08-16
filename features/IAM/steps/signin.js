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
        await pages.signIn.getText('message', data_table.hashes()[i].Message)
    }
}); 
  
When(/^I login with correct credentials as "(.*)"$/, async function (userType) {
    let user = await _.get(users, [this.environment, userType]);
        await pages.signIn.populate('username', user.username);
        await pages.signIn.populate('password', user.password);
        await pages.signIn.click('signin');
});

When('I sign out of Achieve', async function () {
    await pages.login.click('togglerMenu');
    await pages.login.click('signOut');
}); 

Then(/^I verify the user login$/, async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.signIn.assertText('menuUserName', data_table.hashes()[i].UserName );
    }
});

When(/^I click on footer link "(.*)"$/,async function (linkText) {
await pages.signIn.click('Footer Link', linkText);
});

Then('I verify {string} and {string} is displayed', async function (tabName, text) {
    await pages.signIn.switchToTab(tabName);
    await pages.signIn.assertText('Page Title', text );
    await pages.signIn.switchToTab('Macmillan Learning :: ');       
}); 

Then('I check {string} and {string} is displayed', async function (tabName, text) {
    await pages.signIn.switchToTab(tabName);
    await pages.signIn.assertElementExists('Anti-Piracy Form');
    await pages.signIn.assertText('Anti-Piracy Form', text);
    await pages.signIn.switchToTab('Macmillan Learning :: ');       
}); 

When('I hover on ? icon', async function () { 
   await pages.signIn.click('?');
});

When('I hover on "i" icon', async function () { 
    await pages.signIn.click('i');
}); 

Then('I verify {string} is displayed', async function (Message) { 
    await pages.signIn.assertText(Message);
});

Then('I verify the password as following information', async function (dataTable) {
    await pages.signIn.click('id')
    for (let i = 0; i < dataTable.rows().length; i++) {    
        await pages.signIn.getText('id', dataTable.hashes()[i].verify);
    }
});
