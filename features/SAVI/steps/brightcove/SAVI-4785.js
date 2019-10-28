const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const assert = require('assert');
const { visitURL, sleep, getDriver } = require(`${process.cwd()}/app/driver`); // allows this file to be moved wherever
const { log } = require(`${process.cwd()}/app/logger`);

Given(/^I load a "(.*)" in the video player$/, async function (videoId) {
  await visitURL(`https://savi-cdn.macmillantech.com/brightcove/index.html?videoId=${videoId}`);
  log.info(`loading videoId "${videoId}"`);
});
