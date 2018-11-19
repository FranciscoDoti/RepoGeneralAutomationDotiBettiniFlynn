const { Given, When, Then, AfterAll } = require('cucumber');
const { loadConfig } = require('../../../app/util');
const stepsPath = process.cwd() + '/features/pageDefs/';
const { PageObject } = require('../../../app/pageObject');
const { log } = require('../../../app/logger');
const { getDriver, sleep } = require('../../../app/driver');
const config = loadConfig('config');
const login = loadConfig('login');
const assert = require('assert');

const saviVerification1 = new PageObject('savi-verification1.json', stepsPath);
const loginPage = new PageObject('saplinglearning-login.json', stepsPath);

Given('I login to sapling SAVIPO2', async function () {
  const url = config.loginURL;
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
  // await sleep(5000);
  await loginPage.populate('input_username', login.username);
  await loginPage.populate('input_password', login.password);
  await loginPage.populate('login', 'click');
  await sleep(5000);
});

When('I open the Brightcove Player', async function () {
  const url = config.saviVerification;
  log.debug(`Loading URL ${url}`);
  await getDriver().get(url);
  // await sleep(5000);
  await saviVerification1.populate('open_brightcove_player', 'click');
});

Then('I can play a video', async function () {
  const playButton = await saviVerification1.checkWebElementExists('play_brightcove_player');
  assert(playButton, 'The play button was not displayed.');
});

// AfterAll(function () {
//   getDriver().quit();
//   return Promise.resolve();
// });
