const { Given, When, Then } = require('cucumber');
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const pages = require(`${process.cwd()}/features/IAM/pages/.pages.js`).pages;
const { visitURL } = require(`${process.cwd()}/app/driver`);
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const mathPages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;

Given('I have opened Achieve "signURL"', async function () {
    let url = await _.get(urls, ['Achieve-CW', this.environment]);
    await visitURL(url);
    await pages.signIn.click('signinlink');
});

When('I login with invalid credentials and I verify the message', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
    await pages.signIn.populate('username', data_table.hashes()[i].Username);
    await pages.signIn.populate('password', data_table.hashes()[i].Password);
    await pages.signIn.click('signin');
    await pages.signIn.assertElementExists('verify', data_table.hashes()[i].verify);
    }
});

/*Then('I verify following message is displayed after {int} failure login attempts', async function (int, data_table) {
    for (let i = 1; i < data_table.rows(1).length; i++) {
    await pages.signIn.assertTextIncludes('verify', data_table.hashes()[i].verify);
    }
});*/
  
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

Then('I <verify> that I am able to login in as existing user before deployement.', async function (dataTable) {
    await pages.signIn.assertElementExists('username');
    })
    
When('I click on footer links, I verify that each link is directed to correct page', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
    await pages.raptorAms.assertElementExists('Objects', data_table.hashes()[i].Objects);
    await pages.raptorAms.click('Objects', data_table.hashes()[i].Objects);
    await mathPages.raptorAms.switchToTab('pagedef', data_table.hashes()[i].pagedef);
    await pages.raptorAms.assertElementExists('verify', data_table.hashes()[i].verify);
    }
});