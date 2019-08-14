const { Given, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const { visitURL, sleep } = require(`${process.cwd()}/app/driver`); // allows this file to be moved wherever

Given('I navigate to an assignment with Brightcove Audio Player', async function () {
  visitURL('http://www.saplinglearning.com/ibiscms/mod/flcn/view.php?id=9246174,');
  await pages.saplingLearning.click('studentPreviewButton');
  await pages.saplingLearning.click('clearAttemptsButton');
  await pages.saplingLearning.switchToTab('Student Assignment');
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
