const {
    Given,
    When,
    Then
} = require('cucumber');
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const pages = require(`${process.cwd()}/features/IAM/pages/.pages.js`).pages;
const {
    visitURL,
    sleep,
} = require(`${process.cwd()}/app/driver.js`);
const email = require(`${process.cwd()}/features/COURSE/steps/checkEmail.js`);
var window = window;

Given('I have opened "Achieve-CW"', async function () {
    let url = await _.get(urls, ['Achieve-CW', this.stack]);
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
    let user = this.users[userType];
    await pages.signIn.populate('username', user.username);
    await pages.signIn.populate('password', user.password);
    await pages.signIn.click('signin');
});

Then(/^I verify the user login$/, async function (data_table) {
    for (let i = 0; i < data_table.rows().length; i++) {
        await pages.signIn.assertText('menuUserName', data_table.hashes()[i].UserName);
    }
});

When(/^I click on footer link "(.*)"$/, async function (linkText) {
    await pages.signIn.switchToTab('Macmillan Learning');
    await pages.signIn.click('Footer Link', linkText);
});

When('I click on footer logo {string}', async function (title) {
    await pages.signIn.switchToTab('Macmillan Learning');
    await pages.signIn.click('Footer Logo', title);
});

Then('I verify {string} is displayed on {string} page', async function (text, tab) {
    await pages.signIn.switchToTab(tab);
    if (text == 'Anti-Piracy Form') {
        await pages.signIn.assertElementExists('Form Name', text);
    } else {
        await pages.signIn.assertElementExists('Page Title', text);
    }
    await pages.signIn.closeTab(tab);
});

Then('I verify {string} is displayed on page', async function (text) {
    await pages.signIn.assertElementExists('Page Title', text);
});

When(/^I hover on (.*) icon$/, async function (icon) {
    await pages.signIn.click(icon);
});

Then(/^I ensure (.*) is displayed$/, async function (text) {
    await pages.signIn.assertText('tool tip content', text);
});

Then(/^I certify (.*) is displayed$/, async function (text) {
    await pages.signIn.assertText('content tip tool', text);
});

Then('I verify the password as following information', async function (dataTable) {
    await pages.signIn.click('id')
    for (let i = 0; i < dataTable.rows().length; i++) {
        await pages.signIn.getText('id', dataTable.hashes()[i].verify);
    }
});

When(/^I go to my email account "(.*)"$/, async function (userType) {
    let url = await _.get(urls, ['Yahoo', this.stack]);
    await visitURL(url);
    await pages.signIn.click('signinlink');
    let user = this.users[userType];
    await pages.signIn.populate('username', user.username);
    await pages.signIn.populate('password', user.password);
    await pages.signIn.click('signin');
});

When('I check my email I click on the link to reset my password', async function () {
    await pages.checkEmail.click('reset');
});