const { Given, When, Then, AfterAll } = require('cucumber');
const { loadConfig } = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep } = require('../../../app/driver');
const { By } = require('selenium-webdriver');
const config = loadConfig('config');
const login = loadConfig('login');
const assert = require('assert');

const loginPage = new PageObject('saplinglearning-login.json', stepsPath);
const saviVerification1 = new PageObject('savi-verification1.json', stepsPath);
const saviBrightcoveVideo = new PageObject('savi-brightcove-video.json', stepsPath);
const saviAssignment = new PageObject('savi-assignment.json', stepsPath);

Given('I login to sapling SAVIPO2', async function () {
  const url = config.loginURL;
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
  await loginPage.populate('input_username', login.username);
  await loginPage.populate('input_password', login.password);
  await loginPage.populate('login', 'click');
});

When('I open the Brightcove Player', async function () {
  const url = config.saviVerification;
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
  await sleep(500);
  await saviVerification1.populate('open_brightcove_player', 'click');

  await sleep(500);
  await getDriver().navigate().refresh();
  await sleep(500);
  log.debug('Launching assignment preview');
  await saviVerification1.populate('open_assignment', 'click');
});

Given('I open the standalone link to a video', async function () {
  const url = config.standalone;
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
});

Then('I can play a video', async function () {
  await sleep(8000);
  // the step below still not working...
  await saviAssignment.populate('big_play_button', 'click');
  await sleep(2000);

  // const currentTime = await saviBrightcoveVideo.getElementValue('video', 'currentTime');
  // log.info(`currentTime: ${currentTime}`);
  // console.log(currentTime);
  // await sleep(500);
});

AfterAll(function () {
  getDriver().quit();
  return Promise.resolve();
});
