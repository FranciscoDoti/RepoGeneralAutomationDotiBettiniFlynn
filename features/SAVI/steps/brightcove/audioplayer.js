const { Given, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const { visitURL, sleep } = require(`${process.cwd()}/app/driver`); // allows this file to be moved wherever
const { log } = require(`${process.cwd()}/app/logger`);

Given('I navigate to an assignment with Brightcove Audio Player', async function () {
  visitURL('http://www.saplinglearning.com/ibiscms/mod/flcn/view.php?id=9246174,');
});

Given('the audio is playing', async function () {
  await pages.brightcovevideo.click('toolbarPlayButton'); // first click play button
  await pages.brightcovevideo.assertElementExists('playingPlayer'); // audio is playing
});

Then('the audio should begin playing', async function () {
  await pages.brightcovevideo.assertElementExists('playingPlayer');
});

Then('the audio should pause', async function () {
  await pages.brightcovevideo.assertElementExists('pausedPlayer');
});
Given(/^I load a "(.*)" in the audio player$/, async function (audioId) {
  await visitURL(`https://savi-cdn.macmillantech.com/audioplayer/index.html?audioId=${audioId}`);
  log.info(`loading audioId "${audioId}"`);
});