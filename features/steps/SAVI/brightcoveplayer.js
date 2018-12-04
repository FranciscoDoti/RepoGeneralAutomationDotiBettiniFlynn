const { Given, When, Then } = require('cucumber');
const { loadConfig } = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep } = require('../../../app/driver');
const { By } = require('selenium-webdriver');
const config = loadConfig('config');
const login = loadConfig('login');
const assert = require('assert');

const saviBrightcoveStandalone = new PageObject('savi-brightcove-standalone.json', stepsPath);
const saviBrightcoveEpub = new PageObject('savi-brightcove-epub.json', stepsPath);
const loginPage = new PageObject('saplinglearning-login.json', stepsPath);
const saviVerification1 = new PageObject('savi-verification1.json', stepsPath);
const saviBrightcoveNGA = new PageObject('savi-brightcove-nga.json', stepsPath);

// STANDALONE AND GENERAL

Given('I open the standalone Brightcove Player', async function () {
  const url = config.standalone;
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
});

Then('I can play a video', async function () {
  await sleep(500);
  const readyState = await saviBrightcoveStandalone.getElementValue('video', 'readyState');
  log.debug(`readyState: ${readyState}`);

  await saviBrightcoveStandalone.populate('big_play_button', 'click');
  await sleep(1000);

  let currentTime = await saviBrightcoveStandalone.getElementValue('video', 'currentTime');
  log.debug(`currentTime: ${currentTime}`);
  assert(currentTime > 0, 'The video is playing');
});

Then('I can use all the video control buttons', async function () {
  await saviBrightcoveStandalone.populate('volume_button', 'click');
  await saviBrightcoveStandalone.populate('mute_button', 'click');
  const muted = await saviBrightcoveStandalone.getElementValue('video', 'muted');
  log.debug(`muted: ${muted}`);
  await saviBrightcoveStandalone.populate('captions_button', 'click');
  await saviBrightcoveStandalone.populate('rate_button', 'click');
  await saviBrightcoveStandalone.populate('rate_decrease_button', 'click');
  await saviBrightcoveStandalone.populate('rate_increase_button', 'click');
  await saviBrightcoveStandalone.populate('fullscreen_button', 'click');
  await saviBrightcoveStandalone.populate('play_pause_button', 'click');
  await saviBrightcoveStandalone.populate('fullscreen_button', 'click');
});

Then('I can turn on audio description', async function () {
  await saviBrightcoveStandalone.populate('audiodescription_button', 'click');
});

Then('the transcript button is available', async function () {
  await saviBrightcoveStandalone.checkWebElementExists('download_button');
});

// EPUB

Given('I open the VitalSource link', async function () {
  const url = config.vitalsource;
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
});

Given('I can play a video in the ePub', async function () {
  await sleep(500);

  // switch through series of nested iframes
  await getDriver().switchTo().frame(0); // first iframe
  await getDriver().switchTo().frame('epub-content'); // second iframe
  const studentVideoDan = await saviBrightcoveEpub.getWebElements('studentVideoDan'); // get iframe with student video
  await getDriver().switchTo().frame(studentVideoDan[0]); // third iframe

  await saviBrightcoveEpub.checkWebElementExists('video');
  await saviBrightcoveEpub.populate('big_play_button', 'click');
  await sleep(1000);

  let currentTime = await saviBrightcoveEpub.getElementValue('video', 'currentTime');
  log.debug(`currentTime: ${currentTime}`);
  assert(currentTime > 0, 'The video is playing');
});

// NGA

Given('I login to sapling SAVIPO2', async function () {
  const url = config.loginURL;
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
  await loginPage.populate('input_username', login.username);
  await loginPage.populate('input_password', login.password);
  await loginPage.populate('login', 'click');
});

When('I open the assignment', async function () {
  const url = config.saviVerification;
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
  await sleep(500);
  await saviVerification1.populate('open_brightcove_player', 'click');
  await getDriver().navigate().refresh();
  await saviVerification1.populate('open_assignment', 'click');
});

Then('I can play a video in the assignment', async function () {
  await sleep(5000);
  // const readyState = await saviBrightcoveNGA.getElementValue('video', 'readyState');
  // log.debug(`readyState: ${readyState}`);

  // Currently it fails at the next step
  await saviBrightcoveNGA.populate('big_play_button', 'click');
  await sleep(1000);

  // let currentTime = await saviBrightcoveNGA.getElementValue('video', 'currentTime');
  // log.debug(`currentTime: ${currentTime}`);
  // assert(currentTime > 0, 'The video is playing');
});
