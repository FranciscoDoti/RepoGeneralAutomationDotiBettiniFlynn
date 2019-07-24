const { Given, When, Then } = require('cucumber');
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const pages = require(`${process.cwd()}/features/IAM/pages/.page.js`).pages;
const { visitURL } = require(`${process.cwd()}/app/driver`);
const users = require(`${process.cwd()}/features/shared/data/users.json`);
//const mathPages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;

Given('I have opened Achieve "signURL"', async function () {
    let url = await _.get(urls, ['Achieve-CW', this.environment]);
    await visitURL(url);
    await pages.login.click('signinlink');
});

When('I login with invalid credentials', async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
    await pages.signIn.populate('username', data_table.hashes()[i].Username);
    await pages.signIn.populate('password', data_table.hashes()[i].Password);
    await pages.signIn.click('signin');
    }
});

Then(/^I verify the following message is displayed after 3 failure attempts$/, async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
    await pages.home.assertTextIncludes('verify', data_table.hashes()[i].verify);
    }
});
  
Then(/^I verify that I am able to login with correct credentials as "(.*)"$/, async function (userType) {
    let url = await _.get(urls, ['Achieve-CW', this.environment]);
    let user = await _.get(users, [this.environment, userType]);
  
    await visitURL(url);
    await pages.login.click('signinlink');
    await pages.login.populate('username', user.username);
    await pages.login.populate('password', user.password);
    await pages.login.click('signin');
});

/*  When('I sign out of Achieve', async function () {
    await pages.login.click('togglerMenu');
    await pages.login.click('signOut');
  }); */