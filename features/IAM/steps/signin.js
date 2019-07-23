const { Given, When } = require('cucumber');
const _ = require('lodash');
const urls = require(`${process.cwd()}/config/urls.json`);
const pages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;
const { visitURL } = require(`${process.cwd()}/app/driver`);
const users = require(`${process.cwd()}/features/shared/data/users.json`);
const mathPages = require(`${process.cwd()}/features/MATH/pages/.page.js`).pages;

Given('I have opened Achieve "signURL"', async function () {
    let url = await _.get(urls, ['Achieve-CW', this.environment]);
    await visitURL(url);
    await pages.login.click('signinlink');
});

When('I login with invalid credentials', async function (userType) {
    await pages.signIn.click('signinlink');
    await pages.signIn.populate('username', user.username);
    await pages.signIn.populate('password', user.password);
    await pages.signIn.click('signin');
});
  
/*  When('I sign out of Achieve', async function () {
    await pages.login.click('togglerMenu');
    await pages.login.click('signOut');
  }); */