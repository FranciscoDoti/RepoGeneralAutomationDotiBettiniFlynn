const { Given, When, Then } = require('cucumber');
const pages = require(`${process.cwd()}/features/SAVI/pages/.page.js`).pages;
const assert = require('assert');
const { visitURL, sleep, getDriver } = require(`${process.cwd()}/app/driver`); // allows this file to be moved wherever
const { log } = require(`${process.cwd()}/app/logger`);

Then('I navigate to an assignment with Brightcove Video Player', async function () {
  visitURL('http://www.saplinglearning.com/ibiscms/mod/flcn/view.php?id=9595874');
});

Then('I launch the Student Assignment', async function () {
  await pages.saplingLearning.click('studentPreviewButton');
  await pages.saplingLearning.click('clearAttemptsButton');

  // switch to the new tab ("Sapling Learning Student Assignment Container") without relying on name
  var tabs = await getDriver().getAllWindowHandles();
  await getDriver().switchTo().window(tabs[tabs.length - 1]);
  var tabName = await getDriver().getTitle();
  log.info(`switching to tab "${tabName}"`);
});

Given('I navigate to standalone Brightcove Video Player', async function () {
  await visitURL('https://savi-cdn.macmillantech.com/brightcove/index.html?videoId=5512999206001');
});

When('I click the play button in the bottom bar of the player', async function () {
  await pages.brightcovevideo.click('toolbarPlayButton');
});

When('I click the play button in the center of the player', async function () {
  await pages.brightcovevideo.click('videoPlayButton');
});

Given('the video is playing', async function () {
  await pages.brightcovevideo.click('toolbarPlayButton'); // first click play button
  await pages.brightcovevideo.assertElementExists('playingPlayer'); // video is playing
});

When('I click the pause button in the bottom bar of the player', async function () {
  await pages.brightcovevideo.click('pauseButton');
});

Then('the video should begin playing', async function () {
  await pages.brightcovevideo.assertElementExists('playingPlayer');
});

Then('the video should pause', async function () {
  await pages.brightcovevideo.assertElementExists('pausedPlayer');
});

Given('the Captions button is present', async function () {
  await pages.brightcovevideo.assertElementExists('captionsButton');
});

When('I click the "Show Captions" button', async function () {
  await sleep(100);
  await pages.brightcovevideo.click('captionsButton');
});

Then('the captions should be toggled on and visible, and the button text should change to "Hide captions"', async function () {
  await pages.brightcovevideo.click('toolbarPlayButton'); // play video to start of captions appearing

  const video = await pages.brightcovevideo.getWebElements('video');
  let currentTime = await video[0].getAttribute('currentTime');
  while (currentTime < 1) {
    currentTime = await video[0].getAttribute('currentTime');
  }
  await pages.brightcovevideo.click('pauseButton'); // pause video

  const captionsDisplay = await pages.brightcovevideo.getText('captionsDisplay');
  log.info(`captionsDisplay: ${captionsDisplay}`);
  assert(parseInt(captionsDisplay.length), 'Length of captions text is expected to be greater than zero');

  const tooltipCaptions = await pages.brightcovevideo.getText('tooltipCaptions');
  assert(tooltipCaptions === 'Hide captions', 'Tooltip text is expected to be "Hide captions"');
});

When('I click the "Hide Captions" button', async function () {
  await sleep(100);
  await pages.brightcovevideo.click('captionsButton');
});

Then('the captions should be toggled off and not visible, and the button text should change to "Show captions"', async function () {
  const captionsDisplay = await pages.brightcovevideo.getText('captionsDisplay');
  log.info(`captionsDisplay: ${captionsDisplay}`);
  assert(parseInt(captionsDisplay.length) === 0, 'Length of captions text is expected to be zero');

  const tooltipCaptions = await pages.brightcovevideo.getText('tooltipCaptions');
  assert(tooltipCaptions === 'Show captions', 'Tooltip text is expected to be "Show captions"');
});

Given('the Audio Description button is present', async function () {
  await pages.brightcovevideo.assertElementExists('audioDescriptionButton');
});

When('I click the "Turn on Audio Description" button', async function () {
  await sleep(100);
  await pages.brightcovevideo.click('audioDescriptionButton');
});

Then('the audio descriptions should be toggled on, and the button text should change to "Turn off audio description"', async function () {
  const tooltipAudioDescription = await pages.brightcovevideo.getText('tooltipAudioDescription');
  assert(tooltipAudioDescription === 'Turn off audio description', 'Tooltip text is expected to be "Turn off audio description"');
});

When('I click the "Turn off Audio Description" button', async function () {
  await sleep(100);
  await pages.brightcovevideo.click('audioDescriptionButton');
});

Then('the audio descriptions should be toggled off, and the button text should change to "Turn on audio description"', async function () {
  const tooltipAudioDescription = await pages.brightcovevideo.getText('tooltipAudioDescription');
  assert(tooltipAudioDescription === 'Turn on audio description', 'Tooltip text is expected to be "Turn on audio description"');
});

Given('the Open Transcript button is present', async function () {
  await pages.brightcovevideo.assertElementExists('transcriptButton');
});

When('I click the "Open Transcript" button', async function () {
  await sleep(100);
  await pages.brightcovevideo.click('transcriptButton');
});

Then('a new tab should open containing an HTML page transcript of the content', async function () {
  var tabs = await getDriver().getAllWindowHandles();
  await getDriver().switchTo().window(tabs[tabs.length - 1]);
  const transcript = await pages.brightcovevideo.getText('transcript');
  log.info(`transcript: ${transcript}`);
  assert(parseInt(transcript.length), 'New tab is expected to contain the transcript');
});

When('I click the "Playback speed" menu bar button while the playback speed menu is closed', async function () {
  await pages.brightcovevideo.click('speedMenuButton');
});

Then('the playback speed menu should open', async function () {
  await pages.brightcovevideo.assertElementExists('speedMenuPanel');
});

When('I click the "Playback speed" menu bar button while the playback speed menu is open', async function () {
  await pages.brightcovevideo.click('speedMenuButton');
});

Then('the playback speed menu should close', async function () {
  await pages.brightcovevideo.assertElementDoesNotExist('speedMenuPanel');
});

Given('the playback speed menu is open', async function () {
  await pages.brightcovevideo.click('speedMenuButton');
});

When('I click the "Increase playback speed" button', async function () {
  await pages.brightcovevideo.click('rate_increase_button');
});

Then('the playback speed should increase by {float}, to a maximum of {float}', async function (incr, max) {
  const video = await pages.brightcovevideo.getWebElements('video');

  for (let rate = 1 + incr; rate <= max; rate += incr) {
    let playbackRate = parseFloat(await video[0].getAttribute('playbackRate'));
    assert(rate === playbackRate, `Playback speed is expected to increase by ${incr}`);
    await pages.brightcovevideo.click('rate_increase_button'); // increase again

    // rate should not exceed maximum
    playbackRate = parseFloat(await video[0].getAttribute('playbackRate'));
    assert(playbackRate <= max, `Playback speed should not be greater than ${max}`);
  }
});

When('I click the "Decrease playback speed" button', async function () {
  await pages.brightcovevideo.click('rate_decrease_button');
});

Then('the playback speed should decrease by {float}, to a minimum of {float}', async function (incr, min) {
  const video = await pages.brightcovevideo.getWebElements('video');

  for (let rate = 1 - incr; rate >= min; rate -= incr) {
    let playbackRate = parseFloat(await video[0].getAttribute('playbackRate'));
    assert(rate === playbackRate, `Playback speed is expected to decrease by ${incr}`);
    await pages.brightcovevideo.click('rate_decrease_button'); // decrease again

    // rate should not go below minimum
    playbackRate = parseFloat(await video[0].getAttribute('playbackRate'));
    assert(playbackRate >= min, `Playback speed should not be less than ${min}`);
  }
});

When('I click the "Enter fullscreen" button', async function () {
  await pages.brightcovevideo.click('fullscreen_button');
});

Then('the video player should maximize, filling up the entire screen space', async function () {
  const tooltipFullscreen = await pages.brightcovevideo.getText('tooltipFullscreen');
  assert(tooltipFullscreen === 'Exit fullscreen', 'Tooltip text is expected to be "Exit fullscreen"');
});

When('I click the "Exit fullscreen" button', async function () {
  await pages.brightcovevideo.click('fullscreen_button');
});

Then('the video player should demaximize, reverting back to the normal video player size', async function () {
  const tooltipFullscreen = await pages.brightcovevideo.getText('tooltipFullscreen');
  assert(tooltipFullscreen === 'Enter fullscreen', 'Tooltip text is expected to be "Enter fullscreen"');
});

Given('the volume menu is not open', async function () {
  await pages.brightcovevideo.assertElementDoesNotExist('volumePanel');
});

When('I click the volume button', async function () {
  await pages.brightcovevideo.click('volumeButton');
});

Then('the volume menu should open', async function () {
  await pages.brightcovevideo.assertElementExists('volumePanel');
});

Then('the volume menu should close', async function () {
  await pages.brightcovevideo.assertElementDoesNotExist('volumePanel');
});

Given('the volume menu is open', async function () {
  await pages.brightcovevideo.click('volumeButton');
});

When('I move the volume slider', async function () {
  for (let i = 0; i < 3; i++) {
    await pages.brightcovevideo.click('volumeSlider');
  }
});

Then('the volume level visually should change as well as change in volume level heard from the media', async function () {
  const video = await pages.brightcovevideo.getWebElements('video');
  const volume = parseFloat(await video[0].getAttribute('volume'));
  assert(volume < 1, 'Volume is expected to decrease from initial value of 1');
});

When('I click on the volume icon', async function () {
  await pages.brightcovevideo.click('muteButton');
});

Then('the application should mute', async function () {
  const video = await pages.brightcovevideo.getWebElements('video');
  const muted = await video[0].getAttribute('muted');
  assert(muted, 'Video is muted');
});

Then('the current timestamp of the media should be updating every second in the menu bar', async function () {
  const video = await pages.brightcovevideo.getWebElements('video');
  let currentTime = await video[0].getAttribute('currentTime');
  while (currentTime < 1.2) {
    currentTime = await video[0].getAttribute('currentTime');
  }
  const timestamp = await pages.brightcovevideo.getText('timestamp');
  assert(timestamp === '0:01', 'Timestamp has updated to one second');
});
Given(/^I load a "(.*)" in the video player$/, async function (videoId) {
  await visitURL(`https://savi-cdn.macmillantech.com/brightcove/index.html?videoId=${videoId}`);
  log.info(`loading videoId "${videoId}"`);
});